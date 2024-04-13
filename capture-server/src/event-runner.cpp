#include <event-runner.h>
#include <spdlog/spdlog.h>

EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : m_pub{"tcp://localhost:4001ß"},
                                                                                                                                             m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::started, this)},
                                                                                                                                             m_end{m_start, duration, std::bind(&EventRunner::ended, this)}
{
    this->mp_eventPreviewPublisher = new WorkerLoop(2, [this](){
        this->m_pub.publish("event-preview", "Event preview data");
    });
    this->mp_liveEventPublisher = new WorkerLoop(2, [this](){
        this->m_pub.publish("live-event", "Live event data");
    });
    this->mp_eventPreviewPublisher->start();
}

void EventRunner::stop()
{
    this->m_start.abort();
    this->m_end.abort();
    this->mp_eventPreviewPublisher->stop();
    this->mp_liveEventPublisher->stop();
}
void EventRunner::started()
{
    this->mp_eventPreviewPublisher->stop();
    spdlog::trace("Event started..");
    this->m_pub.publish("event", "Event started in the service");
    this->mp_liveEventPublisher->start();
}
void EventRunner::ended()
{
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    this->m_pub.publish("event", "Event stopped in the service");
}

EventRunner::~EventRunner()
{
    this->stop();
}