#include "event.h"
#include "gateway.h"
#include "json/json.h"
#include "sqlhelper.h"
#include "pqxx/pqxx"
#include <iomanip> // Include for std::put_time
#include <sstream> // Include for std::stringstream

// Event::Event() : EntityBase("event") {}

void Event::report() {
    EntityBase::report();
    // Route definitions...
    Gateway::instance().route("GET", "/api/events", // To request LIST
                              [this](const Request &req, Response &rsp) {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/event", // To request SINGLE
                              [this](const Request &req, Response &rsp) {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event", // To request INSERT
                              [this](const Request &req, Response &rsp) {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/event", // To request UPDATE
                              [this](const Request &req, Response &rsp) {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/event", // To request DELETE
                              [this](const Request &req, Response &rsp) {
                                  this->remove(req, rsp);
                              });
}

int Event::saveEventToDatabase(const std::string &title, const std::string &level,
                               const std::string &program, int year, const std::tm &dt_event_tm,
                               int tm_event, const Venue &venue, const EventDetail &detail,
                               EventStatus status, EventType type) {
    // Convert Venue to JSON
    Json::Value venueJson;
    venueJson["location"] = venue.location;
    std::string venueStr = venueJson.toStyledString();

    // Convert EventDetail to JSON
    Json::Value detailJson;
    detailJson["type"] = detail.type;
    detailJson["streetAddress"] = detail.streetAddress;
    detailJson["cityAddress"] = detail.cityAddress;
    std::string detailStr = detailJson.toStyledString();

    // Format the dt_event as string for SQL
    std::stringstream dt_event_ss;
    dt_event_ss << std::put_time(&dt_event_tm, "%Y-%m-%d");

    // Construct the SQL query to insert data into the event table
    std::string sql = "INSERT INTO event (title, level, program, dt_event, tm_event, venue, detail, status, type) VALUES ('" +
                        title + "', '" + level + "', '" + program + "', '" + dt_event_ss.str() + "', " + std::to_string(tm_event) +
                        ", '" + venueStr + "', '" + detailStr + "', '" + std::to_string(static_cast<int>(status)) + "', '" + std::to_string(static_cast<int>(type)) + "')";

    try {
        // Execute the SQL query using executeSql from EntityBase
        executeSql(sql);

        // Return success status
        return 1; // Placeholder value for success
    } catch (const std::exception &ex) {
        // Handle any errors that occur during execution
        throw std::runtime_error("Failed to save event to database: " + std::string(ex.what()));
    }
}

Json::Value Event::create(const Request &request, Response &response) {
    // Parse JSON data from the request body
    Json::Value jsonData = request.json();

    // Extract data from JSON
    std::string title = jsonData["title"].asString();
    std::string level = jsonData["level"].asString();
    std::string program = jsonData["program"].asString();
    std::string dt_event_str = jsonData["dt_event"].asString();
    int tm_event = jsonData["tm_event"].asInt();
    int year = jsonData["year"].asInt(); // Extract year from JSON
    Venue venue;
    venue.location = jsonData["venue"]["location"].asString();
    EventDetail detail;
    detail.type = jsonData["detail"]["type"].asString();
    detail.streetAddress = jsonData["detail"]["streetAddress"].asString();
    detail.cityAddress = jsonData["detail"]["cityAddress"].asString();
    EventStatus status;
    std::string status_str = jsonData["status"].asString();
    if (status_str == "Upcoming") {
        status = EventStatus::Upcoming;
    } else if (status_str == "OnGoing") {
        status = EventStatus::OnGoing;
    } else if (status_str == "Past") {
        status = EventStatus::Past;
    } else {
        // Handle invalid status value
        // Return an error response
        response.setData("Invalid status value.");
        response.complete();
        return Json::Value();
    }
    EventType type;
    std::string type_str = jsonData["type"].asString();
    if (type_str == "OnDemand") {
        type = EventType::OnDemand;
    } else if (type_str == "Scheduled") {
        type = EventType::Scheduled;
    } else {
        // Handle invalid type value
        // Return an error response
        response.setData("Invalid type value.");
        response.complete();
        return Json::Value();
    }

    // Parse dt_event string to std::tm
    std::tm dt_event_tm = {};
    std::stringstream dt_ss(dt_event_str);
    dt_ss >> std::get_time(&dt_event_tm, "%Y-%m-%d");

    // Save the data into the Event table and get the event ID
    int eventId = saveEventToDatabase(title, level, program, year, dt_event_tm, tm_event, venue, detail, status, type);

    // Construct a JSON response with the generated event_id
    Json::Value responseData;
    responseData["event_id"] = eventId;

    // Set response data and complete the response
    response.setData(responseData.toStyledString());
    response.complete();

    // Return a placeholder Json::Value since the method signature requires it
    return Json::Value();
}


Json::Value Event::remove(const Request &request, Response &response) {
    // Parse JSON data from the request body
    Json::Value jsonData = request.json();

    // Extract data from JSON
    int id = jsonData["id"].asInt(); // Assuming the JSON contains the ID of the record to delete

    // Construct the SQL query to delete data from the event table based on the provided ID
    std::string sql = "DELETE FROM event_table WHERE id = " + std::to_string(id);

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

int Event::save() {
    // Call saveEventToDatabase with all required parameters
    return saveEventToDatabase(title, level, program, year, dt_event, tm_event, venue, detail, status, type);
}

void Event::setVenue(const Venue &venue) {
    this->venue = venue;
}

void Event::setDetail(const EventDetail &detail) {
    this->detail = detail;
}

void Event::executeSql(const std::string &sql) {
    try {
        // Establish a connection to your PostgreSQL database
        pqxx::connection conn("postgresql://postgres:btc.008@192.168.1.50:5432/half-stack"); // Replace "your_connection_string" with your actual connection string

        // Create a transaction
        pqxx::work txn(conn);

        // Execute the SQL query
        txn.exec(sql);

        // Commit the transaction
        txn.commit();
    } catch (const std::exception &ex) {
        // Handle any errors that occur during execution
        throw std::runtime_error("Failed to execute SQL query: " + std::string(ex.what()));
    }
}