#include "event-preview.h"
#include "gateway.h"
#include "device.h"

EventPreview::EventPreview(Json::Value &model) : Base(model)
{
}

void EventPreview::report()
{
    Base::report();
    Gateway::instance().route("GET", "/api/event-preview",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->setCityAddress("Ludhiana");
                                  this->setDtEvent("2024-05-01");
                                  this->activeDevices().push_back(Device());
                                  {
                                      auto &device = this->activeDevices().back();
                                      device.setDeviceId("1");
                                      device.setDeviceType("iPad");
                                      device.setLocation("North-End");
                                  }
                                this->setDetailType("ondemand");
                                this->setStreetAddress("Indoor Stadium, Pakhowal road");
                                this->setDtEvent("2024-04-15");
                                this->setEventType("ondemand");
                                this->setLevel("University");
                                this->setProgram("Men");
                                this->setSport("Football");
                                this->setStatus("Upcoming");
                                this->setTime(1830);
                                this->setTitle("Mumbai Indians vs Kolkatta Knightriders");
                                this->setVenueLocation("Ludhiana");
                                this->setYear(2024);
                                  const std::string response = Gateway::instance().formatResponse({{this->m_model}});
                                  rsp.setData(response);
                              });
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

std::vector<Device> &EventPreview::activeDevices()
{
    return m_activeDevice;
}

const std::vector<Device> &EventPreview::activeDevices() const
{
    return m_activeDevice;
}
