#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h" // Assuming this includes definitions for Request and Response
#include "gateway.h"     // Assuming this includes definitions for Gateway
#include <string>
#include <vector>
#include <ctime>
#include <map>

// Enum for event status
enum class EventStatus
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

    // Route handling methods
    void report();
    void listUpcoming(const Request &req, Response &rsp);
    void listOngoing(const Request &req, Response &rsp);
    void listPast(const Request &req, Response &rsp);
    void find(const Request &req, Response &rsp);
    void create(const Request &req, Response &rsp);
    void update(const Request &req, Response &rsp);
    void remove(const Request &req, Response &rsp);

    // Method to retrieve events for a specific period
    static std::vector<Event> forPeriodAndStatus(const std::string &startDateTime, const std::string &endDateTime, const std::string &status);

private:
    int id;
    std::string sport;
    std::string level;
    std::string program;
    int year;
    time_t dttEvent;
    Venue venue;         // Changed to a single instance of Venue
    bool onPremise;
    EventDetail detail;  // Changed to a single instance of EventDetail
    std::string title;
    EventStatus status;
};

#endif // EVENT_H
