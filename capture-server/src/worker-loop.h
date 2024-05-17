#ifndef WORKERLOOP_H
#define WORKERLOOP_H

#include <functional>
#include <thread>

class WorkerLoop
{
private:
    int m_interval;
    std::function<void()> m_work;
    std::thread *mp_thread;
    bool m_stopCalled = false;
    bool m_started = false;
public:
    WorkerLoop(const int interval, std::function<void()> &work);
    void start();
    void stop();
    ~WorkerLoop();
};

#endif // WORKERLOOP_H
