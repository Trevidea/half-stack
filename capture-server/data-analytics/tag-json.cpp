#include "tag-json.h"

#include <iostream>
#include <fstream>
#include <filesystem>
#include <sstream>
#include "json/json.h"

namespace fs = std::filesystem;

using namespace duckdb;
namespace fs = std::filesystem;

std::vector<std::string> TagJson::list_files(const std::string &directory)
{
   std::vector<std::string> files;
   for (const auto &entry : fs::directory_iterator(directory))
   {
      if (entry.is_regular_file() && entry.path().extension() == ".json")
      {
         files.push_back(entry.path().string());
      }
   }
   return files;
}
std::string TagJson::read_file(const std::string &file_path)
{
   std::ifstream file(file_path);
   std::stringstream buffer;
   buffer << file.rdbuf();
   return buffer.str();
}

Json::Value TagJson::query(const std::string &event_id, const std::string &json_query)
{
   Json::Value matchingTags = Json::arrayValue;

   duckdb::DuckDB db(nullptr);
   duckdb::Connection con(db);

   fs::path base_path = fs::path(this->m_basePath) / event_id;
   std::vector<std::string> json_files;
   for (const auto &entry : fs::directory_iterator(base_path))
   {
      if (entry.is_regular_file() && entry.path().extension() == ".json")
      {
         json_files.push_back(entry.path().string());
      }
   }

   if (json_files.empty())
   {
      std::cerr << "No JSON files found in directory: " << base_path << std::endl;
      return Json::nullValue;
   }

   std::ostringstream files_list;
   files_list << "read_json([";
   for (size_t i = 0; i < json_files.size(); ++i)
   {
      files_list << "'" << json_files[i] << "'";
      if (i != json_files.size() - 1)
      {
         files_list << ",";
      }
   }
   files_list << "])";

   std::ostringstream query;
   query << R"(SELECT timestamp, "original-stream-name" FROM )" << files_list.str() << " WHERE json_contains(data, '" << json_query << "')";

   std::cout << query.str() << std::endl;
   auto result = con.Query(query.str());
   std::cout << result->RowCount() << std::endl;
   std::cout << result->ColumnCount() << std::endl;
   if (result->HasError())
   {
      std::cerr << "Error querying JSON files: " << result->GetError() << std::endl;
      return Json::nullValue;
   }
   duckdb::unique_ptr<duckdb::DataChunk> p_dataChunk = result->Fetch();
   while (p_dataChunk)
   {
   //    auto vect = p_dataChunk->data;
   //    for (auto &&i : vect)
   //    {
   //       i.Print();
   //    }

   //    auto ts = p_dataChunk->GetValue(0, 0);
   //    auto streamName = p_dataChunk->GetValue(1, 0);
   //    auto strTS = ts.GetValue<std::string>();
   //    auto strStreamName = streamName.GetValue<std::string>();
   //    Json::Value jsMatch = Json::objectValue;
   //    jsMatch["timestamp"] = strTS;
   //    jsMatch["original-stream-name"] = strStreamName;
   //    matchingTags.append(jsMatch);
   //    p_dataChunk = result->Fetch();
   }


   return matchingTags;
}

