#include "event.h"
#include "gateway.h"

Event::Event() : EntityBase("event")
{
}

void Event::report()
{
    // Route definitions
    Gateway::instance().route("GET", "/api/events/upcoming", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });

    Gateway::instance().route("GET", "/api/events/ongoing", [this](const Request &req, Response &rsp)
                              { this->listOngoing(req, rsp); });

    Gateway::instance().route("GET", "/api/events/past", [this](const Request &req, Response &rsp)
                              { this->listPast(req, rsp); });

    Gateway::instance().route("GET", "/api/event", [this](const Request &req, Response &rsp)
                              { this->find(req, rsp); });

    Gateway::instance().route("POST", "/api/event", [this](const Request &req, Response &rsp)
                              { this->create(req, rsp); });

    Gateway::instance().route("PUT", "/api/event", [this](const Request &req, Response &rsp)
                              { this->update(req, rsp); });

    Gateway::instance().route("DELETE", "/api/event", [this](const Request &req, Response &rsp)
                              { this->remove(req, rsp); });
}

void Event::listUpcoming(const Request &req, Response &rsp)
{
    // Call the list method of EntityBase to retrieve upcoming events
    EntityBase::list<Event>();
}

void Event::listOngoing(const Request &req, Response &rsp)
{
    // Call the list method of EntityBase to retrieve ongoing events
    EntityBase::list<Event>();
}

void Event::listPast(const Request &req, Response &rsp)
{
    // Call the list method of EntityBase to retrieve past events
    EntityBase::list<Event>();
}

void Event::find(const Request &req, Response &rsp)
{
    // Call the find method of EntityBase to find a specific event
    EntityBase::find<Event>(req.queryString());
}

void Event::create(const Request &req, Response &rsp)
{
    // Call the create method of EntityBase to create a new event
    EntityBase::create<Event>(req, rsp);
}

void Event::update(const Request &req, Response &rsp)
{
    // Call the update method of EntityBase to update an existing event
    EntityBase::update<Event>(req, rsp);
}

void Event::remove(const Request &req, Response &rsp)
{
    // Call the remove method of EntityBase to remove an existing event
    EntityBase::remove<Event>(req.queryString());
}

std::vector<Event> Event::forPeriodAndStatus(const std::string &startDateTime, const std::string &endDateTime, const std::string &status)
{
    // Call the corresponding method of EntityBase to find events for a specific period and status
    return EntityBase::find<Event>("startDateTime=" + startDateTime + "&endDateTime=" + endDateTime + "&status=" + status);
}
