#include "worker-loop.h"
#include <chrono>
#include <spdlog/spdlog.h>

WorkerLoop::WorkerLoop(const int interval, std::function<void()> &work)
    : m_interval{interval}, m_work{work}, mp_thread{nullptr}, m_stopCalled{false}
{
}

void WorkerLoop::start()
{
    this->mp_thread = new std::thread{[this]()
                                      {
                                          while (!this->m_stopCalled)
                                          {
                                              this->m_work();
                                              std::this_thread::sleep_for(std::chrono::seconds(this->m_interval));
                                          }
                                      }};
    this->m_started = true;
}

void WorkerLoop::stop()
{
    this->m_stopCalled = true;
    if (this->m_started)
    {
        if (this->mp_thread && this->mp_thread->joinable())
        {
            spdlog::trace("joining workerloop thred..");
            this->mp_thread->join();
        }
        delete this->mp_thread;
    }
}

WorkerLoop::~WorkerLoop()
{
    stop();
}
