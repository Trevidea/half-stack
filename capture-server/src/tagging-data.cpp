#include "tagging-data.h"
#include "gateway.h"
#include <sstream>
#include "spdlog/spdlog.h"
#include <fstream>
#include <filesystem>
#include <iomanip>
#include <ctime>

namespace fs = std::filesystem;

TaggingData::TaggingData() : EntityBase("tagging-data")
{
}

void TaggingData::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/tagging-data", 
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/tagging-data", 
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });

    Gateway::instance().route("PUT", "/api/tagging-data", 
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/tagging-data", 
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/tagging-data/tag", // New route for tagging
                              [this](const Request &req, Response &rsp)
                              {
                                  this->tag(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/tagging-data/query", // New route for querying tags
                              [this](const Request &req, Response &rsp)
                              {
                                  this->query(req, rsp);
                              });
}

void TaggingData::tag(const Request &req, Response &rsp)
{
    auto body = req.data();
    Json::Value root;
    Json::Reader reader;
    if (!reader.parse(body, root))
    {
        rsp.setStatus(400);
        rsp.setData("Invalid JSON");
        rsp.complete();
        spdlog::error("Invalid JSON received: {}", body);
        return;
    }

    std::string timestamp = root.get("timestamp", "").asString();
    std::string duration = root.get("duration", "").asString();
    Json::Value data = root["data"];

    // Construct JSON for creating the database entry
    Json::Value dbJson;
    dbJson["table"] = "tagging_data";
    dbJson["columns"] = Json::arrayValue;
    
    Json::Value column;
    column["field"] = "timestamp";
    column["type"] = 1;
    column["value"] = timestamp;
    dbJson["columns"].append(column);

    column["field"] = "duration";
    column["type"] = 1;
    column["value"] = duration;
    dbJson["columns"].append(column);

    column["field"] = "data";
    column["type"] = 5;
    column["value"] = data.toStyledString();
    dbJson["columns"].append(column);

    // Create a Request object from the JSON
    std::stringstream ss;
    ss << dbJson;
    std::string dbJsonString = ss.str();
    std::string query; // Use an empty query string or adapt as needed
    Request dbRequest(query, dbJsonString);

    // Save the tag to the database
    Json::Value dbResponse = this->create(dbRequest, rsp);

    // Convert dbResponse to a string and set it in rsp
    Json::StreamWriterBuilder writer;
    std::string dbResponseStr = Json::writeString(writer, dbResponse);

    // Debugging: Log the response being set
    spdlog::info("Database response: {}", dbResponseStr);

    // Check if the response is empty or not set
    if (dbResponseStr.empty())
    {
        dbResponseStr = "{\"message\":\"Tag created in database but no additional response\"}";
    }

    rsp.setData(dbResponseStr);

    // Save the tag to a JSON file
    try {
        std::string event_folder = "/Users/shreyapathak20/git/test_events/" + timestamp;

        fs::create_directories(event_folder);
        std::ofstream file(event_folder + "/tag.json");
        file << root.toStyledString();
        file.close();

        spdlog::info("JSON file created successfully at {}", event_folder + "/tag.json");
    } catch (const std::exception &e) {
        spdlog::error("Error creating JSON file: {}", e.what());
        rsp.setStatus(500);
        rsp.setData("Error creating JSON file");
        rsp.complete();
        return;
    }

    // Set the gateway response
    Json::Value response;
    response = "Tag saved successfully";
    std::string responseStr = Json::writeString(writer, response);

    rsp.setStatus(200);
    rsp.setData(responseStr);
    rsp.complete();
}

void TaggingData::query(const Request &req, Response &rsp)
{
    // Extract query parameters using getQueryValue method
    std::string timestamp = req.getQueryValue("timestamp");
    std::string duration = req.getQueryValue("duration");
    std::string data = req.getQueryValue("data");

    // Construct the SQL query based on the parameters
    std::stringstream queryStream;
    queryStream << "SELECT * FROM tagging_data WHERE 1=1";
    if (!timestamp.empty()) {
        queryStream << " AND timestamp = '" << timestamp << "'";
    }
    if (!duration.empty()) {
        queryStream << " AND duration = '" << duration << "'";
    }
    if (!data.empty()) {
        queryStream << " AND data @> '" << data << "'";
    }

    std::string sqlQuery = queryStream.str();
    spdlog::info("Executing query: {}", sqlQuery);

    // Execute the query and fetch results
    try {
        std::string results = this->executeSqlStr(sqlQuery);
        rsp.setStatus(200);
        rsp.setData(results);
        rsp.complete();
    } catch (const std::exception &e) {
        spdlog::error("Error executing query: {}", e.what());
        rsp.setStatus(500);
        rsp.setData("Error executing query");
        rsp.complete();
    }
}