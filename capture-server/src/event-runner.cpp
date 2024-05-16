// event-runner.cpp
#include "event-runner.h"
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
#include "event-manager.h"
#include "worker-loop.h"

// EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : mp_eventPreviewPublisher{new WorkerLoop(2, [this]()
//                                                                                                                                                                                      { Publisher::instance().publish("event-preview", this->getEventPreviewData()); })},
//                                                                                                                                              mp_liveEventPublisher{new WorkerLoop(2, [this]()
//                                                                                                                                                                                   { Publisher::instance().publish("live-event", this->getLiveEventData()); })},
//                                                                                                                                              m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::eventStarted, this)},
//                                                                                                                                              m_end{m_start, duration, std::bind(&EventRunner::eventEnded, this)}
// {
//     this->mp_eventPreviewPublisher->start();
// }

EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration, std::function<std::string()> previewDataFunc, std::function<std::string()> liveDataFunc)
                                                                                                                                            : m_previewDataFunc(previewDataFunc), m_liveDataFunc(liveDataFunc),
                                                                                                                                            mp_eventPreviewPublisher(new WorkerLoop(2, [this]() {
                                                                                                                                                Publisher::instance().publish("event-preview", this->m_previewDataFunc());
                                                                                                                                            })),
                                                                                                                                            mp_liveEventPublisher(new WorkerLoop(2, [this]() {
                                                                                                                                                Publisher::instance().publish("live-event", this->m_liveDataFunc());
                                                                                                                                            })),
                                                                                                                                            m_start(year, month, day, hour, min, sec, std::bind(&EventRunner::eventStarted, this)),
                                                                                                                                            m_end(m_start, duration, std::bind(&EventRunner::eventEnded, this))
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