#include "distributions.h"
#include "gateway.h"
#include <sstream>
#include "spdlog/spdlog.h"

DistributionList::DistributionList() : EntityBase("distributions")
{
}

void DistributionList::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/distributions", // To request all distributions
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/distributions/{id}", // To request a single distribution
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });

    Gateway::instance().route("POST", "/api/distributions", // To insert a new distribution
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });

    Gateway::instance().route("PUT", "/api/distributions/{id}", // To update an existing distribution
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/distributions/{id}", // To delete a distribution
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}