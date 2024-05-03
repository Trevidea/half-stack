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

void Event::handleAddDevice(const Request& req, Response& rsp) {
    try {
        // Extract data from the request JSON
        Json::Value requestData = req.json();
        
        // Check if event_id is present in the request JSON
        if (!requestData.isMember("event_id")) {
            // Respond with an error message indicating that event_id is required
            rsp.setError("Event ID is required in the request.");
            return;
        }

        // Extract other necessary data from the request JSON
        int event_id = requestData["event_id"].asInt();
        int device_id = requestData["device_id"].asInt();
        int user_id = requestData["user_id"].asInt();
        std::string location = requestData["location"].asString();
        std::string pin = requestData["pin"].asString();

        // Create JSON object for ScriptInsert
        Json::Value insertJson;
        insertJson["table"] = "event_device";
        
        // Construct columns
        Json::Value column1;
        column1["field"] = "device_id";
        column1["type"] = 0; // Assuming type 0 represents integer
        column1["value"] = device_id;
        insertJson["columns"].append(column1);

        Json::Value column2;
        column2["field"] = "event_id";
        column2["type"] = 0; // Assuming type 0 represents integer
        column2["value"] = event_id;
        insertJson["columns"].append(column2);

        Json::Value column3;
        column3["field"] = "location";
        column3["type"] = 1; // Assuming type 1 represents string
        column3["value"] = location;
        insertJson["columns"].append(column3);

        Json::Value column4;
        column4["field"] = "pin";
        column4["type"] = 1; // Assuming type 1 represents string
        column4["value"] = pin;
        insertJson["columns"].append(column4);

        Json::Value column5;
        column5["field"] = "user_id";
        column5["type"] = 0; // Assuming type 0 represents integer
        column5["value"] = user_id;
        insertJson["columns"].append(column5);

        // Generate SQL statement using ScriptInsert
        std::string sql = SqlHelper::ScriptInsert(insertJson);

        // Execute the SQL statement
        std::string result = executeSqlStr(sql);

        // Check if the execution was successful
        if (result == "SUCCESS") {
            // Provide a success message in the response
            rsp.setData("Device saved successfully.");
        } else {
            // Provide an error message if the execution failed
            rsp.setError("Failed to save the device to the event.");
        }

        rsp.complete();
    } catch (const std::exception& e) {
        // Handle exceptions
        rsp.setError("An error occurred while adding the device to the event: " + std::string(e.what()));
    }
}





