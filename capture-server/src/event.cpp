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
    // Route definition for the sync function
    Gateway::instance().route("POST", "/api/event/sync", [this](const Request &req, Response &rsp)
                              { this->sync(req, rsp); });
}

