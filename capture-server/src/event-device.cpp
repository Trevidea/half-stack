// event-device.cpp
#include "event-device.h"
#include "event-runner.h"

EventDevice::EventDevice() : EntityBase("event_device") {}

void EventDevice::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/event-devices", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/event-devices", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/event-device", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                                  EventRunner::s_deviceCountDirty = true;
                              });
}

int EventDevice::userId() const
{
    return this->m_model.get<int>("user_id");
}

void EventDevice::setUserId(int value)
{
    m_model.set(value, "user_id");
}

std::string EventDevice::streamName() const
{
    return this->m_model.get<std::string>("stream_name");
}

void EventDevice::setStreamName(const std::string &value)
{
    m_model.set(value, "stream_name");
}

int EventDevice::deviceId() const
{
    return this->m_model.get<int>("device_id");
}

void EventDevice::setDeviceId(int value)
{
    m_model.set(value, "device_id");
}

std::string EventDevice::deviceType() const
{
    return this->m_model.get<std::string>("deviceType");
}

void EventDevice::setDeviceType(const std::string &value)
{
    m_model.set(value, "deviceType");
}

std::string EventDevice::status() const
{
    return this->m_model.get<std::string>("status");
}

void EventDevice::setStatus(const std::string &value)
{
    m_model.set(value, "status");
}

std::string EventDevice::location() const
{
    return this->m_model.get<std::string>("location");
}

void EventDevice::setLocation(const std::string &value)
{
    m_model.set(value, "location");
}

std::string EventDevice::network() const
{
    return this->m_model.get<std::string>("network");
}

void EventDevice::setNetwork(const std::string &value)
{
    m_model.set(value, "network");
}

int EventDevice::eventId() const
{
    return this->m_model.get<int>("event_id");
}

void EventDevice::setEventId(int value)
{
    m_model.set(value, "event_id");
}

std::string EventDevice::pin() const
{
    return this->m_model.get<std::string>("pin");
}

void EventDevice::setPin(const std::string &value)
{
    m_model.set(value, "pin");
}
std::string EventDevice::streamId() const
{
    return this->m_model.get<std::string>("stream_id");
}
void EventDevice::setStreamId(const std::string &value)
{
    m_model.set(value, "stream_id");
}

std::string EventDevice::ipAdd() const
{
    return this->m_model.get<std::string>("ip_add");
}
void EventDevice::setIpAdd(const std::string &value)
{
    m_model.set(value, "ip_add");
}

std::string EventDevice::appName() const
{
    return this->m_model.get<std::string>("app_name");
}
void EventDevice::setAppName(const std::string &value)
{
    m_model.set(value, "app_name");
}