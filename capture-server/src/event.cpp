#include "event.h"
#include "gateway.h"

Event::Event() : EntityBase("event") {}

void Event::report() {
    // Route definitions
    Gateway::instance().route("GET", "/api/events/upcoming", [this](const Request &req, Response &rsp) { 
        this->listUpcoming(req, rsp); 
    });

    Gateway::instance().route("GET", "/api/events/ongoing", [this](const Request &req, Response &rsp) { 
        this->listOngoing(req, rsp); 
    });

    Gateway::instance().route("GET", "/api/events/past", [this](const Request &req, Response &rsp) { 
        this->listPast(req, rsp); 
    });

    Gateway::instance().route("GET", "/api/event", [this](const Request &req, Response &rsp) { 
        this->find(req, rsp); 
    });

    Gateway::instance().route("POST", "/api/event", [this](const Request &req, Response &rsp) { 
        this->create(req, rsp); 
    });

    Gateway::instance().route("PUT", "/api/event", [this](const Request &req, Response &rsp) { 
        this->update(req, rsp); 
    });

    Gateway::instance().route("DELETE", "/api/event", [this](const Request &req, Response &rsp) { 
        this->remove(req, rsp); 
    });
}

void Event::listUpcoming(const Request &req, Response &rsp) {
    // Call the list method of EntityBase to retrieve upcoming events
    std::vector<Event> events = EntityBase::list<Event>();
    // Process events...
}

void Event::listOngoing(const Request &req, Response &rsp) {
    // Call the list method of EntityBase to retrieve ongoing events
   std::vector<Event> events = EntityBase::list<Event>();
    
    
    Json::Value jsonResponse;
    for (const auto &event : events) {
        Json::Value eventJson;
        eventJson["sport"] = event.sport();
        eventJson["level"] = event.level();
        eventJson["program"] = event.program();
        eventJson["year"] = event.year();
        eventJson["title"] = event.title();
        eventJson["type"] = event.eventDetail().type;
        eventJson["description"] = event.eventDetail().description;
        jsonResponse.append(eventJson);
    }

    // Set the response body with the JSON data
    rsp.setBody(jsonResponse.toStyledString());
    // Set appropriate headers and status code
    rsp.setStatusCode(200);

}

void Event::listPast(const Request &req, Response &rsp) {
    // Call the list method of EntityBase to retrieve past events
    std::vector<Event> events = EntityBase::list<Event>();
    // Process events...
}

void Event::find(const Request &req, Response &rsp) {
    // Call the find method of EntityBase to find a specific event
    std::vector<Event> events = EntityBase::find<Event>(req.getQueryString());
    // Process events...
}

void Event::create(const Request &req, Response &rsp) {
    // Call the create method of EntityBase to create a new event
    Json::Value result = EntityBase::create(req, rsp);
    // Process result...
}

void Event::update(const Request &req, Response &rsp) {
    // Call the update method of EntityBase to update an existing event
    Json::Value result = EntityBase::update(req, rsp);
    // Process result...
}

void Event::remove(const Request &req, Response &rsp) {
    // Call the remove method of EntityBase to remove an existing event
    std::vector<Event> events = EntityBase::remove<Event>(req.getQueryString());
    // Process events...
}

std::vector<Event> Event::forPeriodAndStatus(const std::string &startDateTime, const std::string &endDateTime, const std::string &status) {
    // Call the corresponding method of EntityBase to find events for a specific period and status
    return EntityBase::find<Event>("startDateTime=" + startDateTime + "&endDateTime=" + endDateTime + "&status=" + status);
}
