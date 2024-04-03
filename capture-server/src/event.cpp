#include "event.h"
#include "gateway.h"
#include "json/json.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/events", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/event", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/event", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/event", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
    // Route definition for the sync function
    Gateway::instance().route("POST", "/api/event/sync", [this](const Request &req, Response &rsp)
                              { this->sync(req, rsp); });
}

// Implementation of the setTitle method
void Event::setTitle(const std::string &title)
{
    this->title = title; // Assuming 'title' is a member variable of the Event class
}

bool Event::executeSql(const std::string &sql)
{
    // Code to execute the SQL query using your database connection
    // Replace this with your actual database interaction code
    // Return true if the query is executed successfully, false otherwise
}

Json::Value Event::create(const Request &request, Response &response)
{
    Json::Value jsonData = request.json();

    // Extract data from the JSON request
    std::string title = jsonData["title"].asString();
    // Extract other relevant data from the JSON request

    try
    {
        // Construct the SQL query to insert data into the event table
        std::string sql = "INSERT INTO event (title, ...) VALUES ('" + title + "', ...)";

        // Execute the SQL query using your database connection
        // Replace `executeSql` with your actual method for executing SQL queries
        bool success = executeSql(sql);

        if (success)
        {
            // Return success response
            response.setData("Event created successfully.");
            response.complete();
        }
        else
        {
            // Handle database errors
            response.setData("Error: Failed to create event in the database.");
            response.complete();
        }
    }
    catch (const std::exception &ex)
    {
        // Handle any other errors that occur during execution
        response.setData("Error: " + std::string(ex.what()));
        response.complete();
    }

    // Return a placeholder Json::Value since the method signature requires it
    return Json::Value();
}
