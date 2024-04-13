#ifndef EVENT_RUNNER_H
#define EVENT_RUNNER_H

#include "publisher.h"
#include "countdown.h"

class EventRunner
{
private:
    Publisher m_pub;
    Countdown m_start, m_end;

public:
    EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration);
    void stop();
    ~EventRunner();
private:
    void started();
    void ended();
};

#endif // EVENT_RUNNER_H