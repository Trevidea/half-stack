#include "event.h"
#include "gateway.h"
#include "json/json.h"
#include "sqlhelper.h"
#include "pqxx/pqxx"

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
    if (this->m_runners.find(1) == this->m_runners.end())
        this->m_runners.emplace(1, new EventRunner(2024, 4, 12, 11, 46, 0, 1));
}
void Event::closePreview(const Request &req, Response rsp)
{
    if (this->m_runners.find(1) != this->m_runners.end())
    {
        auto &runner = this->m_runners[1];
        runner->stop();
        delete runner;
        this->m_runners.erase(1);
    }
}
