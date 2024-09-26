#include "coach.h"
#include "gateway.h"

Coach::Coach() : EntityBase("coach") { }

void Coach::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/coaches", // To request LIST
        [this](const Request &req, Response &rsp)
        {
            this->list(req, rsp);
        });

    Gateway::instance().route("GET", "/api/coach", // To request SINGLE
        [this](const Request &req, Response &rsp)
        {
            this->find(req, rsp);
        });

    Gateway::instance().route("POST", "/api/coach", // To request INSERT
        [this](const Request &req, Response &rsp)
        {
            this->create(req, rsp);
        });

    Gateway::instance().route("PUT", "/api/coach", // To request UPDATE
        [this](const Request &req, Response &rsp)
        {
            this->update(req, rsp);
        });

    Gateway::instance().route("DELETE", "/api/coach", // To request DELETE
        [this](const Request &req, Response &rsp)
        {
            this->remove(req, rsp);
        });
}

Coach::~Coach() { }

int Coach::id() const
{
    return this->m_model.get<int>("id");
}

std::string Coach::sport() const
{
    return this->m_model.get<std::string>("sport");
}

std::string Coach::title() const
{
    return this->m_model.get<std::string>("title");
}

std::string Coach::program() const
{
    return this->m_model.get<std::string>("program");
}

std::string Coach::year() const
{
    return this->m_model.get<std::string>("year");
}

std::string Coach::first_name() const
{
    return this->m_model.get<std::string>("first_name");
}

std::string Coach::last_name() const
{
    return this->m_model.get<std::string>("last_name");
}

std::string Coach::mobile() const
{
    return this->m_model.get<std::string>("mobile");
}

std::string Coach::email() const
{
    return this->m_model.get<std::string>("email");
}
