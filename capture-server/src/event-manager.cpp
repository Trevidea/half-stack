#include "event-manager.h"
#include "event.h"
#include "gateway.h"
#include <ctime>
#include "publisher.h"
#include "half-stack-exceptions.h"
#include <json/json.h>
#include <sstream>
#include "event-preview.h"
#include "live-event.h"
#include "event-device.h"

EventManager::EventManager() : EntityBase("event")
{
}

void EventManager::report()
{
    EntityBase::report();
    Gateway::instance().route("POST", "/api/event/open-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->openPreview(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event/close-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->closePreview(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/event/close-all-previews", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->closeAllPreviews(req, rsp);
                              });
}

void EventManager::closeAllPreviews(const Request &req, Response &rsp) {
    for (auto &&runner : this->m_runners) {
        runner.second->stop();
        delete runner.second;
    }
    this->m_runners.clear();
    Json::Value jsResult = Json::objectValue;
    jsResult["Result"] = "Success";
    rsp.setData(Gateway::instance().formatResponse({{jsResult}}));
}

void EventManager::openPreview(const Request &req, Response &rsp) {
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Open preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto event = Event::byId<Event>(eventId);

    if (!event.notSet()) {
        const auto dt = event.getDTUDate();
        const auto tm = event.getDTUTime();
        spdlog::trace("Event {}, date: {}, month: {}, year: {}, hours: {}, mins: {}",
                      event.title(), dt.date, dt.month, dt.year, tm.hours, tm.minutes);
        auto minsToStart = event.minutesToStart();
        if (minsToStart > 60) {
            throw ExInvalidPreviewDurationException(event.title(), minsToStart);
        }

        const auto &kvPair = this->m_runners.find(eventId);
        if (kvPair != this->m_runners.end()) {
            spdlog::trace("Runner already exists for event {}. Stopping runner - just in case", eventId);
            kvPair->second->stop();
            this->m_runners.erase(kvPair);
        }

        Publisher::instance().publish("event-terminal", Json::FastWriter().write(response));
        spdlog::trace("Creating a new runner for event id {}", eventId);

        this->m_runners.emplace(eventId, new EventRunner(
            dt.year, dt.month, dt.date, tm.hours, tm.minutes, tm.seconds, 1,
            [this]() { return this->getEventPreviewData(); },
            [this]() { return this->getLiveEventData(); }
        ));
    }
    const std::string strRsp = Gateway::instance().formatResponse({{response}});
    spdlog::trace("setting response: {}", strRsp);
    rsp.setData(strRsp);
}

void EventManager::closePreview(const Request &req, Response &rsp) {
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Close preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto &kvPair = this->m_runners.find(eventId);
    if (kvPair != this->m_runners.end()) {
        spdlog::trace("Runner found for event {}. closing preview!", eventId);
        kvPair->second->stop();
        this->m_runners.erase(kvPair);
    }
    rsp.setData(Gateway::instance().formatResponse({{response}}));
}

std::string EventManager::getEventPreviewData() {
    EventPreview ep;

    ep.setCityAddress("Ludhiana");
    ep.setDtEvent("2024-05-01");
    ep.activeDevices().push_back(EventDevice());
    {
        auto &device = ep.activeDevices().back();
        device.setDeviceId(1);
        device.setDeviceType("iPad");
        device.setLocation("North-End");
    }
    ep.setDetailType("ondemand");
    ep.setStreetAddress("Indoor Stadium, Pakhowal road");
    ep.setDtEvent("2024-04-15");
    ep.setEventType("ondemand");
    ep.setLevel("University");
    ep.setProgram("Men");
    ep.setSport("Football");
    ep.setStatus("Upcoming");
    ep.setTime(1830);
    ep.setTitle("Mumbai Indians vs Kolkatta Knightriders");
    ep.setVenueLocation("Ludhiana");
    ep.setYear(2024);

    EventDevice eventDevice;
    std::vector<EventDevice> activeDevices = eventDevice.list<EventDevice>();

    ep.setActiveDevices(activeDevices);

    return ep.toResponse();
}

std::string EventManager::getLiveEventData() {
    LiveEvent le;
    le.setSport("Football");
    le.setLevel("University");
    le.setProgram("Men");
    le.setYear(2024);
    le.setDtEvent("2024-04-15");
    le.setTime(1402);
    le.setVenueLocation("Delhi");
    le.setDetailType("Scheduled Event");
    le.setDetailStreetAddress("Sector 32");
    le.setDetailCityAddress("Delhi");
    le.setTitle("Manchester vs Barcelona");
    le.setStatus("Upcoming");

    ConnectionDetail connectionDetail;
    connectionDetail.setId(1);
    connectionDetail.setName("Coach S.");
    connectionDetail.setRole("Subscriber");
    connectionDetail.setLocation("Press Box");
    connectionDetail.setDevice("iPad15");
    connectionDetail.setNetwork("Penfield-532");
    connectionDetail.setQuality(QualityEnum::Good);
    connectionDetail.setIpAddress("192.168.1.1");
    connectionDetail.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail.setFilesReceived(10);
    connectionDetail.setRetries(3);

    ConnectionDetail connectionDetail1;
    connectionDetail1.setId(2);
    connectionDetail1.setName("Coach J.");
    connectionDetail1.setRole("Publisher");
    connectionDetail1.setLocation("Sideline");
    connectionDetail1.setDevice("iPad22");
    connectionDetail1.setNetwork("Penfield-532");
    connectionDetail1.setQuality(QualityEnum::Poor);
    connectionDetail1.setIpAddress("192.168.1.2");
    connectionDetail1.setTransmitStatus(TransmitEnum::Receiving);
    connectionDetail1.setFilesReceived(5);
    connectionDetail1.setRetries(2);

    ConnectionDetail connectionDetail2;
    connectionDetail2.setId(3);
    connectionDetail2.setName("Coach M.");
    connectionDetail2.setRole("Subscriber");
    connectionDetail2.setLocation("Press Box");
    connectionDetail2.setDevice("Camcorder");
    connectionDetail2.setNetwork("Penfield-532");
    connectionDetail2.setQuality(QualityEnum::Poor);
    connectionDetail2.setIpAddress("192.168.1.3");
    connectionDetail2.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail2.setFilesReceived(5);
    connectionDetail2.setRetries(2);

    le.setConnectionDetails({connectionDetail, connectionDetail1, connectionDetail2});

    return le.toResponse();
}

EventManager::~EventManager() {}
