#include "event.h"
#include "gateway.h"
#include "json/json.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    // Route definitions
    Gateway::instance().route("GET", "/api/events", [this](const Request &req, Response &rsp)
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
    // Set the response body with the JSON data
    rsp.setData(R"("result":[{"name":"shreya"}],"count":1)");
    // Set appropriate headers and status code
    rsp.complete();
}

void Event::listOngoing(const Request &req, Response &rsp)
{
    // Process ongoing events...
}

void Event::listPast(const Request &req, Response &rsp)
{
    // Process past events...
}

void Event::find(const Request &req, Response &rsp)
{
    // Process finding a specific event...
}

void Event::create(const Request &req, Response &rsp)
{
    // Process creating a new event...
}

void Event::update(const Request &req, Response &rsp)
{
    // Process updating an existing event...
}

void Event::remove(const Request &req, Response &rsp)
{
    // Process removing an existing event...
}

std::vector<Event> Event::forPeriodAndStatus(const std::string &startDateTime, const std::string &endDateTime, const std::string &status)
{
    // Call the corresponding method of EntityBase to find events for a specific period and status
    return EntityBase::find<Event>("startDateTime=" + startDateTime + "&endDateTime=" + endDateTime + "&status=" + status);
}
