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
    this->set(value, "user_id");
}

std::string EventDevice::streamName() const
{
    return this->m_model.get<std::string>("stream_name");
}

void EventDevice::setStreamName(const std::string &value)
{
    this->set(value, "stream_name");
}

int EventDevice::deviceId() const
{
    return this->m_model.get<int>("device_id");
}

void EventDevice::setDeviceId(int value)
{
    this->set(value, "device_id");
}
std::string EventDevice::deviceName() const
{
    return this->m_model.get<std::string>("device");
}
void EventDevice::setDeviceName(const std::string &value)
{
    this->set(value, "device");
}

std::string EventDevice::deviceType() const
{
    return this->m_model.get<std::string>("deviceType");
}

void EventDevice::setDeviceType(const std::string &value)
{
    this->set(value, "deviceType");
}

std::string EventDevice::status() const
{
    return this->m_model.get<std::string>("status");
}

void EventDevice::setStatus(const std::string &value)
{
    this->set(value, "status");
}

std::string EventDevice::location() const
{
    return this->m_model.get<std::string>("location");
}

void EventDevice::setLocation(const std::string &value)
{
    this->set(value, "location");
}

std::string EventDevice::network() const
{
    return this->m_model.get<std::string>("network");
}

void EventDevice::setNetwork(const std::string &value)
{
    this->set(value, "network");
}

int EventDevice::eventId() const
{
    return this->m_model.get<int>("event_id");
}

void EventDevice::setEventId(int value)
{
    this->set(value, "event_id");
}

std::string EventDevice::pin() const
{
    return this->m_model.get<std::string>("pin");
}

void EventDevice::setPin(const std::string &value)
{
    this->set(value, "pin");
}
std::string EventDevice::streamId() const
{
    return this->m_model.get<std::string>("stream_id");
}
void EventDevice::setStreamId(const std::string &value)
{
    this->set(value, "stream_id");
}

std::string EventDevice::ipAdd() const
{
    return this->m_model.get<std::string>("ip_add");
}
void EventDevice::setIpAdd(const std::string &value)
{
    this->set(value, "ip_add");
}

std::string EventDevice::appName() const
{
    return this->m_model.get<std::string>("app_name");
}
void EventDevice::setAppName(const std::string &value)
{
    this->set(value, "app_name");
}

int EventDevice::retries() const
{
    return this->m_model.get<int>("retries");
}

void EventDevice::setRetries(int value)
{
    this->set(value, "retires");
}

int EventDevice::direction() const
{
    return this->m_model.get<int>("direction");
}

void EventDevice::setDirection(int value)
{
    this->set(value, "direction");
}

std::string EventDevice::name() const
{
    return this->m_model.get<std::string>("name");
}
void EventDevice::setName(const std::string &value)
{
    this->set(value, "name");
}
