#include "event.h"
#include "gateway.h"
#include <ctime>
#include "publisher.h"
#include "half-stack-exceptions.h"
#include <pqxx/pqxx>
#include <sstream>
#include "event-manager.h"
#include "past-event.h"

Event::Event() : EntityBase("event")
{
}

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
    Gateway::instance().route("POST", "/api/event/sync", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->sync(req, rsp);
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

    // Instantiate PastEvent and call its report method
    PastEvent pastEvent;
    pastEvent.report();
}

std::string Event::venueLocation() const
{
    return m_model.get<std::string>("venue", "location");
}

void Event::setVenueLocation(const std::string &value)
{
    m_model.set(value, "venue","location");
}

std::string Event::streetAddress() const
{
    return m_model.get<std::string>("detail", "streetAddress");
}

void Event::setStreetAddress(const std::string &value)
{
    m_model.set(value, "detail", "streetAddress");
}

std::string Event::cityAddress() const
{
    return m_model.get<std::string>("detail", "cityAddress");
}

void Event::setCityAddress(const std::string &value)
{
    m_model.set(value, "detail", "cityAddress");
}

void Event::updateStatus(const Event::EVENT_STATUS status)
{
    switch (status)
    {
    case Event::EVENT_STATUS::ON_GOING:
    this->set("on-going", "status");
        break;
    case Event::EVENT_STATUS::PAST:
    this->set("past", "status");
        break;
    default:
    this->set("upcoming", "status");
        break;
    }
    this->update();
}