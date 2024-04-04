#ifndef EVENT_H
#define EVENT_H

#include "entity-base.h"
#include "gateway.h"
#include "request.h"
#include "response.h"
#include <string>
#include <vector>
#include <ctime> // Include for std::tm
#include <map>
#include <json/json.h>

enum class EventStatus {
    Upcoming,
    OnGoing,
    Past
};

enum class EventType {
    OnDemand,
    Scheduled
};

struct Venue {
    std::string location;
};

struct EventDetail {
    std::string type;
    std::string streetAddress;
    std::string cityAddress;
};

class Event : public EntityBase {
public:
    Event();

    void report();

    // Method declarations for route handlers
    void listUpcoming(const Request &req, Response &rsp);
    int save();
    int saveEventToDatabase(const std::string &title, const std::string &level,
                        const std::string &program, int year, const std::tm &dt_event_tm,
                        int tmEvent, const Venue &venue, const EventDetail &detail,
                        EventStatus status, EventType type);
    Json::Value create(const Request &request, Response &response);
    Json::Value remove(const Request &request, Response &response);

    // Getter and setter functions for other properties
    int getId() const {
        return id;
    }

    void setId(int id) {
        this->id = id;
    }

    const std::string &getTitle() const {
        return title;
    }

    void setTitle(const std::string &title) {
        this->title = title;
    }

    const EventStatus &getStatus() const {
        return status;
    }

    void setStatus(const EventStatus &status) {
        this->status = status;
    }

    const EventType &getType() const {
        return type;
    }

    void setType(const EventType &type) {
        this->type = type;
    }

    // Setter functions for member variables
    void setVenue(const Venue &venue);
    void setDetail(const EventDetail &detail);

    // Setter function for date and time
    void setDtEvent(const std::tm &dtEvent) {
        this->dt_event = dtEvent;
    }

    // Setter functions for level, program, sport, tm_event, and location
    void setLevel(const std::string &level) {
        this->level = level;
    }

    void setProgram(const std::string &program) {
        this->program = program;
    }

    void setSport(const std::string &sport) {
        this->sport = sport;
    }

    void setTmEvent(int tmEvent) {
        this->tm_event = tmEvent;
    }

    void setLocation(const std::string &location) {
        this->venue.location = location;
    }

    // Getter and setter for year
    int getYear() const {
        return year;
    }

    void setYear(int year) {
        this->year = year;
    }

private:
    // Member variables
    int id;
    std::string title;
    std::string level;
    std::string program;
    std::string sport;
    std::tm dt_event; // Changed type to std::tm
    int tm_event;
    int year; // Added member variable for year
    Venue venue;
    EventDetail detail;
    EventStatus status;
    EventType type;

    // Private helper methods
    int saveEventToDatabase(); // Updated save function declaration
    void executeSql(const std::string &sql);
};

#endif // EVENT_H