std::string TagJson::fetchTagsForEvent(const std::string &event_id_directory)
{
   std::vector<std::string> json_files = list_files(event_id_directory);

   std::ostringstream oss;
   oss << "[";

   bool first_file = true;
   for (const auto &json_file : json_files)
   {
      if (!first_file)
      {
         oss << ",";
      }
      first_file = false;

      std::string json_content = read_file(json_file);
      oss << json_content;
   }

   oss << "]";
   return oss.str();
}
void TagJson::save(duckdb::Connection &conn, const std::string &json_str, const std::string &base_path)
{
   const int pass = 0;
   std::stringstream ss;
   do
   {
      try
      {

         auto create_result = conn.Query("CREATE TABLE IF NOT EXISTS events (event_id INTEGER, stream_name VARCHAR, timestamp TIMESTAMP, duration VARCHAR, data JSON)");
         if (create_result->HasError())
         {
            ss << "Error creating table: " << create_result->GetError() << std::endl;
            this->m_err = ss.str();
            break;
         }

         std::string insert_query = "INSERT INTO events SELECT "
                                    "json_extract('" +
                                    json_str + "', '$.event-id')::INTEGER AS event_id, "
                                               "json_extract('" +
                                    json_str + "', '$.stream-name')::VARCHAR AS stream_name, "
                                               "json_extract('" +
                                    json_str + "', '$.timestamp')::TIMESTAMP AS timestamp, "
                                               "json_extract('" +
                                    json_str + "', '$.duration')::VARCHAR AS duration, "
                                               "json_extract('" +
                                    json_str + "', '$.data')::JSON AS data";

         std::cout << "INSERT QUERY >> " << insert_query << std::endl;

         auto insert_result = conn.Query(insert_query);
         if (insert_result->HasError())
         {
            ss << "Error inserting data: " << insert_result->GetError() << std::endl;
            this->m_err = ss.str();
            break;
         }

         auto result = conn.Query("SELECT event_id, CAST(timestamp AS VARCHAR) AS timestamp_str FROM events LIMIT 1");
         if (result->HasError())
         {
            ss << "Error executing query: " << result->GetError() << std::endl;
            this->m_err = ss.str();
            break;
         }

         if (result->RowCount() == 0)
         {
            ss << "No rows returned from the query." << std::endl;
            this->m_err = ss.str();
            break;
         }

         int event_id;
         std::string timestamp;
         auto event_id_val = result->GetValue(0, 0);
         event_id = event_id_val.GetValue<int32_t>();
         auto timestamp_val = result->GetValue(1, 0);
         timestamp = timestamp_val.GetValue<std::string>();

         std::cout << "Event ID: " << event_id << std::endl;
         std::cout << "Timestamp: " << timestamp << std::endl;

         fs::path dir_path = fs::path(base_path) / std::to_string(event_id);
         fs::create_directories(dir_path);

         std::string filename = "event_" + timestamp + ".json";
         std::replace(filename.begin(), filename.end(), ' ', '_');
         std::replace(filename.begin(), filename.end(), ':', '-');

         std::ofstream outfile(dir_path / filename);
         outfile << json_str;
         outfile.close();

         this->m_path = dir_path.generic_string() + "/" + filename;
         conn.Query("DELETE FROM events");
      }
      catch (const std::exception &e)
      {
         this->m_err = e.what();
         break;
      }

   } while (pass);
}
void TagJson::update(const std::string &event_id, const std::string &ts_file, const std::string &tag)
{
   const int pass = 0;
   std::stringstream ss;
   do
   {
      try
      {
         fs::path dir_path = fs::path(this->m_basePath) / event_id;
         std::string filename = ts_file + ".json";
         std::ifstream input_file(dir_path / filename, std::ifstream::binary);
         auto files = list_files(dir_path);
         if (!input_file.is_open())
         {
            ss << "Could not open JSON file." << std::endl;
            this->m_err = ss.str();
            break;
         }

         Json::Value json_data;
         input_file >> json_data;
         input_file.close();

         // Parse the new tag JSON
         Json::CharReaderBuilder reader_builder;
         Json::CharReader *reader = reader_builder.newCharReader();
         Json::Value new_tag;
         std::string errors;

         bool parsing_successful = reader->parse(tag.c_str(), tag.c_str() + tag.size(), &new_tag, &errors);
         delete reader;

         if (!parsing_successful)
         {
            ss << "Failed to parse tag JSON: " + errors << std::endl;
            this->m_err = ss.str();
            break;
         }

         // Append the new tag to the data array
         if (json_data.isMember("data") && json_data["data"].isArray())
         {
            json_data["data"].append(new_tag);
         }
         else
         {
            ss << "The JSON file does not contain a valid data array." << std::endl;
            this->m_err = ss.str();
            break;
         }

         // Write the updated JSON back to the file
         std::ofstream output_file(dir_path / filename, std::ofstream::binary);
         if (!output_file.is_open())
         {
            ss << "Could not open JSON file for writing." << std::endl;
            this->m_err = ss.str();
            break;
         }

         Json::StreamWriterBuilder writer;
         output_file << Json::writeString(writer, json_data);
         output_file.close();
         this->m_path = dir_path.generic_string() + "/" + filename;
      }
      catch (const std::exception &e)
      {
         ss << "Error updating JSON file: " << e.what() << std::endl;
         this->m_err = ss.str();
         break;
      }
   } while (pass);
}

void TagJson::mark(const std::string &tag)
{
   duckdb::DuckDB db(nullptr); // In-memory database
   duckdb::Connection conn(db);
   conn.Query("LOAD 'json';");
   this->save(conn, tag, this->m_basePath);
}

TagJson::TagJson(const std::string &basePath) : m_basePath{basePath}, m_path{""}, m_err{""}
{
}

TagJson::~TagJson()
{
}