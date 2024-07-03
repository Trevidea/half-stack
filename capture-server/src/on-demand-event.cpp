//on-demand-event.cpp
#include "on-demand-event.h"
#include "event.h"
#include "gateway.h"
#include "json/json.h"


OnDemandEvent::OnDemandEvent() : EntityBase("ondemandevent") {}

void OnDemandEvent::report()
{
    EntityBase::report();

    // Route definitions
    Gateway::instance().route("GET", "/api/on-demand-events", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/on-demand-event", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/on-demand-event",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/on-demand-event", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/on-demand-event/:id",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
