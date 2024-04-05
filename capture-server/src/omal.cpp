#include "omal.h"
#include "gateway.h"
#include "omal-factory.h"
#include "virtual-host.h"

Omal::Omal() : EntityBase("omal")
{
}

void Omal::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/omal/vod-dumps", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  auto &om = OMALFactory::getInstance().create("spip");
                                  auto dumps = om.getVODDumps();
                                  const auto & strResponse = Gateway::instance().formatResponse({dumps});
                                  rsp.setData(strResponse);
                              });
}

Omal::~Omal()
{
}