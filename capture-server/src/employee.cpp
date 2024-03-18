#include "employee.h"
#include "gateway.h"
#include "datetimeutils.h"
#include "holiday.h"

Employee::Employee() : EntityBase("employee")
{
}

void Employee::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/employees", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/employee", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/employee", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/employee", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/employee", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
Employee::~Employee()
{
}