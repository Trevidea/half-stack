#include "past-event.h"
#include "gateway.h"
#include "gateway.h"
#include <pqxx/pqxx>
#include <sstream>
#include "spdlog/spdlog.h"

PastEvent::PastEvent() : EntityBase("pastevent")
{
}

void PastEvent::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/events/past", // To request past events
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/events/past", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/events/past", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/events/past", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/events/past", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
