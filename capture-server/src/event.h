#ifndef EVENT_H
#define EVENT_H

#include <iostream>
#include "entity-base.h"
#include "event-runner.h"
#include <chrono>
#include "datetimeutils.h"
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
    void openPreview(const Request &req, Response &rsp);
    void closePreview(const Request &req, Response &rsp);

private:
    void closeAllPreviews();
    inline int minutesToStart() const
    {
        int mins = 0;
        const auto dt = this->getDTUDate();
        const auto tm = this->getDTUTime();

        std::tm dttEvent{tm.seconds, tm.minutes, tm.hours, dt.date, dt.month - 1, dt.year - 1900};
        std::chrono::time_point tpEvent = std::chrono::system_clock::from_time_t(std::mktime(&dttEvent));
        std::chrono::time_point now = std::chrono::system_clock::now();
        std::chrono::duration diff = tpEvent - now;
        spdlog::trace("Time to start in microsecs {} and mins {}", diff.count(), diff.count()/6e+7);
        return diff.count()/6e+7;
    }
    inline dtu_date getDTUDate() const
    {
        return getDTUDateFromSql(this->dtEvent());
    }
    inline dtu_time getDTUTime() const
    {
        return getDTUTimeFromSql(this->tmEvent());
    }

private:
    std::map<int, EventRunner *> m_runners;
};

#endif // EVENT_H
