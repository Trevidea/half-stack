#include "event.h"
#include "gateway.h"
#include "datetimeutils.h"
#include <ctime>
#include "publisher.h"

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
    Gateway::instance().route("GET", "/api/event/open-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->openPreview(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/event/close-preview", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->closePreview(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/event", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/event", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}

void Event::openPreview(const Request &req, Response rsp)
{
    const auto event = Event::byId<Event>(27);
    if (!event.notSet())
    {
        const auto dt = getDTUDateFromSql(event.dtEvent());
        const auto tm = getDTUTimeFromSql(event.tmEvent());
        spdlog::trace("Event {}, date: {}, month: {}, year: {}, hours: {}, mins: {}",
                      event.title(), dt.date, dt.month, dt.year, tm.hours, tm.minutes);
        const auto &kvPair = this->m_runners.find(27);
        if (kvPair != this->m_runners.end())
        {
            kvPair->second->stop();
            this->m_runners.erase(27);
        }
        Json::Value response = Json::objectValue;
        response["status"] = "success";
        Publisher::instance().publish("event-terminal", Json::FastWriter().write(response));
        
        this->m_runners.emplace(27, new EventRunner(dt.year, dt.month, dt.date, tm.hours, tm.minutes, tm.seconds, 1));

        rsp.setData(Gateway::instance().formatResponse({{response}}));
    }
}
void Event::closePreview(const Request &req, Response rsp)
{
    if (this->m_runners.find(27) != this->m_runners.end())
    {
        auto &runner = this->m_runners[27];
        runner->stop();
        delete runner;
        this->m_runners.erase(1);
    }
    Json::Value response = Json::objectValue;
    response["status"] = "success";
    rsp.setData(Gateway::instance().formatResponse({{response}}));
}
