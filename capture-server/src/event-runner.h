#ifndef EVENT_RUNNER_H
#define EVENT_RUNNER_H

#include "countdown.h"
#include "worker-loop.h"
#include "event.h"
#include "thread-safe-bool.h"
#include "event-device.h"

class EventRunner
{
private:
    void eventStarted();
    void eventEnded();
    void publishPreviewData();
    void publishLiveData();

public:
    EventRunner(const Event &&event);
    void stop();
    ~EventRunner();

private:
    WorkerLoop *mp_eventPreviewPublisher;
    WorkerLoop *mp_liveEventPublisher;
    Countdown m_start, m_end;
    const Event m_event;

    bool m_eventStarted = false;
    bool m_previewStarted = false;
    bool m_stopped = false;
public:
    static ThreadSafeBool s_deviceCountDirty;
    std::vector<EventDevice> m_activeDevices;
};

#endif // EVENT_RUNNER_H