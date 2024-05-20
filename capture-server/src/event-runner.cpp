#include <event-runner.h>
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
#include "event-manager.h"
#include "worker-loop.h"

EventRunner::EventRunner(const dtu_span span, std::function<void()> &&funcPublishPreviewData, std::function<void()> &&funcPublishliveData)
                                        : mp_eventPreviewPublisher{new WorkerLoop(2, funcPublishPreviewData)},
                                          mp_liveEventPublisher{new WorkerLoop(2, funcPublishliveData)},
                                          m_start{span.dt.year, span.dt.month, span.dt.date, span.tm.hours, span.tm.minutes, span.tm.seconds, std::bind(&EventRunner::eventStarted, this)},
                                          m_end{m_start, span.duration, std::bind(&EventRunner::eventEnded, this)}
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
    //start dump
}

void EventRunner::eventEnded()
{
    //stop dump
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    Publisher::instance().publish("event-terminal", "{'terminal':'stop'}");
}

EventRunner::~EventRunner()
{
    this->stop();
}