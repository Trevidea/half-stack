#ifndef EVENT_H
#define EVENT_H

#include <iostream>
#include "publisher.h"
#include "entity-base.h"

#include "countdown.h"
#include <map>

class Event : public EntityBase
{
public:
    void report() override;
    Event();

    std::string sport() const { return m_model.get<std::string>("sport"); }
    std::string level() const { return m_model.get<std::string>("level"); }
    std::string program() const { return m_model.get<std::string>("program"); }
    int year() const { return m_model.get<int>("year"); }
    std::string dtEvent() const { return m_model.get<std::string>("dt_event"); }
    int tmEvent() const { return m_model.get<int>("tm_event"); }
    std::string venue() const { return m_model.get<std::string>("venue"); }
    std::string detail() const { return m_model.get<std::string>("detail"); }
    std::string title() const { return m_model.get<std::string>("title"); }
    std::string status() const { return m_model.get<std::string>("status"); }
    std::string type() const { return m_model.get<std::string>("type"); }

public:
    void openPreview(const Request &req, Response rsp);
    void closePreview(const Request &req, Response rsp);

public:
    class EventRunner
    {
    private:
        Publisher m_pub;
        Countdown m_start, m_end;

    public:
        EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : m_pub{"inproc://somename"},
                        m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::started, this)},
                        m_end{m_start, duration, std::bind(&EventRunner::ended, this)}
        {
        }
    void stop()
    {
        this->m_start.abort();
        this->m_end.abort();
    }
    private:
        void started(){
            spdlog::trace("Event started..");
        }
        void ended()
        {
            spdlog::trace("Event ended..");
        }
    };

private:
    std::map<int, EventRunner *> m_runners;
};

#endif // EVENT_H
