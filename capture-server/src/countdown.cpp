#include "countdown.h"
void Countdown::worker(std::chrono::time_point<std::chrono::system_clock> tp)
{
    std::unique_lock lk(this->mtx);

    cv.wait_until(lk, tp, [this]()
                  { return this->m_abort; });

    lk.unlock();
    cv.notify_one();

    this->m_end();
}

Countdown::Countdown(const int year,
                     const int month,
                     const int day,
                     const int hour,
                     const int min,
                     const int sec,
                     std::function<void()> &&end) : m_time{
                                                        sec,
                                                        min,
                                                        hour,
                                                        day,
                                                        month - 1,
                                                        year - 1900},
                                                    mp_thread{nullptr}, m_end{end}
{
    std::chrono::time_point tp =
        std::chrono::system_clock::from_time_t(std::mktime(&this->m_time));
    this->mp_thread = new std::thread(&Countdown::worker, this, tp);
}
Countdown::Countdown(const Countdown &cd, const int duration,
                     std::function<void()> &&end) : m_time{cd.m_time},
                                                    mp_thread{nullptr},
                                                    m_end{end}
{
    std::chrono::time_point tp =
        std::chrono::system_clock::from_time_t(std::mktime(&this->m_time));
    std::chrono::minutes durat{duration};
    tp += durat;
    this->mp_thread = new std::thread(&Countdown::worker, this, tp);
}
void Countdown::abort()
{
    std::unique_lock<std::mutex> lck(mtx);
    this->m_abort = true;
    cv.notify_all();
}
Countdown::~Countdown()
{
    this->mp_thread->join();
    delete this->mp_thread;
    this->mp_thread = nullptr;
}