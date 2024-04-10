#include "on-demand-event.h"
#include "event.h"
#include "gateway.h"
#include "json/json.h"

// Define a global vector to store on-demand events
std::vector<Event> onDemandEvents;

OnDemandEvent::OnDemandEvent() : EntityBase("ondemandevent") {}

void OnDemandEvent::report()
{
    EntityBase::report();

    // Route definitions
    Gateway::instance().route("GET", "/api/on-demand-events", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/on-demand-event", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/on-demand-event",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/on-demand-event", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/on-demand-event/:id",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
<<<<<<< HEAD

// void OnDemandEvent::list(const Request &request, Response &rsp)
// {
//     // Convert the vector of on-demand events to JSON and set it as response data
//     Json::Value responseData(Json::arrayValue);
//     for (const auto &event : onDemandEvents)
//     {
//         // Convert each event to JSON and add it to the responseData array
//         Json::Value eventJson;
//         eventJson["id"] = event.getId();
//         responseData.append(eventJson);
//     }

//     // Set response data and complete the response
//     rsp.setData(responseData.toStyledString());
//     rsp.complete();
// }

void OnDemandEvent::create(const Request &request, Response &response)
{
    // Parse the JSON data from the request
    Json::Value requestData = request.json();

    // Extract relevant data from the JSON
    std::string title = requestData["title"].asString();
    std::string dt_event_str = requestData["dt_event"].asString();
    std::string level = requestData["level"].asString();
    std::string program = requestData["program"].asString();
    std::string sport = requestData["sport"].asString();
    int tm_event = requestData["tm_event"].asInt();
    std::string location = requestData["venue"]["location"].asString();

    // Validate and set the status field
    std::string statusStr = requestData["status"].asString();
    EventStatus status;
    if (statusStr == "Upcoming") {
        status = EventStatus::Upcoming;
    } else if (statusStr == "OnGoing") {
        status = EventStatus::OnGoing;
    } else if (statusStr == "Past") {
        status = EventStatus::Past;
    } else {
        // Handle invalid status value
        // Set appropriate error response data
        Json::Value responseData;
        responseData["error"] = "Invalid value for status field";
        response.setData(responseData.toStyledString());
        response.complete();
        return;
    }

    // Validate and set the type field
    std::string typeStr = requestData["type"].asString();
    EventType type;
    if (typeStr == "Ondemand") {
        type = EventType::OnDemand;
    } else if (typeStr == "Scheduled") {
        type = EventType::Scheduled;
    } else {
        // Handle invalid type value
        // Set appropriate error response data
        Json::Value responseData;
        responseData["error"] = "Invalid value for type field";
        response.setData(responseData.toStyledString());
        response.complete();
        return;
    }

    // Parse dt_event string to std::tm
    std::tm dt_event_tm = {};
    std::stringstream dt_ss(dt_event_str);
    dt_ss >> std::get_time(&dt_event_tm, "%Y-%m-%d"); // Assuming date format is "YYYY-MM-DD"

    // Extract year from std::tm
    int year = dt_event_tm.tm_year + 1900; // tm_year is years since 1900

    // Save the data into the Event table
    Event event;
    event.setTitle(title);
    event.setDtEvent(dt_event_tm); // Set date and time
    event.setYear(year);           // Set year
    event.setLevel(level);
    event.setProgram(program);
    event.setSport(sport);
    event.setTmEvent(tm_event);
    event.setLocation(location);
    event.setStatus(status); // Set status
    event.setType(type); // Set type

    // Add error handling if save fails
    // Assuming save returns an event ID
    int eventId = event.save();

    // Now, construct a JSON response with the generated event_id
    Json::Value responseData;
    responseData["event_id"] = eventId;

    // Set response data and complete the response
    response.setData(responseData.toStyledString());
    response.complete();
}

void OnDemandEvent::remove(const Request &request, Response &rsp)
{
    // Extract the ID of the on-demand event to be deleted from the request parameters
    std::string idParam = ":id";
    int onDemandEventId = -1; // Default value if ID is not found
    for (const auto &query : request.queries())
    {
        if (query.m_operand1 == idParam)
        {
            try
            {
                onDemandEventId = std::stoi(query.m_operand2);
                break; // Exit loop if ID is found
            }
            catch (const std::exception &e)
            {
                // Handle conversion error if necessary
            }
        }
    }

    if (onDemandEventId != -1)
    {
        // Delete the on-demand event with the specified ID from the vector
        onDemandEvents.erase(std::remove_if(onDemandEvents.begin(), onDemandEvents.end(),
                                            [onDemandEventId](const Event &event)
                                            {
                                                return event.getId() == onDemandEventId;
                                            }),
                             onDemandEvents.end());

        // Set response data and complete the response
        rsp.setData("On-demand event deleted successfully");
    }
    else
    {
        // Handle the case where the ID parameter is not found in the request
        // Set appropriate error response data
        rsp.setData("Error: ID parameter not found in request");
    }
    rsp.complete();
}
=======
>>>>>>> 585a3248b13605c35abad749958410026e70b241
