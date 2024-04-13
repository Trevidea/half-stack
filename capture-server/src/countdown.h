#ifndef COUNTDOWN_H
#define COUNTDOWN_H

#include <chrono>
#include <thread>
#include <functional>
#include <condition_variable>
#include <mutex>

class Countdown
{
private:
    std::tm m_time;
    std::thread *mp_thread;
    std::mutex mtx;
    std::condition_variable cv;
    bool m_abort = false;
private:
    std::function<void()> m_end;
    void worker(std::chrono::time_point<std::chrono::system_clock> tp);
public:
    Countdown(const int year,
              const int month,
              const int day,
              const int hour,
              const int min,
              const int sec,
              std::function<void()> &&end);
    Countdown(const Countdown &start, const int forTime, std::function<void()> &&end);
    ~Countdown();
    void abort();
};

#endif // COUNTDOWN_H