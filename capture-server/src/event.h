#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h" // Assuming EntityBase is the base class for entities
#include "gateway.h"
#include <string>
#include <vector>
#include <ctime> // For time_t
#include <map>   // For std::map

// Enum for event status
enum class EventStatus {
    OnGoing,
    Upcoming,
    Past
};

// Structure to represent venue details
struct Venue {
    std::string type;
    std::string streetAddress;
    std::string cityAddress;
};

// Structure to represent event detail
struct EventDetail {
    std::string streetAddress;
    std::string cityAddress;
    std::string type;
};

// Class to represent Event entity
class Event : public EntityBase {
public:
    Event();
    ~Event();

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
    static std::vector<Event> forPeriod(int year, const std::string &cat);

private:
    int id;
    std::string sport;
    std::string level;
    std::string program;
    int year;
    time_t dttEvent;
    std::map<std::string, Venue> venue;
    bool onPremise;
    std::vector<EventDetail> detail;
    std::string title;
    EventStatus status;
    std::string time; // Assuming time is represented as a string
    bool active;
};

#endif // EVENT_H
