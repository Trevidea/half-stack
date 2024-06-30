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

            Json::Value venue = event["venue"];
            appendField(venue["field"].asString(), venue["type"].asInt(), venue["value"]);

            Json::Value detail = event["detail"];
            appendField(detail["field"].asString(), detail["type"].asInt(), detail["value"]);

            // Handle connected devices separately
            Json::Value connectedDevices(Json::arrayValue);
            for (const auto &device : event["connected_streaming_devices"])
            {
                Json::Value deviceObject(Json::arrayValue);
                Json::Value deviceField;

                deviceField["field"] = "device_id";
                deviceField["type"] = 1;
                deviceField["value"] = device["id"];
                deviceObject.append(deviceField);

                deviceField["field"] = "stream_name";
                deviceField["type"] = 1;
                deviceField["value"] = device["stream_name"];
                deviceObject.append(deviceField);

                deviceField["field"] = "direction";
                deviceField["type"] = 1;
                deviceField["value"] = device["direction"];
                deviceObject.append(deviceField);

                connectedDevices.append(deviceObject);
            }
            appendField("connected_streaming_devices", 1, connectedDevices);

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
            Json::Value formattedEvent(Json::arrayValue);

            auto appendField = [&formattedEvent](const std::string &field, int type, const Json::Value &value)
            {
                Json::Value fieldObject;
                fieldObject["field"] = field;
                fieldObject["type"] = type;
                fieldObject["value"] = value;
                formattedEvent.append(fieldObject);
            };

            appendField("id", 1, e["id"]);
            appendField("title", 1, e["title"]);
            appendField("sport", 1, e["sport"]);
            appendField("level", 1, e["level"]);
            appendField("program", 1, e["program"]);
            appendField("year", 1, e["year"]);
            appendField("dt_event", 1, e["dt_event"]);
            appendField("tm_event", 1, e["tm_event"]);
            appendField("status", 1, e["status"]);
            appendField("type", 1, e["type"]);
            appendField("video_duration", 1, e["video_duration"]);
            appendField("shared_with", 1, e["shared_with"]);

            Json::Value venue = e["venue"];
            appendField(venue["field"].asString(), venue["type"].asInt(), venue["value"]);

            Json::Value detail = e["detail"];
            appendField(detail["field"].asString(), detail["type"].asInt(), detail["value"]);

            // Handle connected devices separately
            Json::Value connectedDevices(Json::arrayValue);
            for (const auto &device : e["connected_streaming_devices"])
            {
                Json::Value deviceObject(Json::arrayValue);
                Json::Value deviceField;

                deviceField["field"] = "device_id";
                deviceField["type"] = 1;
                deviceField["value"] = device["id"];
                deviceObject.append(deviceField);

                deviceField["field"] = "stream_name";
                deviceField["type"] = 1;
                deviceField["value"] = device["stream_name"];
                deviceObject.append(deviceField);

                deviceField["field"] = "direction";
                deviceField["type"] = 1;
                deviceField["value"] = device["direction"];
                deviceObject.append(deviceField);

                connectedDevices.append(deviceObject);
            }
            appendField("connected_streaming_devices", 1, connectedDevices);

            Json::Value gatewayResponse;
            gatewayResponse["count"] = 1;
            gatewayResponse["result"].append(formattedEvent);

            Json::FastWriter writer;
            std::string responseStr = writer.write(gatewayResponse);

            rsp.setData(responseStr); // Use setData to set the response content
            rsp.setStatus(200);       // Set the status code to 200 OK
            return;
        }
    }

    // If event with the given ID is not found
    rsp.setData("Event not found");
    rsp.setStatus(404); // Not Found
}
