#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h" // Assuming this includes definitions for Request and Response
#include "gateway.h"     // Assuming this includes definitions for Gateway
#include <string>
#include <vector>
#include <ctime>
#include <map>

// Enum for event status
enum EventStatus
{
    OnGoing,
    Upcoming,
    Past
};

// Structure to represent venue details
struct Venue
{
    std::string type;
    std::string streetAddress;
    std::string cityAddress;
};

// Structure to represent event detail
struct EventDetail
{
    std::string type;
    std::string description;
};

// Class to represent Event entity
class Event : public EntityBase
{
public:
    Event();

    // Getter and setter functions for EventDetail
    const EventDetail &eventDetail() const
    {
        return this->detail;
    }

    EventDetail &eventDetail()
    {
        return this->detail;
    }

    // Setter functions for EventDetail properties
    void setEventType(const std::string &type)
    {
        this->detail.type = type;
    }

    void setEventDescription(const std::string &description)
    {
        this->detail.description = description;
    }

    // Other getter functions remain the same
    std::string sport() const
    {
        return this->m_model.get<std::string>("sport");
    }

    std::string level() const
    {
        return this->m_model.get<std::string>("level");
    }

    std::string program() const
    {
        return this->m_model.get<std::string>("program");
    }

    int year() const
    {
        return this->m_model.get<int>("year");
    }

    std::string title() const
    {
        return this->m_model.get<std::string>("title");
    }

    // Method to retrieve events for a specific period
    static std::vector<Event> forPeriodAndStatus(const std::string &startDateTime, const std::string &endDateTime, const std::string &status);

private:
    int id;
    time_t dttEvent;
    Venue venue; // Changed to a single instance of Venue
    bool onPremise;
    EventStatus status;
    EventDetail detail; // Changed to a single instance of EventDetail
};

#endif // EVENT_H
