#ifndef EVENT_RUNNER_H
#define EVENT_RUNNER_H

#include "countdown.h"
#include "worker-loop.h"

class EventRunner
{
private:
    Countdown m_start, m_end;
    WorkerLoop *mp_eventPreviewPublisher;
    WorkerLoop *mp_liveEventPublisher;
public:
    EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration);
    void stop();
    ~EventRunner();
    

private:
    void started();
    void ended();
    std::string getEventPreviewData();
    std::string getLiveEventData();
};

#endif // EVENT_RUNNER_H