#include "user-profile.h"
#include "gateway.h"
#include "db-manager.h"
#include "entity-base.h"

// Default constructor
UserProfile::UserProfile():  EntityBase("userprofile"){
    
}

void UserProfile::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/user-profiles", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/user-profile", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/user-profile", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/user-profile", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/user-profile", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
UserProfile::~UserProfile() {
    // Destructor implementation, if needed
}