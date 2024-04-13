#include <event-runner.h>
#include <spdlog/spdlog.h>

EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : m_pub{"tcp://localhost:4001ß"},
                                                                                                                                             m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::started, this)},
                                                                                                                                             m_end{m_start, duration, std::bind(&EventRunner::ended, this)}
{
}

void EventRunner::stop()
{
    this->m_start.abort();
    this->m_end.abort();
}
void EventRunner::started()
{
    spdlog::trace("Event started..");
    this->m_pub.publish("event", "Event started in the service");
}
void EventRunner::ended()
{
    spdlog::trace("Event ended..");
    this->m_pub.publish("event", "Event stopped in the service");
}

EventRunner::~EventRunner()
{
}