#include "event.h"
#include "gateway.h"
#include "json/json.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/events/upcoming", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });
}

void Event::listUpcoming(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"V0G0N(" {
        "Absolute URI" : "/api/event/",
                         "Gateway Response" : [
                             {
                                 "field" : "id",
                                 "type" : 1,
                                 "value" : "Unknown"
                             },
                             {
                                 "field" : "year",
                                 "type" : 1,
                                 "value" : "Unknown"
                             },
                             {
                                 "field" : "dttevent",
                                 "type" : 1,
                                 "value" : "Unknown"
                             },
                             {
                                 "field" : "venue",
                                 "type" : 1,
                                 "value" : "Unknown"
                             },
                             {
                                 "field" : "onpremise",
                                 "type" : 1,
                                 "value" : true
                             },
                             {
                                 "field" : "detail",
                                 "type" : 1,
                                 "value" : "Unknown"
                             },
                             {
                                 "field" : "sport",
                                 "type" : 1,
                                 "value" : "var-char"
                             },
                             {
                                 "field" : "level",
                                 "type" : 1,
                                 "value" : "var-char"
                             },
                             {
                                 "field" : "program",
                                 "type" : 1,
                                 "value" : "var-char"
                             },
                             {
                                 "field" : "status",
                                 "type" : 1,
                                 "value" : "var-char"
                             },
                             {
                                 "field" : "title",
                                 "type" : 1,
                                 "value" : "var-char"
                             }
                         ]
    } ")V0G0N");
    // Set appropriate headers and status code
    rsp.complete();
}