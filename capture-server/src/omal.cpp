#include "omal.h"
#include "gateway.h"
#include "omal-factory.h"
#include "virtual-host.h"
#include <functional>

// /Users/shreyapathak/mp4 dump
// /tmp/ovenmediaengine/vod_dumps
Omal::Omal() : EntityBase("omal")
{
    // Watch VOD dump folders when Omal object is created
    std::string vodDumpDir = "/tmp/ovenmediaengine/vod_dumps"; // Update this with the actual directory path
    auto vodDumpCallback = [this](const std::string &filename)
    {
        // Handle the VOD dump file change here
        // You can implement logic to respond to file changes, such as updating the list of VOD dumps
        std::cout << "VOD dump file changed: " << filename << std::endl;
    };

    // Create a Watcher instance to watch the VOD dump directory
    m_vodDumpWatcher = std::make_unique<Watcher>(vodDumpDir, vodDumpCallback);
    m_vodDumpWatcher->start(); // Start watching the directory
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

    Gateway::instance().route("GET", "/api/omal/app", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  Json::Value response = Json::objectValue;
                                  response["app"] = "spip";
                                  const auto &strResponse = Gateway::instance().formatResponse({{response}});
                                  rsp.setData(strResponse);
                              });

    // Implement route for Control Server
    Gateway::instance().route("POST", "/api/control-server",
                              [this](const Request &req, Response &rsp)
                              {
                                  handleControlServerRequest(req, rsp);
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

void Omal::handleControlServerRequest(const Request &req, Response &rsp)
{
    // Log the incoming request
    spdlog::trace("Incoming Control Server request:\n{}", req.data());

    // Construct the response JSON object with only the "allowed" field
    Json::Value jsonResponse;
    jsonResponse["allowed"] = true; // Set the "allowed" field to true

    // Set the response data directly as a boolean
    bool allowed = jsonResponse["allowed"].asBool();
    rsp.setData(allowed);
}


Omal::~Omal()
{
    // Stop the watcher when Omal object is destroyed
    if (m_vodDumpWatcher)
    {
        // Stop the watcher when Omal object is destroyed
        if (m_vodDumpWatcher)
        {
            m_vodDumpWatcher->stop();
        }
    }
}