#include "event-preview.h"
#include "gateway.h"
#include "event.h"
#include <json/json.h>

EventPreview::EventPreview(Json::Value &model) : Base(model)
{
}

void EventPreview::report()
{
    Base::report();
}

std::string EventPreview::dtEvent() const
{
    return m_model["dtEvent"].asString();
}

void EventPreview::setDtEvent(const std::string &value)
{
    m_model["dtEvent"] = value;
}

std::string EventPreview::level() const
{
    return m_model["level"].asString();
}

void EventPreview::setLevel(const std::string &value)
{
    m_model["level"] = value;
}

std::string EventPreview::program() const
{
    return m_model["program"].asString();
}

void EventPreview::setProgram(const std::string &value)
{
    m_model["program"] = value;
}

std::string EventPreview::sport() const
{
    return m_model["sport"].asString();
}

void EventPreview::setSport(const std::string &value)
{
    m_model["sport"] = value;
}

std::string EventPreview::status() const
{
    return m_model["status"].asString();
}

void EventPreview::setStatus(const std::string &value)
{
    m_model["status"] = value;
}

std::string EventPreview::title() const
{
    return m_model["title"].asString();
}

void EventPreview::setTitle(const std::string &value)
{
    m_model["title"] = value;
}

std::string EventPreview::cityAddress() const
{
    return m_model["detail"]["cityAddress"].asString();
}

void EventPreview::setCityAddress(const std::string &value)
{
    m_model["detail"]["cityAddress"] = value;
}

std::string EventPreview::streetAddress() const
{
    return m_model["detail"]["streetAddress"].asString();
}

void EventPreview::setStreetAddress(const std::string &value)
{
    m_model["detail"]["streetAddress"] = value;
}

std::string EventPreview::detailType() const
{
    return m_model["detail"]["type"].asString();
}

void EventPreview::setDetailType(const std::string &value)
{
    m_model["detail"]["type"] = value;
}

std::string EventPreview::venueLocation() const
{
    return m_model["venue"]["location"].asString();
}

void EventPreview::setVenueLocation(const std::string &value)
{
    m_model["venue"]["location"] = value;
}
 
int EventPreview::year() const
{
    return m_model["year"].asInt();
}

void EventPreview::setYear(int value)
{
    m_model["year"] = value;
}

int EventPreview::time() const
{
    return m_model["time"].asInt();
}

void EventPreview::setTime(int value)
{
    m_model["time"] = value;
}

std::string EventPreview::eventType() const
{
    return m_model["type"].asString();
}

void EventPreview::setEventType(const std::string &value)
{
    m_model["type"] = value;
}

std::string EventPreview::countdown() const
{
    return m_model["countdown"].asString();
}

void EventPreview::setCountdown(const std::string &value)
{
    m_model["countdown"] = value;
}

std::vector<EventDevice> &EventPreview::activeDevices()
{
    return m_activeDevice;
}

const std::vector<EventDevice> &EventPreview::activeDevices() const
{
    return m_activeDevice;
}

void EventPreview::setActiveDevices(const std::vector<EventDevice> &activeDevices)
{
    // Clear the existing active devices in the model
    m_model["activeDevices"] = Json::arrayValue;
    // Check if the provided vector is empty
    if (activeDevices.empty())
    {
        // Throw an exception indicating that no active devices were provided
        spdlog::warn("No active devices for the event exist..");
    }
    else
        for (const auto &device : activeDevices)
        {
            Json::Value jsonDevice;
            jsonDevice["deviceId"] = device.deviceId();
            jsonDevice["eventId"] = device.eventId();
            jsonDevice["location"] = device.location();
            jsonDevice["pin"] = device.pin();
            jsonDevice["userId"] = device.userId();
            m_model["activeDevices"].append(jsonDevice);
        }
}
