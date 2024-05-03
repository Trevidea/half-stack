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
    Gateway::instance().route("GET", "/api/connection/activities", // To request details of a single connection
                              [this](const Request &req, Response &rsp) {
                                  this->getActivities(req, rsp);
                              });
}

Connection::~Connection() {}

void Connection::getDetails(const Request &request, Response &response) {
    
}

void Connection::getActivities(const Request &request, Response &response) {
    
}

