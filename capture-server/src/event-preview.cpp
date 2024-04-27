#include "event-preview.h"
#include "gateway.h"
#include "device.h"
#include "event.h"
#include "entity-base.h"

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

    Gateway::instance().route("POST", "/api/event-preview/add-device",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->handleAddDevice(req, rsp);
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

void EventPreview::handleAddDevice(const Request &req, Response &rsp) {
    // Extract deviceName and streamKey from the request
    Json::Value requestData = req.json();
    std::string deviceName = requestData["deviceName"].asString();
    std::string streamKey = requestData["streamKey"].asString();

    // Call the addStreamingDevice method of the Event class
    Event event;
    event.addStreamingDevice(deviceName, streamKey);

    // Execute SQL query using executeSqlJson() from Base class
    Base base; // Create an instance of Base
    std::string sql = "INSERT INTO devices (type, name, code) VALUES ('ipad', '" + deviceName + "', '0000')";
    Json::Value result = base.executeSqlJson(sql);

    // Prepare the response
    std::map<std::string, std::string> responseData;
    if (!result.empty()) {
        responseData["status"] = "success";
        responseData["message"] = "Streaming device added successfully";
    } else {
        responseData["status"] = "error";
        responseData["message"] = "Failed to add streaming device";
    }

    // Convert the response data to a vector of maps
    std::vector<std::map<std::string, std::string>> responseVector;
    responseVector.push_back(responseData);

    // Pass the response data to formatResponse
    rsp.setData(Gateway::instance().formatResponse(responseVector));
}


