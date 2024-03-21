#include "event.h"
#include "gateway.h"
#include "json/json.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/event/upcoming", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });
}

void Event::listUpcoming(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"V0G0N(" {
        "Absolute URI" : "/api/event/template",
             "Gateway Response" : [
               {
                    "sport": "Football",
                    "level": "Professional",
                    "program": "Championship",
                    "year": 2024,
                    "dttEvent": "2024-03-19T18:00:00Z",
                    "venue": {
                        "location": "Cityville Stadium"
                    },
                    "onPremise": true,
                    "detail": {
                        "streetAddress": "123 Main St",
                        "cityAddress": "Cityville",
                        "type": "Scheduled Event"
                    },
                    "title": "Championship Final",
                    "status": "Upcoming"
                }
            ]
        } ")V0G0N");
    // Set appropriate headers and status code
    rsp.complete();
}