#include <event-runner.h>
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
#include "event-manager.h"
#include "worker-loop.h"

void EventRunner::publishPreviewData()
{
    spdlog::trace("Venue: {}", this->m_event.venueLocation());

    Json::Value model(Json::objectValue); // Create a Json::Value object
    EventPreview ep(model);

    ep.setTitle(this->m_event.title());
    ep.setDtEvent(this->m_event.dtEvent());
    ep.setTime(this->m_event.tmEvent());
    ep.setSport(this->m_event.sport());
    ep.setLevel(this->m_event.level());
    ep.setProgram(this->m_event.program());
    ep.setStatus(this->m_event.status());
    ep.setYear(this->m_event.year());
    ep.setEventType(this->m_event.type());
    ep.setVenueLocation(this->m_event.venueLocation());
    // ep.setDetailType(event.detailType());
    // ep.setStreetAddress(event.streetAddress());
    // ep.setCityAddress(event.cityAddress());


    EventDevice eventDevice;
    char query[128] = {'\0'};
    snprintf(query, 128, "event_id=%d", this->m_event.id());
    std::vector<EventDevice> activeDevices = eventDevice.find<EventDevice>(query);

    ep.setActiveDevices(activeDevices);

    // // Convert EventPreview to JSON string
    // std::string jsonString = ep.toResponse();
    // return jsonString;
    // return ep.toResponse();
}
void EventRunner::publishLiveData()
{
}


EventRunner::EventRunner(const Event &&event)
    : mp_eventPreviewPublisher{new WorkerLoop(2, std::bind(&EventRunner::publishPreviewData, this))},
      mp_liveEventPublisher{new WorkerLoop(2, std::bind(&EventRunner::publishLiveData, this))},
      m_start{event.getDTUDate().year, event.getDTUDate().month, event.getDTUDate().date, event.getDTUTime().hours, event.getDTUTime().minutes, event.getDTUTime().seconds, std::bind(&EventRunner::eventStarted, this)},
      m_end{m_start, event.duration(), std::bind(&EventRunner::eventEnded, this)},
      m_event{ event }
{
    this->mp_eventPreviewPublisher->start();
}
void EventRunner::stop()
{
    if (!this->m_stopped)
    {
        this->m_stopped = true;
        this->m_start.abort();
        this->m_end.abort();
        this->mp_eventPreviewPublisher->stop();
        this->mp_liveEventPublisher->stop();
    }
}

void EventRunner::eventStarted()
{
    this->m_eventStarted = true;
    this->mp_eventPreviewPublisher->stop();
    spdlog::trace("Event started..");
    Publisher::instance().publish("event-terminal", "{'terminal':'start'}");
    this->mp_liveEventPublisher->start();
    // start dump
}

void EventRunner::eventEnded()
{
    // stop dump
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    Publisher::instance().publish("event-terminal", "{'terminal':'stop'}");
}

EventRunner::~EventRunner()
{
    this->stop();
}