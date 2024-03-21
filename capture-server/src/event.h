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
    std::string location;
};

// Structure to represent event detail
struct EventDetail
{
    std::string type;
    std::string streetAddress;
    std::string cityAddress;
};

// Class to represent Event entity
class Event : public EntityBase
{
public:
    Event();

    void report();

    // Method declarations for route handlers
    void listUpcoming(const Request &req, Response &rsp);

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
        this->m_model.set("type", type);
    }

    void setStreetAddress(const std::string &streetAddress)
    {
        this->detail.streetAddress = streetAddress;
        this->m_model.set("streetAddress", streetAddress);
    }

    void setCityAddress(const std::string &cityAddress)
    {
        this->detail.cityAddress = cityAddress;
        this->m_model.set("cityAddress", cityAddress);
    }

    // Getter function for id (assuming id is auto-generated)
    int getId() const
    {
        return this->id;
    }

    // Setter function for id (assuming id is auto-generated)
    void setId(int id)
    {
        this->id = id;
    }

    // Other getter functions fetching data from m_model
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
    // Member variables
    int id;
    std::time_t dttEvent;
    Venue venue;
    bool onPremise;
    EventStatus status;
    EventDetail detail;
};

#endif // EVENT_H
