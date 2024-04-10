#include "event.h"
#include "gateway.h"
#include "json/json.h"
#include "sqlhelper.h"
#include "pqxx/pqxx"
#include <iomanip> // Include for std::put_time
#include <sstream> // Include for std::stringstream

Event::Event() : EntityBase("event"),
                 mp_runner{nullptr} {}

void Event::report()
{
    EntityBase::report();
    // Route definitions...
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
    Gateway::instance().route("POST", "/api/event/start", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->startEvent(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event/end", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->stopEvent(req, rsp);
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
}

void Event::startEvent(const Request &req, Response rsp)
{
    
}
void Event::stopEvent(const Request &req, Response rsp)
{
}
