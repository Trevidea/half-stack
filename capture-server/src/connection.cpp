#include "connection.h"
#include "gateway.h"

Connection::Connection() : EntityBase("connections") {}

void Connection::report() {
    EntityBase::report();
    Gateway::instance().route("GET", "/api/connections", // To request LIST
                              [this](const Request &req, Response &rsp) {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/connection", // To request SINGLE
                              [this](const Request &req, Response &rsp) {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/connection", // To request INSERT
                              [this](const Request &req, Response &rsp) {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/connection", // To request UPDATE
                              [this](const Request &req, Response &rsp) {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/connection", // To request DELETE
                              [this](const Request &req, Response &rsp) {
                                  this->remove(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/connection/details", // To request details of a single connection
                              [this](const Request &req, Response &rsp) {
                                  this->getDetails(req, rsp);
                              });
}

Connection::~Connection() {}

void Connection::getDetails(const Request &request, Response &response) {
    try {
        // Extract connection ID from request parameters
        int connectionId = std::stoi(request.getQueryValue("connection_id"));

        // Construct SQL query to select connection details based on ID
        std::string sql = "SELECT * FROM connections WHERE id = " + std::to_string(connectionId);

        // Execute SQL query to fetch connection details
        PGResult result = executeSqlModel(sql);

        // Check if any rows were returned
        if (!result.empty()) {
            // Retrieve details of the connection from the first row
            Model connectionModel = result.models()[0];

            // Serialize the connection details to JSON
            Json::Value jsonResponse;
            jsonResponse["id"] = connectionModel.get<int>("id");
            jsonResponse["user_id"] = connectionModel.get<int>("user_id");
            jsonResponse["network_quality"] = connectionModel.get<std::string>("network_quality");
            jsonResponse["ip_address"] = connectionModel.get<std::string>("ip_add");
            jsonResponse["is_disabled"] = connectionModel.get<bool>("is_disabled");
            jsonResponse["type"] = connectionModel.get<std::string>("type");
            jsonResponse["dtt_connected"] = connectionModel.get<std::string>("dtt_connected");
            jsonResponse["priority"] = connectionModel.get<std::string>("priority");
            jsonResponse["location"] = connectionModel.get<std::string>("location");
            jsonResponse["event_id"] = connectionModel.get<int>("event_id");

            // Send the JSON response
            response.setData(Json::FastWriter().write(jsonResponse));
            response.complete();
        } else {
            // If no rows were returned, send a message indicating the connection was not found
            response.setData("Connection not found");
            response.complete();
        }
    } catch (const std::exception &ex) {
        // Handle exceptions
        response.setData("Internal server error");
        response.complete();
    }
}

