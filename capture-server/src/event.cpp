// event.cpp
#include "event.h"
#include "gateway.h"
#include <ctime>
#include "publisher.h"
#include "half-stack-exceptions.h"
#include <pqxx/pqxx>
#include <sstream>
#include "event-manager.h"
#include "past-event.h"
#include "client-factory.h"
// #include "minio-bridge.h"


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
    Gateway::instance().route("PUT", "/api/event/assets", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                //   MinioBridge client{};
                              });
    Gateway::instance().route("DELETE", "/api/event", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
    
    Gateway::instance().route("POST", "/api/event/send", 
                              [this](const Request &req, Response &rsp)
                              {
                                  std::string eventMessage = this->createEventMessage();
                                  spdlog::info("Created event message: {}", eventMessage);
                                  // Send eventMessage to Capture Server
                                  Publisher::instance().publish("capture-server-topic", eventMessage);
                                  rsp.setData("Event details sent to Capture Server");
                                  rsp.setStatus(200);
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

bool Event::isPastEvent(const std::string& dtEvent) {
    std::tm tm = {};
    std::istringstream ss(dtEvent);
    ss >> std::get_time(&tm, "%Y-%m-%d");
    std::time_t event_time = std::mktime(&tm);

    std::time_t now = std::time(nullptr);
    return difftime(now, event_time) > 0;
}

std::vector<Json::Value> Event::fetchPastEvents() {
    std::vector<Json::Value> pastEvents;
    try {
        // Create a JSON object representing the criteria
        Json::Value criteria(Json::arrayValue);
        Json::Value criterion;
        criterion["field"] = "dt_event";
        criterion["op"] = "<";
        criterion["value"] = "NOW()";
        criteria.append(criterion);

        Json::Value query;
        query["criteria"] = criteria;

        Json::FastWriter fastWriter;
        std::string queryString = fastWriter.write(query);

        // Use the list function from EntityBase
        Request request("", queryString); // Pass an empty string for the query part, and the queryString for the data part
        Response response;

        spdlog::info("Executing list to fetch past events with query: {}", queryString);
        
        // Create an instance of Event to call the list method
        Event eventInstance;
        eventInstance.list(request, response); // Call the list method on the instance

        // Directly use the response data without additional parsing
        const std::string& responseDataStr = response.data();
        spdlog::info("Fetched events response: {}", responseDataStr);

        Json::Value responseData;
        Json::Reader reader;
        if (!reader.parse(responseDataStr, responseData)) {
            spdlog::error("Failed to parse response data: {}", reader.getFormattedErrorMessages());
            return pastEvents;
        }

        Json::Value events = responseData["Gateway Response"]["result"];

        // Filter the events to ensure only past events are included
        std::time_t now = std::time(nullptr);
        for (const auto& event : events) {
            Json::Value eventObj(Json::objectValue);
            for (const auto& field : event) {
                eventObj[field["field"].asString()] = field["value"];
            }

            // Check if the event is in the past
            std::tm tm = {};
            std::istringstream ss(eventObj["dt_event"].asString());
            ss >> std::get_time(&tm, "%Y-%m-%d");
            std::time_t event_time = std::mktime(&tm);

            if (difftime(now, event_time) > 0) {
                pastEvents.push_back(eventObj);
            }
        }

        spdlog::info("Fetched {} past events", pastEvents.size());
    } catch (const std::exception& e) {
        spdlog::error("Error fetching past events: {}", e.what());
    }

    return pastEvents;
}

std::string Event::createEventMessage() const {
    Json::Value eventMessage;
    eventMessage["id"] = this->id();
    eventMessage["title"] = this->title();
    eventMessage["sport"] = this->sport();
    eventMessage["level"] = this->level();
    eventMessage["program"] = this->program();
    eventMessage["year"] = this->year();
    eventMessage["dt_event"] = this->dtEvent();
    eventMessage["tm_event"] = this->tmEvent();
    eventMessage["venue"]["location"] = this->venueLocation();
    eventMessage["detail"]["cityAddress"] = this->cityAddress();
    eventMessage["detail"]["streetAddress"] = this->streetAddress();
    eventMessage["status"] = this->status();
    eventMessage["type"] = this->type();
    // Add more fields as needed, e.g., video_duration, shared_with, etc.

    Json::FastWriter writer;
    return writer.write(eventMessage);
}
