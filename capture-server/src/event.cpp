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
    
    Gateway::instance().route("POST", "/api/event/send", 
                              [this](const Request &req, Response &rsp)
                              {
                                  std::string eventMessage = this->createEventMessage();
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
    // Hardcoded past event data
    Json::Value event1;
    event1["id"] = 363;
    event1["title"] = "Real Madrid vs Manchester United";
    event1["sport"] = "Football";
    event1["level"] = "Varsity";
    event1["program"] = "Man";
    event1["year"] = 2024;
    event1["dt_event"] = "2024-05-31";
    event1["tm_event"] = 1845;
    event1["venue"]["location"] = "Madison Square Garden";
    event1["detail"]["cityAddress"] = "44, Pennsylvania";
    event1["detail"]["streetAddress"] = "Georgia";
    event1["status"] = "past";
    event1["type"] = "on-demand";
    event1["video_duration"] = "90 minutes";
    event1["shared_with"] = "Everyone";

    Json::Value connectedDevice1;
    connectedDevice1["id"] = 1;
    connectedDevice1["stream_name"] = "sophiawilson_stevecam_363";
    connectedDevice1["direction"] = 1;

    Json::Value connectedDevice2;
    connectedDevice2["id"] = 2;
    connectedDevice2["stream_name"] = "johndoe_stevecam_360";
    connectedDevice2["direction"] = 2;

    event1["connected_streaming_devices"].append(connectedDevice1);
    event1["connected_streaming_devices"].append(connectedDevice2);

    Json::Value event2;
    event2["id"] = 2;
    event2["title"] = "Lakers vs Warriors";
    event2["sport"] = "Basketball";
    event2["level"] = "Varsity";
    event2["program"] = "Women";
    event2["year"] = 2023;
    event2["dt_event"] = "2023-12-15";
    event2["tm_event"] = 1930;
    event2["venue"]["location"] = "Staples Center";
    event2["detail"]["cityAddress"] = "111, Figueroa Street";
    event2["detail"]["streetAddress"] = "Los Angeles";
    event2["status"] = "past";
    event2["type"] = "live";
    event2["video_duration"] = "120 minutes";
    event2["shared_with"] = "Subscribers";

    Json::Value connectedDevice3;
    connectedDevice3["id"] = 3;
    connectedDevice3["stream_name"] = "sophiawilson_stevecam_363";
    connectedDevice3["direction"] = 1;

    event2["connected_streaming_devices"].append(connectedDevice3);

    Json::Value event3;
    event3["id"] = 3;
    event3["title"] = "US Open Final";
    event3["sport"] = "Tennis";
    event3["level"] = "Open";
    event3["program"] = "Mixed";
    event3["year"] = 2022;
    event3["dt_event"] = "2022-09-10";
    event3["tm_event"] = 1500;
    event3["venue"]["location"] = "Arthur Ashe Stadium";
    event3["detail"]["cityAddress"] = "Flushing Meadows";
    event3["detail"]["streetAddress"] = "New York";
    event3["status"] = "past";
    event3["type"] = "tournament";
    event3["video_duration"] = "180 minutes";
    event3["shared_with"] = "Members";

    Json::Value connectedDevice4;
    connectedDevice4["id"] = 4;
    connectedDevice4["stream_name"] = "sophiawilson_stevecam_363";
    connectedDevice4["direction"] = 1;

    event3["connected_streaming_devices"].append(connectedDevice4);

    std::vector<Json::Value> pastEvents;
    pastEvents.push_back(event1);
    pastEvents.push_back(event2);
    pastEvents.push_back(event3);

    return pastEvents;
}

std::string Event::createEventMessage() const
{
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
    // eventMessage["video_duration"] = this->videoDuration();
    // eventMessage["shared_with"] = this->sharedWith();

    Json::FastWriter writer;
    return writer.write(eventMessage);
}