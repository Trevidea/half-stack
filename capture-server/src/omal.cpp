#include "omal.h"
#include "gateway.h"
#include <functional>
#include <regex>
#include "event-device.h"
#include <vector>
#include "virtual-host.h"
#include "virtual-app.h"
#include "stringutils.h"
#include "omal-control-server.h"

Omal::Omal() : EntityBase("omal")
{
    // // Watch VOD dump folders when Omal object is created
    // std::string vodDumpDir = "/tmp/ovenmediaengine/vod_dumps"; // Update this with the actual directory path
    // auto vodDumpCallback = [this](const std::string &filename)
    // {
    //     // Handle the VOD dump file change here
    //     // You can implement logic to respond to file changes, such as updating the list of VOD dumps
    //     std::cout << "VOD dump file changed: " << filename << std::endl;
    // };

    // // Create a Watcher instance to watch the VOD dump directory
    // m_vodDumpWatcher = std::make_unique<Watcher>(vodDumpDir, vodDumpCallback);
    // m_vodDumpWatcher->start(); // Start watching the directory
}

void Omal::report()
{
    EntityBase::report();
    Gateway::instance().route("POST", "/api/omal/create-vhost",
                              [this](const Request &req, Response &rsp)
                              {
                                  auto &vh = OMALFactory::getInstance().create("spip");
                                  auto result = vh.deepFindOrCreate();

                                  auto strResponse = Gateway::instance().formatResponse({{result}});
                                  rsp.setData(strResponse);
                              });
    Gateway::instance().route("GET", "/api/omal/virtual-hosts",
                              [this](const Request &req, Response &rsp)
                              {
                                  // Call getAll() function from VirtualHost class
                                  VirtualHost vh;
                                  std::vector<std::string> virtualHosts = vh.getAll();

                                  // Convert the result to JSON
                                  Json::Value jsonResponse(Json::arrayValue);
                                  for (const auto &host : virtualHosts)
                                  {
                                      jsonResponse.append(host);
                                  }

                                  // Set the JSON response
                                  rsp.setData(Json::FastWriter().write(jsonResponse));
                              });
    Gateway::instance().route("POST", "/api/omal/create-app",
                              [this](const Request &req, Response &rsp)
                              {
                                  auto &vh = OMALFactory::getInstance().create("spip");

                                  const auto &jsReq = req.json();
                                  std::string appName = jsReq["app-name"].asString();

                                  std::stringstream ss;
                                  ss << appName;
                                  Json::Value result = Json::objectValue;
                                  vh.createApp(ss.str(), result);
                                  auto strResponse = Gateway::instance().formatResponse({{result}});
                                  rsp.setData(strResponse);
                              });
    Gateway::instance().route("GET", "/api/omal/apps",
                              [this](const Request &req, Response &rsp)
                              {
                                  std::string vhost = req.getQueryValue("vhost");
                                  std::vector<std::string> appList = VirtualApp::getAll(vhost);

                                  // Format the response
                                  Json::Value jsonResponse;
                                  jsonResponse["applications"] = Json::arrayValue;
                                  for (const auto &app : appList)
                                  {
                                      jsonResponse["applications"].append(app);
                                  }

                                  rsp.setData(Json::FastWriter().write(jsonResponse));
                              });
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
    Gateway::instance().route("DELETE", "/api/omal/app", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  std::string appName = req.json()["app-name"].asString();
                                  Json::Value response = Json::objectValue;
                                  auto &om = OMALFactory::getInstance().create("spip");
                                  om.deleteApp(appName, response);

                                  const auto &strResponse = Gateway::instance().formatResponse({{response}});
                                  rsp.setData(strResponse);
                              });
    Gateway::instance().route("GET", "/api/omal/streams-list", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  const auto eventId = req.getQueryValue("event-id");
                                  const std::vector<std::string> list = this->fetchStreamsList(eventId);
                                  Json::Value resp = Json::arrayValue;
                                  for (auto &&stream : list)
                                  {
                                      resp.append(Json::Value(stream));
                                  }
                                  rsp.setData(Gateway::instance().formatResponse({{resp}}));
                              });
    Gateway::instance().route("POST", "/api/omal/stream-info", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  const auto data = req.json();
                                  const std::string eventId = data["event-id"].asString();
                                  const std::string streamKey = data["stream-key"].asString();

                                  const auto info = this->fetchStreamInfo(eventId, streamKey);
                              });
    // Implement route for Control Server
    Gateway::instance().route("POST", "/api/omal/control-server",
                              [this](const Request &req, Response &rsp)
                              {
                                ControlServer::handleControlServerRequest(req, rsp);
                              });
    // Implement route for Control Server
    Gateway::instance().route("POST", "/api/omal/stop-dump",
                              [this](const Request &req, Response &rsp)
                              {
                                  const auto data = req.json();
                                  std::string appName = data["app-name"].asString();
                                  std::string streamName = data["stream-name"].asString();
                                  std::string streamId = data["stream-id"].asString();
                                  auto &vh = OMALFactory::getInstance().create("spip");
                                  Json::Value result = Json::objectValue;
                                  auto va = vh.createApp(appName, result);
                                  va.stopDump(streamName, streamId, result);
                                  rsp.setData(Gateway::instance().formatResponse({{result}}));
                              });
    Gateway::instance().route("POST", "/api/omal/start-dump",
                              [this](const Request &req, Response &rsp)
                              {
                                  const auto data = req.json();
                                  std::string appName = data["app-name"].asString();
                                  std::string streamName = data["stream-name"].asString();
                                  std::string streamId = data["stream-id"].asString();
                                  std::string outPath = data["out-path"].asString();
                                  auto &vh = OMALFactory::getInstance().create("spip");
                                  Json::Value result = Json::objectValue;
                                  auto va = vh.createApp(appName, result);
                                  va.startDump(streamName, streamId, outPath, result);
                                  rsp.setData(Gateway::instance().formatResponse({{result}}));
                              });
}

std::vector<std::string> Omal::fetchStreamsList(const std::string &eventId)
{
    auto vhost = OMALFactory::getInstance().create("spip");
    Json::Value result = Json::objectValue;
    auto app = vhost.createApp(eventId, result, true);
    return app.getStreamsList();
}

Json::Value Omal::fetchStreamInfo(const std::string &eventId, const std::string &streamKey)
{
    auto vhost = OMALFactory::getInstance().create("spip");
    Json::Value result = Json::objectValue;
    auto app = vhost.createApp(eventId, result, true);
    return app.getStreamInfo(streamKey);
}

void Omal::openPreview(const Request &req, Response &rsp)
{
    const auto &jsRequest = req.json();
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
