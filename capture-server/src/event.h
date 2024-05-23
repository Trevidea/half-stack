#ifndef EVENT_H
#define EVENT_H

#include <iostream>
#include "entity-base.h"
#include <chrono>
#include "datetimeutils.h"
#include <map>
#include <ctime>
#include "event-device.h"

class Event : public EntityBase
{
public:
    void report() override;
    Event();

    std::string sport() const { return m_model.get<std::string>("sport"); }
    std::string level() const { return m_model.get<std::string>("level"); }
    std::string program() const { return m_model.get<std::string>("program"); }
    int duration() const { return 1; }
    int year() const { return m_model.get<int>("year"); }
    std::string dtEvent() const { return m_model.get<std::string>("dt_event"); }
    int tmEvent() const { return m_model.get<int>("tm_event"); }
    std::string title() const { return m_model.get<std::string>("title"); }
    std::string status() const { return m_model.get<std::string>("status"); }
    std::string type() const { return m_model.get<std::string>("type"); }
    int duration() const { return m_model.get<int>("duration"); }


    std::string venueLocation() const;
    void setVenueLocation(const std::string &value);
    std::string detailType() const;
    void setDetailType(const std::string &value);
    std::string streetAddress() const;
    void setStreetAddress(const std::string &value);
    std::string cityAddress() const;
    void setCityAddress(const std::string &value);

public:
    void validateEventId(int eventId); // Declaration of validateEventId function

    inline dtu_date getDTUDate() const
    {
        return getDTUDateFromSql(this->dtEvent());
    }
    inline dtu_time getDTUTime() const
    {
        return getDTUTimeFromSql(this->tmEvent());
    }
    inline long minutesToStart() const
    {
        int mins = 0;
        const auto dt = this->getDTUDate();
        const auto tm = this->getDTUTime();
        using namespace std::chrono_literals;
        std::tm dttEvent{tm.seconds, tm.minutes, tm.hours, dt.date, dt.month - 1, dt.year - 1900};
        std::chrono::time_point tpEvent = std::chrono::system_clock::from_time_t(std::mktime(&dttEvent));
        std::chrono::time_point now = std::chrono::system_clock::now();
        auto minutes = std::chrono::duration_cast<std::chrono::minutes>(tpEvent - now);
        spdlog::trace("Date of event: {}, and now it is {}. Time to start in mins {}", getDateStringFromTimePoint(tpEvent), getDateStringFromTimePoint(now), minutes.count());
        return minutes.count();
    }

private:
};

#endif // EVENT_H
