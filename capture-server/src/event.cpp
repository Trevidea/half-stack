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
   //std::vector<Event> events = EntityBase::list<Event>();
    
    // Create dummy event 1
    Event event1("{\"sport\": \"Football\", \"level\": \"College\", \"program\": \"Championship\", \"year\": 2024, \"title\": \"College Football Championship\", \"status\": \"Upcoming\"}");
    event1.setEventType("Match");
    event1.setEventDescription("Exciting college football championship match.");
    events.push_back(event1);

    // Create dummy event 2
    Event event2("{\"sport\": \"Basketball\", \"level\": \"High School\", \"program\": \"Tournament\", \"year\": 2024, \"title\": \"High School Basketball Tournament\", \"status\": \"Upcoming\"}");
    event2.setEventType("Tournament");
    event2.setEventDescription("Annual high school basketball tournament.");
    events.push_back(event2);

    // Create dummy event 3
    Event event3("{\"sport\": \"Soccer\", \"level\": \"Professional\", \"program\": \"League\", \"year\": 2024, \"title\": \"Professional Soccer League Match\", \"status\": \"Upcoming\"}");
    event3.setEventType("Match");
    event3.setEventDescription("Key match in the professional soccer league.");
    events.push_back(event3);

    // Now you can process these dummy events as if they were real
    // For testing purposes, you can directly construct dummy events or even read them from a test file
    // You can also use loops or other methods to generate multiple dummy events with different data

    // Here, you might want to convert these dummy events to JSON format and include them in the response
    // For simplicity, let's assume rsp is a JSON response
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
