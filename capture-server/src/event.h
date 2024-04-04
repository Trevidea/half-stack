// In Event.h
#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h"
#include "gateway.h"
#include "request.h"  // Include the appropriate header for Request
#include "response.h" // Include the appropriate header for Response
#include <string>
#include <vector>
#include <ctime>
#include <map>
#include <json/json.h> // Include the appropriate header for JSON handling

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
    void setEventType(const std::string &type);
    void setStreetAddress(const std::string &streetAddress);
    void setCityAddress(const std::string &cityAddress);

    void setDetail(const std::string &detail);
    void setTitle(const std::string &title); // Declaration of setTitle method
    void setStatus(EventStatus status);
    void setType(const std::string &type);

    // Getter and setter functions for other properties
    int getId() const
    {
        return this->id;
    }

    void setId(int id)
    {
        this->id = id;
    }

    std::time_t eventDateTime() const
    {
        return this->dttEvent;
    }

    void setEventDateTime(std::time_t dateTime)
    {
        this->dttEvent = dateTime;
    }

    Venue getVenue() const
    {
        return this->venue;
    }

    void setVenue(const Venue &venue)
    {
        this->venue = venue;
    }

    EventStatus getStatus() const
    {
        return this->status;
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

    // std::string title() const
    // {
    //     return this->m_model.get<std::string>("title");
    // }

    // Method to load event data from the database
    bool load(int eventId);

    // Method to convert event data to JSON
    Json::Value toJson() const;

    // Method to create a new event
    Json::Value create(const Request &request, Response &response);

private:
    // Member variables
    int id;
    std::time_t dttEvent;
    Venue venue;
    EventStatus status;
    EventDetail detail;
    std::string title; // Declaration of 'title' member variable
    bool executeSql(const std::string &sql);

    // Private helper methods
    void setEventDetail(const EventDetail &detail);

    // Function to retrieve user ID by username
    int getUserIdByUsername(const std::string &username);
};

#endif // EVENT_H
