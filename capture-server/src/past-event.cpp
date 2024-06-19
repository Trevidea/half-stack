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
    try
    {
        std::vector<Json::Value> pastEvents = Event::fetchPastEvents();

        Json::Value result(Json::arrayValue);
        for (const auto &event : pastEvents)
        {
            Json::Value formattedEvent(Json::arrayValue);

            auto appendField = [&formattedEvent](const std::string &field, int type, const Json::Value &value)
            {
                Json::Value fieldObject;
                fieldObject["field"] = field;
                fieldObject["type"] = type;
                fieldObject["value"] = value;
                formattedEvent.append(fieldObject);
            };

            appendField("id", 1, event["id"]);
            appendField("sport", 1, event["sport"]);
            appendField("level", 1, event["level"]);
            appendField("program", 1, event["program"]);
            appendField("year", 1, event["year"]);
            appendField("dt_event", 1, event["dt_event"]);
            appendField("tm_event", 1, event["tm_event"]);
            appendField("title", 1, event["title"]);
            appendField("status", 1, event["status"]);
            appendField("type", 1, event["type"]);
            appendField("video_duration", 1, event["video_duration"]);
            appendField("shared_with", 1, event["shared_with"]);
            appendField("venue_location", 1, event["venue"]["location"]);
            appendField("cityAddress", 1, event["detail"]["cityAddress"]);
            appendField("streetAddress", 1, event["detail"]["streetAddress"]);

            // Handle connected devices separately
            Json::Value connectedDevices(Json::arrayValue);
            for (const auto &device : event["Connected_streaming_devices"])
            {
                Json::Value deviceObject(Json::arrayValue);
                Json::Value deviceField;

                deviceField["field"] = "device_id";
                deviceField["type"] = 1;
                deviceField["value"] = device["id"];
                deviceObject.append(deviceField);

                deviceField["field"] = "stream_name";
                deviceField["type"] = 1;
                deviceField["value"] = device["sream_name"];
                deviceObject.append(deviceField);

                deviceField["field"] = "direction";
                deviceField["type"] = 1;
                deviceField["value"] = device["direction"];
                deviceObject.append(deviceField);

                connectedDevices.append(deviceObject);
            }
            appendField("Connected_streaming_devices", 1, connectedDevices);

            result.append(formattedEvent);
        }

        Json::Value gatewayResponse;
        gatewayResponse["count"] = static_cast<int>(pastEvents.size());
        gatewayResponse["result"] = result;

        Json::FastWriter writer;
        std::string responseStr = writer.write(gatewayResponse);

        rsp.setData(responseStr); // Use setData to set the response content
        rsp.setStatus(200);       // Set the status code to 200 OK
    }
    catch (const std::exception &e)
    {
        spdlog::error("Failed to fetch past events: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Set the status code to 500 Internal Server Error
    }
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