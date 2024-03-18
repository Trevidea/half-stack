#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h" // Assuming EntityBase is the base class for entities
#include "request.h"
#include "response.h"

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
    // Event attributes
    int id; // Auto-generated primary key
    std::string sport;
    std::string level;
    std::string program;
    int year;
    std::string dttEvent; // Assuming datetime is represented as string for simplicity
    std::string venue; // JSON representation of venue
    bool onPremise;
    std::string detail; // JSON representation of event details
    std::string title;
    enum Status { Upcoming, Ongoing, Past }; // Enum for event status

    // Add any private members as needed
};

#endif // EVENT_H
