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
    int year() const { return m_model.get<int>("year"); }
    std::string dtEvent() const { return m_model.get<std::string>("dt_event"); }
    int tmEvent() const { return m_model.get<int>("tm_event"); }
    Json::Value venue() const { return parseJsonField("venue"); }
    Json::Value detail() const { return parseJsonField("detail"); }
    std::string title() const { return m_model.get<std::string>("title"); }
    std::string status() const { return m_model.get<std::string>("status"); }
    std::string type() const { return m_model.get<std::string>("type"); }

    // Methods to access nested fields in venue
    std::string venueLocation() const
    {
        Json::Value venueJson = venue();
        return venueJson.isMember("location") ? venueJson["location"].asString() : "";
    }

    // Methods to access nested fields in detail
    std::string detailType() const
    {
        Json::Value detailJson = detail();
        return detailJson.isMember("type") ? detailJson["type"].asString() : "";
    }

    std::string detailStreetAddress() const
    {
        Json::Value detailJson = detail();
        return detailJson.isMember("streetAddress") ? detailJson["streetAddress"].asString() : "";
    }

    std::string detailCityAddress() const
    {
        Json::Value detailJson = detail();
        return detailJson.isMember("cityAddress") ? detailJson["cityAddress"].asString() : "";
    }

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
    Json::Value parseJsonField(const std::string &fieldName) const
    {
        Json::Value root;
        Json::CharReaderBuilder builder;
        std::string errs;
        const std::string rawJson = m_model.get<std::string>(fieldName);

        std::istringstream ss(rawJson);
        if (!Json::parseFromStream(builder, ss, &root, &errs))
        {
            // Handle error (e.g., log the error, throw an exception, etc.)
            std::cerr << "Failed to parse JSON for field " << fieldName << ": " << errs << std::endl;
        }

        return root;
    }
};

#endif // EVENT_H
