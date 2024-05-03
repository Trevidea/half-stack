// event-device.cpp
#include "event-device.h"

EventDevice::EventDevice() : EntityBase("event_device") {}

// EventDevice::EventDevice(Json::Value &model) : EntityBase(model) {}

int EventDevice::userId() const
{
    return this->m_model.get<int>("user_id");
}

void EventDevice::setUserId(int value)
{
    m_model.set("user_id", value);
}

std::string EventDevice::name() const
{
    return this->m_model.get<std::string>("name");
}

void EventDevice::setName(const std::string &value)
{
    m_model.set("name", value);
}

int EventDevice::deviceId() const
{
    return this->m_model.get<int>("device_id");
}

void EventDevice::setDeviceId(int value)
{
    m_model.set("device_id", value);
}

std::string EventDevice::deviceType() const
{
    return this->m_model.get<std::string>("deviceType");
}

void EventDevice::setDeviceType(const std::string &value)
{
    m_model.set("deviceType", value);
}

std::string EventDevice::status() const
{
    return this->m_model.get<std::string>("status");
}

void EventDevice::setStatus(const std::string &value)
{
    m_model.set("status", value);
}

std::string EventDevice::location() const
{
    return this->m_model.get<std::string>("location");
}

void EventDevice::setLocation(const std::string &value)
{
    m_model.set("location", value);
}

std::string EventDevice::network() const
{
    return this->m_model.get<std::string>("network");
}

void EventDevice::setNetwork(const std::string &value)
{
    m_model.set("network", value);
}

void EventDevice::create(const Request& request, Response& response) {
    try {
        // Extract data from the request JSON
        Json::Value requestData = request.json();
        int event_id = requestData["event_id"].asInt();
        int device_id = requestData["device_id"].asInt();
        int user_id = requestData["user_id"].asInt();
        std::string location = requestData["location"].asString();
        std::string pin = requestData["pin"].asString(); // Assuming "pin" represents the PIN

        // Prepare the data to be inserted
        Json::Value eventData;
        eventData["table"] = "event_device";
        Json::Value columns(Json::arrayValue);
        columns.append(Json::Value("event_id"));
        columns.append(Json::Value("device_id"));
        columns.append(Json::Value("user_id"));
        columns.append(Json::Value("location"));
        columns.append(Json::Value("pin"));
        eventData["columns"] = columns;

        // Prepare data for insertion
        Json::Value values(Json::arrayValue);
        values.append(Json::Value(event_id));
        values.append(Json::Value(device_id));
        values.append(Json::Value(user_id));
        values.append(Json::Value(location));
        values.append(Json::Value(pin));
        eventData["values"] = values;

        // Perform the database insertion
        SqlHelper::ScriptInsert(eventData);

        // Set success response
        response.setData("Device added successfully.");
    } catch (const std::exception& e) {
        // Handle exceptions
        response.setError("An error occurred while adding the device to the event: " + std::string(e.what()));
    }
}