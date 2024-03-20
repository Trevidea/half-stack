#include "event.h"
#include "gateway.h"
#include "json/json.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/events", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });

}

void Event::listUpcoming(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"("result":[{"name":"shreya"}],"count":1)");
    // Set appropriate headers and status code
    rsp.complete();
}