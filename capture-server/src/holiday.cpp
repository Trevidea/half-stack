#include "holiday.h"
#include "gateway.h"
#include "omal-factory.h"
#include "virtual-host.h"

Holiday::Holiday() : EntityBase("holiday")
{
}

void Holiday::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/holidays", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  auto &om = OMALFactory::getInstance().create("host");
                                  auto dumps = om.getVODDumps();
                                  std::string strDumps;
                                  rsp.setData(strDumps);
                              });
    Gateway::instance().route("GET", "/api/holiday", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/holiday", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/holiday", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/holiday", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
std::vector<Holiday> Holiday::forPeriod(int year, const std::string &cat)
{
    char holidayQry[128] = {0};
    snprintf(holidayQry, 128, "year=%d&category='%s'", year, cat.c_str());
    return EntityBase::find<Holiday>(holidayQry);
}
Holiday::~Holiday()
{
}