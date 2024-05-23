#include "event.h"
#include "gateway.h"
#include <ctime>
#include "publisher.h"
#include "half-stack-exceptions.h"
#include <pqxx/pqxx>
#include <sstream>
#include "event-manager.h"

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
}

void Event::validateEventId(int eventId)
{
    try
    {
        // Retrieve the event by its ID
        auto event = EntityBase::byId<Event>(eventId);

        // Check if the event is upcoming or live based on minutes to start
        auto minsToStart = event.minutesToStart();
        if (minsToStart >= 0)
        {
            // Event is upcoming or live
            spdlog::trace("Event ID {} is upcoming or live.", eventId);
        }
        else
        {
            // Event is not upcoming or live
            spdlog::error("Event ID {} does not correspond to an upcoming or live event.", eventId);
            throw std::runtime_error("Event ID does not correspond to an upcoming or live event.");
        }
    }
    catch (const ExModelNotFoundException &e)
    {
        // Handle the case where the event is not found
        spdlog::error("Event ID {} not found.", eventId);
        throw std::runtime_error("Event ID not found.");
    }
    catch (const std::exception &e)
    {
        // Handle other exceptions
        spdlog::error("An error occurred while validating event ID {}: {}", eventId, e.what());
        throw;
    }
}

std::string Event::venueLocation() const
{
    return m_model.get<std::string>("venue", "location");
}

void Event::setVenueLocation(const std::string &value)
{
    // m_model.set("venue","location", value);
}

// std::string Event::detailType() const
// {
//     return m_model.get<Json::Value>("detail")["type"].asString();
// }

// void Event::setDetailType(const std::string &value)
// {
//     m_model.get<Json::Value>("detail")["type"] = value;
// }

// std::string Event::streetAddress() const
// {
//     return m_model.get<Json::Value>("detail")["streetAddress"].asString();
// }

// void Event::setStreetAddress(const std::string &value)
// {
//     m_model.get<Json::Value>("detail")["streetAddress"] = value;
// }

// std::string Event::cityAddress() const
// {
//     return m_model.get<Json::Value>("detail")["cityAddress"].asString();
// }

// void Event::setCityAddress(const std::string &value)
// {
//     m_model.get<Json::Value>("detail")["cityAddress"] = value;
// }
