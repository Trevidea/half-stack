#include "tag-json.h"

#include <iostream>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

using namespace duckdb;

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