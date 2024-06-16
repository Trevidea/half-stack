// past-event.cpp
#include "past-event.h"
#include "gateway.h"
#include "event.h"
#include <sstream>
#include "spdlog/spdlog.h"
#include "json/json.h"

PastEvent::PastEvent() : EntityBase("pastevent")
{
}

void PastEvent::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/past-event", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  this->listPastEvents(req, rsp);
                              });
}

void PastEvent::listPastEvents(const Request &req, Response &rsp)
{
    auto pastEvents = Event::fetchPastEvents(); // Call the static method correctly
    Json::Value result(Json::arrayValue);
    for (const auto &e : pastEvents)
    {
        result.append(e);
    }

    // Set the response data with the JSON result
    rsp.setData(result.toStyledString());
}
