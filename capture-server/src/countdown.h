#ifndef COUNTDOWN_H
#define COUNTDOWN_H

#include <chrono>
#include <thread>

class Countdown
{
private:
public:
    Countdown();
    ~Countdown();
};

Countdown::Countdown()
{
    std::chrono::steady_clock().now()
}

Countdown::~Countdown()
{
}

#endif // COUNTDOWN_H