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

    Gateway::instance().route("GET", "api/event/ongoing", [this](const Request req, Response &rsp)
                              { this->listOngoing(req, rsp); });

    Gateway::instance().route("GET", "api/event/past", [this](const Request req, Response &rsp)
                              { this->listPast(req, rsp); });
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

void Event::listOngoing(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"V0G0N(" {
        "Absolute URI" : "/api/event/template",
             "Gateway Response" : [
               {
                    "sport": "Basketball",
                    "level": "College",
                    "program": "Division I",
                    "year": 2024,
                    "dttEvent": "2024-03-21T19:30:00Z",
                    "venue": {
                        "location": "University Arena"
                    },
                    "onPremise": true,
                    "detail": {
                        "streetAddress": "456 University Ave",
                        "cityAddress": "Collegeville",
                        "type": "Scheduled Event"
                    },
                    "title": "Division I Championship Game",
                    "status": "Ongoing"
                }
            ]
        } ")V0G0N");
    // Set appropriate headers and status code
    rsp.complete();
}

void Event::listPast(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"V0G0N(" {
        "Absolute URI" : "/api/event/template",
             "Gateway Response" : [
               {
                    "sport": "Tennis",
                    "level": "Amateur",
                    "program": "Local Tournament",
                    "year": 2023,
                    "dttEvent": "2023-07-15T14:00:00Z",
                    "venue": {
                        "location": "Community Tennis Club"
                    },
                    "onPremise": true,
                    "detail": {
                        "streetAddress": "789 Park Ave",
                        "cityAddress": "Townsville",
                        "type": "Scheduled Event"
                    },
                    "title": "Townsville Open",
                    "status": "Completed"
                }
            ]
        } ")V0G0N");
    // Set appropriate headers and status code
    rsp.complete();
}