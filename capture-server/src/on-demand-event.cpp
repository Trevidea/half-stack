#include "on-demand-event.h"
#include "event.h"
#include "gateway.h"
#include "user.h" // Assuming you have a class to handle user-related operations

// Define a global vector to store on-demand events
std::vector<Event> onDemandEvents;

OnDemandEvent::OnDemandEvent() : EntityBase("on_demand_event") {}

void OnDemandEvent::report()
{
    EntityBase::report();

    // Route definitions
    Gateway::instance().route("GET", "/api/on-demand-events", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/on-demand-events",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/on-demand-events/:id",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}

void OnDemandEvent::list(const Request &request, Response &rsp)
{
    // Construct and execute a SELECT query to fetch on-demand events from the database
    std::string sqlQuery = "SELECT * FROM public.ondemandevent"; // Modify this query according to your table structure
    std::string result = executeSqlStr(sqlQuery); // Implement a method to execute SQL queries and return the result as a string

    // Set response data with the fetched results and complete the response
    rsp.setData(result);
    rsp.complete();
}

Json::Value OnDemandEvent::create(const Request &request, Response &response) {
    Json::Value parsedJson = request.json();

    // Extract necessary data from the request JSON
    std::string title = parsedJson["title"].asString();
    // Extract other required fields...

    // Create a new Event instance
    Event newEvent;

    // Set event details from parsed JSON
    newEvent.setTitle(title);
    // Set other event details...

    // Add the new event to the global vector
    onDemandEvents.push_back(newEvent);

    // Assuming newEvent.getId() returns the auto-generated ID of the new event
    int eventId = newEvent.getId();

    // Construct and execute the SQL query to insert data into the database
    std::string sqlQuery = "INSERT INTO ondemandevent (event_id, owner_id) VALUES (" + std::to_string(eventId) + ", " + std::to_string(owner_id) + ")";
    try {
        // Execute the SQL query using executeSql function (implement this)
        executeSql(sqlQuery);

        // Set response data and complete the response
        response.setData("New event created successfully");
        response.complete();

        return parsedJson;
    } catch (const std::exception &ex) {
        // Handle any errors that occur during execution
        response.setData("Error: " + std::string(ex.what()));
        response.complete();
        
        // Return a placeholder Json::Value since the method signature requires it
        return Json::Value();
    }
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
                                            [onDemandEventId](const Event& event) {
                                                return event.getId() == onDemandEventId;
                                            }), onDemandEvents.end());

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
