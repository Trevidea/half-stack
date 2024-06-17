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
    // Hardcoded past event data
    Json::Value event1;
    event1["sport"] = "Football";
    event1["level"] = "Varsity";
    event1["program"] = "Man";
    event1["year"] = 2024;
    event1["dt_event"] = "2024-05-31";
    event1["tm_event"] = 1845;
    event1["venue"]["location"] = "Madison Square Garden";
    event1["detail"]["cityAddress"] = "44, Pennsylvania";
    event1["detail"]["streetAddress"] = "Georgia";
    event1["title"] = "Real Madrid vs Manchester United";
    event1["status"] = "past";
    event1["type"] = "on-demand";

    Json::Value event2;
    event2["sport"] = "Basketball";
    event2["level"] = "Varsity";
    event2["program"] = "Women";
    event2["year"] = 2023;
    event2["dt_event"] = "2023-12-15";
    event2["tm_event"] = 1930;
    event2["venue"]["location"] = "Staples Center";
    event2["detail"]["cityAddress"] = "111, Figueroa Street";
    event2["detail"]["streetAddress"] = "Los Angeles";
    event2["title"] = "Lakers vs Warriors";
    event2["status"] = "past";
    event2["type"] = "live";

    Json::Value event3;
    event3["sport"] = "Tennis";
    event3["level"] = "Open";
    event3["program"] = "Mixed";
    event3["year"] = 2022;
    event3["dt_event"] = "2022-09-10";
    event3["tm_event"] = 1500;
    event3["venue"]["location"] = "Arthur Ashe Stadium";
    event3["detail"]["cityAddress"] = "Flushing Meadows";
    event3["detail"]["streetAddress"] = "New York";
    event3["title"] = "US Open Final";
    event3["status"] = "past";
    event3["type"] = "tournament";

    std::vector<Json::Value> pastEvents;
    pastEvents.push_back(event1);
    pastEvents.push_back(event2);
    pastEvents.push_back(event3);

    return pastEvents;
}

std::string Event::createEventMessage() const {
    std::stringstream ss;
    ss << "Event Details:\n";
    ss << "ID: " << m_model.get<int>("id") << "\n";
    ss << "Sport: " << sport() << "\n";
    ss << "Level: " << level() << "\n";
    ss << "Program: " << program() << "\n";
    ss << "Year: " << std::to_string(year()) << "\n";
    ss << "Date: " << dtEvent() << "\n";
    ss << "Time: " << std::to_string(tmEvent()) << "\n";
    ss << "Title: " << title() << "\n";
    ss << "Status: " << status() << "\n";
    ss << "Type: " << type() << "\n";
    ss << "Venue Location: " << venueLocation() << "\n";
    ss << "Street Address: " << streetAddress() << "\n";
    ss << "City Address: " << cityAddress() << "\n";
    return ss.str();
}
