#include <event-runner.h>
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
std::string EventRunner::getEventPreviewData()
{
    EventPreview ep;

    ep.setCityAddress("Ludhiana");
    ep.setDtEvent("2024-05-01");
    ep.activeDevices().push_back(Device());
    {
        auto &device = ep.activeDevices().back();
        device.setDeviceId("1");
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

    return ep.toResponse();
}
std::string EventRunner::getLiveEventData()
{
    LiveEvent le;
    le.setDtEvent("2024-04-15");
    le.setLevel("University");
    le.setProgram("Men");
    le.setSport("Football");
    le.setStatus("Upcoming");
    return le.toResponse();
}
EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : mp_eventPreviewPublisher{new WorkerLoop(2, [this]()
                                                                                                                                                                                     { Publisher::instance().publish("event-preview", this->getEventPreviewData()); })},
                                                                                                                                             mp_liveEventPublisher{new WorkerLoop(2, [this]()
                                                                                                                                                                                  { Publisher::instance().publish("live-event", this->getLiveEventData()); })},
                                                                                                                                             m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::eventStarted, this)},
                                                                                                                                             m_end{m_start, duration, std::bind(&EventRunner::eventEnded, this)}
{
    this->mp_eventPreviewPublisher->start();
}

void EventRunner::stop()
{
    this->m_start.abort();
    this->m_end.abort();
    this->mp_eventPreviewPublisher->stop();
    this->mp_liveEventPublisher->stop();
}
void EventRunner::eventStarted()
{
    this->m_eventStarted = true;
    this->mp_eventPreviewPublisher->stop();
    spdlog::trace("Event started..");
    Publisher::instance().publish("event-terminal", "{'terminal':'start'}");
    this->mp_liveEventPublisher->start();
}
void EventRunner::eventEnded()
{
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    Publisher::instance().publish("event-terminal", "{'terminal':'stop'}");
}

EventRunner::~EventRunner()
{
    this->stop();
}