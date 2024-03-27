#include "team.h"
#include "gateway.h" // Assuming this includes definitions for Gateway
#include "json/json.h"

Team::Team() : EntityBase("team") {}

void Team::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/teams", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
}
