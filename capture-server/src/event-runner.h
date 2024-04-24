#ifndef EVENT_RUNNER_H
#define EVENT_RUNNER_H

#include "countdown.h"
#include "worker-loop.h"

class EventRunner
{
private:
    WorkerLoop *mp_eventPreviewPublisher;
    WorkerLoop *mp_liveEventPublisher;
    Countdown m_start, m_end;
public:
    EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration);
    void stop();
    ~EventRunner();
    

private:
    void eventStarted();
    void eventEnded();
    std::string getEventPreviewData();
    std::string getLiveEventData();
    bool m_eventStarted = false;
    bool m_previewStarted = false;
    bool m_stopped = false;
};

#endif // EVENT_RUNNER_H