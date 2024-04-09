#ifndef EVENT_H
#define EVENT_H

#include <iostream>
#include "publisher.h"
#include "entity-base.h"

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
    void startEvent(const Request &req, Response rsp);
    void stopEvent(const Request &req, Response rsp);

public:
    class EventRunner
    {
    private:
        Publisher m_pub;

    public:
        EventRunner() : m_pub{"inproc://somename"} {}
    };

private:
    EventRunner *mp_runner;
};

#endif // EVENT_H
