// event-runner.h
#ifndef EVENT_RUNNER_H
#define EVENT_RUNNER_H

#include "countdown.h"
#include "worker-loop.h"
#include <functional>

class EventRunner
{
private:
    WorkerLoop *mp_eventPreviewPublisher;
    WorkerLoop *mp_liveEventPublisher;
    Countdown m_start, m_end;

public:
    EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration,
                std::function<std::string()> previewDataFunc, std::function<std::string()> liveDataFunc);

    void stop();
    ~EventRunner();

private:
    void eventStarted();
    void eventEnded();
    std::function<std::string()> m_previewDataFunc;
    std::function<std::string()> m_liveDataFunc;
    bool m_eventStarted = false;
    bool m_stopped = false;
};

#endif // EVENT_RUNNER_H
