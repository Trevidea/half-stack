#include "team.h"
#include "gateway.h" // Assuming this includes definitions for Gateway
#include "json/json.h"
#include "sqlhelper.h"

Team::Team() : EntityBase("team") {}

void Team::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/teams", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/team", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/team", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/team", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/team", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}

// Implement the create method within the Team class definition
Json::Value Team::create(const Request &request, Response &response) {
    // Parse JSON data from the request body
    Json::Value jsonData = request.json();

    // Extract data from JSON
    std::string name = jsonData["name"].asString();
    std::string logo = jsonData["logo"].asString();

    // Construct the SQL query to insert data into the team table
    std::string sql = "INSERT INTO team (name, logo) VALUES ('" + name + "', '" + logo + "')";

    try {
        // Execute the SQL query using executeSql
        executeSql(sql);

        // Return success response
        response.setData("Data inserted successfully.");
        response.complete();
        
        // Return a placeholder Json::Value since the method signature requires it
        return Json::Value();
    } catch (const std::exception &ex) {
        // Handle any errors that occur during execution
        response.setData("Error: " + std::string(ex.what()));
        response.complete();
        
        // Return a placeholder Json::Value since the method signature requires it
        return Json::Value();
    }
}

// Implement the remove method within the Team class definition
Json::Value Team::remove(const Request &request, Response &response) {
    // Parse JSON data from the request body
    Json::Value jsonData = request.json();

    // Extract data from JSON
    int id = jsonData["id"].asInt(); // Assuming the JSON contains the ID of the record to delete

    // Construct the SQL query to delete data from the team table based on the provided ID
    std::string sql = "DELETE FROM team WHERE id = " + std::to_string(id);

    try {
        // Execute the SQL query using executeSql
        executeSql(sql);

        // Return success response
        response.setData("Data deleted successfully.");
        response.complete();
        
        // Return a placeholder Json::Value since the method signature requires it
        return Json::Value();
    } catch (const std::exception &ex) {
        // Handle any errors that occur during execution
        response.setData("Error: " + std::string(ex.what()));
        response.complete();
        
        // Return a placeholder Json::Value since the method signature requires it
        return Json::Value();
    }
}