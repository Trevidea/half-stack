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
    Gateway::instance().route("GET", "/api/past-event/detail", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  this->getEventById(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/past-event", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/past-event", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/past-event", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}

void PastEvent::listPastEvents(const Request &req, Response &rsp)
{
    auto pastEvents = Event::fetchPastEvents(); // Call the static method correctly
    Json::Value result(Json::arrayValue);

    for (const auto &e : pastEvents)
    {
        Json::Value eventMessage(Json::objectValue);
        eventMessage["id"] = e["id"];
        eventMessage["title"] = e["title"];
        eventMessage["sport"] = e["sport"];
        eventMessage["level"] = e["level"];
        eventMessage["program"] = e["program"];
        eventMessage["year"] = e["year"];
        eventMessage["dt_event"] = e["dt_event"];
        eventMessage["tm_event"] = e["tm_event"];
        eventMessage["venue"]["location"] = e["venue"]["location"];
        eventMessage["detail"]["cityAddress"] = e["detail"]["cityAddress"];
        eventMessage["detail"]["streetAddress"] = e["detail"]["streetAddress"];
        eventMessage["status"] = e["status"];
        eventMessage["type"] = e["type"];
        eventMessage["video_duration"] = e["video_duration"];
        eventMessage["shared_with"] = e["shared_with"];

        Json::Value connectedDevices(Json::arrayValue);
        for (const auto &device : e["Connected_streaming_devices"])
        {
            Json::Value deviceMessage(Json::objectValue);
            deviceMessage["id"] = device["id"];
            deviceMessage["sream_name"] = device["sream_name"];
            deviceMessage["direction"] = device["direction"];
            connectedDevices.append(deviceMessage);
        }
        eventMessage["Connected_streaming_devices"] = connectedDevices;

        result.append(eventMessage);
    }

    Json::Value responseJson(Json::objectValue);
    responseJson["count"] = static_cast<int>(pastEvents.size());
    responseJson["result"] = result;

    // Set the response data with the JSON result
    rsp.setData(responseJson.toStyledString());
    rsp.setStatus(200); // OK
}

void PastEvent::getEventById(const Request &req, Response &rsp)
{
    // Extract the ID from the query parameters
    std::string idStr = req.getQueryValue("id");
    if (idStr.empty())
    {
        rsp.setData("Event ID not provided");
        rsp.setStatus(400); // Bad Request
        return;
    }

    int eventId = std::stoi(idStr);

    auto pastEvents = Event::fetchPastEvents(); // Call the static method correctly

    for (const auto &e : pastEvents)
    {
        if (e["id"].asInt() == eventId)
        {
            Json::Value eventMessage(Json::objectValue);
            eventMessage["id"] = e["id"];
            eventMessage["title"] = e["title"];
            eventMessage["sport"] = e["sport"];
            eventMessage["level"] = e["level"];
            eventMessage["program"] = e["program"];
            eventMessage["year"] = e["year"];
            eventMessage["dt_event"] = e["dt_event"];
            eventMessage["tm_event"] = e["tm_event"];
            eventMessage["venue"]["location"] = e["venue"]["location"];
            eventMessage["detail"]["cityAddress"] = e["detail"]["cityAddress"];
            eventMessage["detail"]["streetAddress"] = e["detail"]["streetAddress"];
            eventMessage["status"] = e["status"];
            eventMessage["type"] = e["type"];
            eventMessage["video_duration"] = e["video_duration"];
            eventMessage["shared_with"] = e["shared_with"];

            Json::Value connectedDevices(Json::arrayValue);
            for (const auto &device : e["Connected_streaming_devices"])
            {
                Json::Value deviceMessage(Json::objectValue);
                deviceMessage["id"] = device["id"];
                deviceMessage["sream_name"] = device["sream_name"];
                deviceMessage["direction"] = device["direction"];
                connectedDevices.append(deviceMessage);
            }
            eventMessage["Connected_streaming_devices"] = connectedDevices;

            // Set the response data with the JSON result
            rsp.setData(eventMessage.toStyledString());
            rsp.setStatus(200); // OK
            return;
        }
    }

    // If event with the given ID is not found
    rsp.setData("Event not found");
    rsp.setStatus(404); // Not Found
}