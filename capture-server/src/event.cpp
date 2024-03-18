#include "event.h"
#include "gateway.h"

Event::Event() : EntityBase("event")
{
}

void Event::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/events/upcoming", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->listUpcoming(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/events/ongoing", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->listOngoing(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/events/past", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->listPast(req, rsp);
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
}

std::vector<Event> Event::forPeriod(int year, const std::string &status)
{
    char eventQry[128] = {0};
    snprintf(eventQry, 128, "year=%d AND status='%s'", year, status.c_str());
    return EntityBase::find<Event>(eventQry);
}

Event::~Event()
{
}
