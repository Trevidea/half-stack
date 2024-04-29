// device.cpp
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

std::string EventDevice::location() const
{
    return this->m_model.get<std::string>("location");
}

void EventDevice::setLocation(const std::string &value)
{
    m_model.set("location", value);
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

std::string EventDevice::network() const
{
    return this->m_model.get<std::string>("network");
}

void EventDevice::setNetwork(const std::string &value)
{
    m_model.set("network", value);
}
