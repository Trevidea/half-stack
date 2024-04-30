#include "event.h"
#include "gateway.h"
#include <ctime>
#include "publisher.h"
#include "half-stack-exceptions.h"
#include <pqxx/pqxx>
#include <sstream>

Event::Event() : EntityBase("event")
{
}

void Event::report()
{
    EntityBase::report();
    // Route definitions...
    Gateway::instance().route("GET", "/api/events", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/event", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event/open-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->openPreview(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event/close-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->closePreview(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/event/sync", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->sync(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/event", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->closeAllPreviews();
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/event", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
    // Route for adding a device to the event
    Gateway::instance().route("POST", "/api/event/add-device",
                              [this](const Request &req, Response &rsp)
                              {
                                  this->handleAddDevice(req, rsp);
                              });
}

void Event::validateEventId(int eventId)
{
    try
    {
        // Retrieve the event by its ID
        auto event = EntityBase::byId<Event>(eventId);

        // Check if the event is upcoming or live based on minutes to start
        auto minsToStart = event.minutesToStart();
        if (minsToStart >= 0)
        {
            // Event is upcoming or live
            spdlog::trace("Event ID {} is upcoming or live.", eventId);
        }
        else
        {
            // Event is not upcoming or live
            spdlog::error("Event ID {} does not correspond to an upcoming or live event.", eventId);
            throw std::runtime_error("Event ID does not correspond to an upcoming or live event.");
        }
    }
    catch (const ExModelNotFoundException &e)
    {
        // Handle the case where the event is not found
        spdlog::error("Event ID {} not found.", eventId);
        throw std::runtime_error("Event ID not found.");
    }
    catch (const std::exception &e)
    {
        // Handle other exceptions
        spdlog::error("An error occurred while validating event ID {}: {}", eventId, e.what());
        throw;
    }
}

void Event::closeAllPreviews()
{
    for (auto &&runner : this->m_runners)
    {
        runner.second->stop();
        delete runner.second;
    }
    this->m_runners.clear();
}

void Event::openPreview(const Request &req, Response &rsp)
{
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Open preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto event = Event::byId<Event>(eventId);

    if (!event.notSet())
    {
        const auto dt = event.getDTUDate();
        const auto tm = event.getDTUTime();
        spdlog::trace("Event {}, date: {}, month: {}, year: {}, hours: {}, mins: {}",
                      event.title(), dt.date, dt.month, dt.year, tm.hours, tm.minutes);
        auto minsToStart = event.minutesToStart();
        if (minsToStart > 60)
        {
            throw ExInvalidPreviewDurationException(event.title(), minsToStart);
        }

        const auto &kvPair = this->m_runners.find(eventId);
        if (kvPair != this->m_runners.end())
        {
            spdlog::trace("Runner already exists for event {}. Stopping runner - just in case", eventId);
            kvPair->second->stop();
            this->m_runners.erase(kvPair);
        }

        Publisher::instance().publish("event-terminal", Json::FastWriter().write(response));
        spdlog::trace("Creating a new runner for event id {}", eventId);
        this->m_runners.emplace(eventId, new EventRunner(dt.year, dt.month, dt.date, tm.hours, tm.minutes, tm.seconds, 1));
    }
    const std::string strRsp = Gateway::instance().formatResponse({{response}});
    spdlog::trace("setting response: {}", strRsp);
    rsp.setData(strRsp);
}

void Event::closePreview(const Request &req, Response &rsp)
{
    Json::Value request = req.json();
    const int eventId = request.get("eventId", -1).asInt();
    spdlog::trace("Close preview request for: {}", eventId);

    Json::Value response = Json::objectValue;
    response["status"] = "success";
    const auto &kvPair = this->m_runners.find(eventId);
    if (kvPair != this->m_runners.end())
    {
        spdlog::trace("Runner found for event {}. closing preview!", eventId);
        kvPair->second->stop();
        this->m_runners.erase(kvPair);
    }
    rsp.setData(Gateway::instance().formatResponse({{response}}));
}

void Event::handleAddDevice(const Request &req, Response &rsp)
{
    // Extract device_id, user_id, location, and event_id from the request JSON
    Json::Value requestData = req.json();
    int device_id = requestData["device_id"].asInt();
    int user_id = requestData["user_id"].asInt();
    std::string location = requestData["location"].asString();

    // Check if event_id is present in the request JSON
    if (!requestData.isMember("event_id"))
    {
        // Respond with an error message indicating that event_id is required
        rsp.setError("Event ID is required in the request.");
        return;
    }

    // Retrieve the event_id from the request JSON
    int event_id = requestData["event_id"].asInt();
    std::string pin = requestData["pin"].asString(); // Assuming "pin" represents the PIN

    try
    {
        // Retrieve the event by its ID
        auto event = EntityBase::byId<Event>(event_id);

        // Prepare the SQL statement to insert the new device into the event_device table
        std::string sql = "INSERT INTO event_device (event_id, device_id, user_id, location, pin) VALUES (";
        sql += std::to_string(event_id) + ", ";
        sql += std::to_string(device_id) + ", ";
        sql += std::to_string(user_id) + ", ";
        sql += "'" + location + "', ";
        sql += "'" + pin + "')";

        // Execute the SQL statement
        EntityBase entityBase("event_device");
        std::string result = entityBase.executeSqlStr(sql);

        // Prepare the success response
        std::map<std::string, std::string> responseData;
        responseData["status"] = "success";
        responseData["message"] = "EventDevice added successfully";
        responseData["event_id"] = std::to_string(event_id);
        responseData["device_id"] = std::to_string(device_id);
        responseData["user_id"] = std::to_string(user_id);
        responseData["location"] = location;
        responseData["pin"] = pin;

        // Convert the response data to a vector of maps
        std::vector<std::map<std::string, std::string>> responseVector;
        responseVector.push_back(responseData);

        // Pass the response data to formatResponse
        rsp.setData(Gateway::instance().formatResponse(responseVector));
    }
    catch (const ExModelNotFoundException &e)
    {
        // Handle the case where the event is not found
        rsp.setError("The specified event was not found.");
    }
    catch (const std::exception &e)
    {
        // Handle other exceptions
        rsp.setError("An error occurred while adding the device to the event: " + std::string(e.what()));
    }
}
