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

void EventManager::closeAllPreviews(const Request &req, Response &rsp)
{
    for (auto &&runner : this->m_runners)
    {
        runner.second->stop();
        delete runner.second;
    }
    this->m_runners.clear();
    Json::Value jsResult = Json::objectValue;
    jsResult["Result"] = "Success";
    rsp.setData(Gateway::instance().formatResponse({{jsResult}}));
}

void EventManager::publishPreviewData()
{
    for (auto &&kvRunner : this->m_runners)
    {
        spdlog::info("Processing runner for event ID: {}", kvRunner.first);
        Publisher::instance().publish("event-preview", this->getEventPreviewData(kvRunner.first));
    }
}

void EventManager::publishLiveData()
{
    for (auto &&kvRunner : this->m_runners)
    {
        Publisher::instance().publish("live-event", this->getLiveEventData(kvRunner.first));
    }
}

void EventManager::openPreview(const Request &req, Response &rsp)
{
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Open preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto event = Event::byId<Event>(eventId);

    if (!event.notSet())
    {
        const auto dt = event.getDTUDate();
        const auto tm = event.getDTUTime();
        spdlog::trace("Event {}, date: {}, month: {}, year: {}, hours: {}, mins: {}",
                      event.title(), dt.date, dt.month, dt.year, tm.hours, tm.minutes);
        auto minsToStart = event.minutesToStart();
        if (minsToStart > 60)
        {
            throw ExInvalidPreviewDurationException(event.title(), minsToStart);
        }
        else if (minsToStart < -1)
        {
            // throw an exception saying the event has already passed
        }

        const auto &kvPair = this->m_runners.find(eventId);
        if (kvPair != this->m_runners.end())
        {
            spdlog::trace("Runner already exists for event {}. Stopping runner - just in case", eventId);
            kvPair->second->stop();
            this->m_runners.erase(kvPair);
        }

        Publisher::instance().publish("event-terminal", Json::FastWriter().write(response));
        spdlog::trace("Creating a new runner for event id {}", eventId);
        this->m_runners.emplace(eventId,
                                new EventRunner({{dt.year, dt.month, dt.date}, {tm.hours, tm.minutes, tm.seconds}, 1},
                                                std::bind(&EventManager::publishPreviewData, this),
                                                std::bind(&EventManager::publishLiveData, this)));
    }
    const std::string strRsp = Gateway::instance().formatResponse({{response}});
    spdlog::trace("setting response: {}", strRsp);
    rsp.setData(strRsp);
}

void EventManager::closePreview(const Request &req, Response &rsp)
{
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Close preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto &kvPair = this->m_runners.find(eventId);
    if (kvPair != this->m_runners.end())
    {
        spdlog::trace("Runner found for event {}. closing preview!", eventId);
        kvPair->second->stop();
        this->m_runners.erase(kvPair);
    }
    rsp.setData(Gateway::instance().formatResponse({{response}}));
}

std::string EventManager::getEventPreviewData(const int eventId)
{
    spdlog::info("Getting event preview data for event ID: {}", eventId);
    EventPreview ep;
    const auto event = Event::byId<Event>(eventId);
    if(event.notSet())
    {
        spdlog::warn("Event not found for ID: {}", eventId);
        return "";
    }

    ep.setTitle(event.title());
    ep.setDtEvent(event.dtEvent());
    ep.setTime(event.tmEvent());
    ep.setSport(event.sport());
    ep.setLevel(event.level());
    ep.setProgram(event.program());
    ep.setStatus(event.status());
    // ep.setStreetAddress(event.getStreetAddress());
    // ep.setCityAddress(event.getCityAddress());
    ep.setVenueLocation(event.venue());
    ep.setYear(event.year());
    // ep.setDetailType(event.getType());
    ep.setEventType(event.type());

    EventDevice eventDevice;
    char query[128] = { '\0' };
    snprintf(query, 128, "event_id=%d", eventId);
    std::vector<EventDevice> activeDevices = eventDevice.find<EventDevice>(query);

    ep.setActiveDevices(activeDevices);

    return ep.toResponse();
}

std::string EventManager::getLiveEventData(const int eventId)
{
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
