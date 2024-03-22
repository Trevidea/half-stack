#include "event.h"
#include "gateway.h"
#include "json/json.h"
#include "client-factory.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/event/upcoming", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });

    // Gateway::instance().route("GET", "api/event/ongoing", [this](const Request req, Response &rsp)
    //                           { this->listOngoing(req, rsp); });

    // Gateway::instance().route("GET", "api/event/past", [this](const Request req, Response &rsp)
    //                           { this->listPast(req, rsp); });

    // Route definition for the sync function
    Gateway::instance().route("GET", "/api/event/sync", [this](const Request &req, Response &rsp)
                              { this->sync(req, rsp); });
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

// void Event::listOngoing(const Request &req, Response &rsp)
// {
//     rsp.complete();
// }

// void Event::listPast(const Request &req, Response &rsp)
// {
//     rsp.complete();
// }

void Event::sync(const Request &req, Response &rsp)
{
    ClientFactory &factory = ClientFactory::getInstance();

    Client client = factory.create("http://drake.in:1337/api/events");
    client.get([](const std::string &s)
               { 
                spdlog::trace("success..{}", s); 
                /*write the code to first delete all scheduled-events in existing db and then save this data to the local db*/
                },
               [](const std::string &s)
               {
                   spdlog::trace("failure..{}", s);
               });

    rsp.setData("Sync operation completed successfully.");
    rsp.complete();
}