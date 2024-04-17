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
                                  const auto &strResponse = Gateway::instance().formatResponse({dumps});
                                  rsp.setData(strResponse);
                              });

    Gateway::instance().route("GET", "/api/omal/network-quality-assessment", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->assessNetworkQuality(req, rsp);
                              });
}

void Omal::assessNetworkQuality(const Request &req, Response &rsp)
{
    // Perform network quality assessment
    std::vector<NetworkQualityAssessmentResult> results = NetworkQualityAssessment::assess();

    // Convert assessment results to JSON and set it as response data
    Json::Value jsonResults;
    for (const auto &result : results)
    {
        Json::Value jsonResult;
        jsonResult["latency"] = result.latency;
        jsonResult["jitter"] = result.jitter;
        jsonResult["packetLoss"] = result.packetLoss;
        jsonResult["bandwidth"] = result.bandwidth;
        jsonResult["quality"] = result.quality;
        jsonResults.append(jsonResult);
    }

    rsp.setData(Json::FastWriter().write(jsonResults));
}

Omal::~Omal()
{
}