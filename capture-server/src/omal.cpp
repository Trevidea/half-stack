#include "omal.h"
#include "gateway.h"
#include <functional>
#include <regex>
#include "event-device.h"
#include <vector>
#include "virtual-host.h"
#include "virtual-app.h"

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
                                  handleControlServerRequest(req, rsp);
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

/*
POST /configured/target/url/ HTTP/1.1
Content-Length: 325
Content-Type: application/json
Accept: application/json
X-OME-Signature: f871jd991jj1929jsjd91pqa0amm1
{
  "client":
  {
    "address": "211.233.58.86",
    "port": 29291,
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  },
  "request":
  {
    "direction": "incoming | outgoing",
    "protocol": "webrtc | rtmp | srt | llhls | thumbnail",
    "status": "opening | closing",
    "url": "scheme://host[:port]/app/stream/file?query=value&query2=value2",
    "new_url": "scheme://host[:port]/app/new_stream/file?query=value&query2=value2",
    "time": ""2021-05-12T13:45:00.000Z"
  }
}
*/

void Omal::saveEventDeviceIPAdd(EventDevice &ed, const std::string &ipAdd)
{
    ed.setIpAdd(ipAdd);
    ed.update();
}

void Omal::handleControlServerRequest(const Request &req, Response &rsp)
{
    Json::Value jsonResponse;
    jsonResponse["allowed"] = false;

    spdlog::trace("Incoming Control Server request:\n{}", req.data());

    Json::Value omRequest = req.json();

    const std::string strUrl = omRequest["request"]["url"].asString();
    // std::regex urlPattern(R"(rtmp://([^/]+)/([^/]+)/([^/]+)/([^/]+)/)");
    const std::string direction = omRequest["request"]["direction"].asString();
    spdlog::trace("control-server request direction: {}", direction);
    if (direction == "incoming")
    {
        handleIncomingControlServerRequest(omRequest, jsonResponse, strUrl);
    }
    else if (direction == "outgoing")
    {
        handleOutgoingControlServerRequest(omRequest, jsonResponse, strUrl);
    }

    rsp.setRawData(jsonResponse);
}

void Omal::handleIncomingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl)
{
    std::regex urlPattern(R"(rtmp://([^/]+)/([^/]+)/([^/]+)/([^/]+))");
    spdlog::trace("control-server incoming");
    std::smatch matches; // Used to store the results of the match

    if (std::regex_search(strUrl, matches, urlPattern))
    {
        spdlog::trace("control-server incoming url pattern matched: {}", matches.size());
        if (matches.size() == 5) // Change to 5, as there are 5 capturing groups
        {
            const std::string endPoint = matches[1].str();
            const std::string eventId = matches[2].str();
            const std::string deviceId = matches[3].str();
            const std::string pin = matches[4].str();

            spdlog::trace("eventId: {}, userId: {}, pin: {}", eventId, deviceId, pin);

            EventDevice ed;
            char query[128] = {'\0'};
            snprintf(query, 128, "device_id=%s&event_id=%d&pin='%s'",
                     deviceId.c_str(), 188, pin.c_str());
            const auto result = ed.find<EventDevice>(query);
            bool allowed = (result.size() > 0);
            if (allowed)
            {
                const std::string streamName = result.front().streamName();
                char newUrl[128] = {'\0'};
                snprintf(newUrl, 128, "rtmp://%s/%s/%d", endPoint.c_str(), "shreyaapp", 11);
                jsonResponse["new_url"] = newUrl;
                jsonResponse["allowed"] = true;
                // for (auto &&elem : result)
                // {
                //     saveEventDeviceIPAdd(const_cast<EventDevice&>(elem), omRequest["client"]["address"].asString());
                // }
            }
            else
            {
                spdlog::warn("The incoming stream {} was rejected.", strUrl);
            }
        }
        else
        {
            throw ExInvalidUrlException(strUrl);
        }
    }
    else
    {
        throw ExInvalidUrlException(strUrl);
    }
}

void Omal::handleOutgoingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl)
{
    std::regex urlPattern(R"(rtmp://([^/]+)/([^/]+)/([^/]+)/([^/]+))");
    spdlog::trace("control-server outgoing");

    std::smatch matches; // Used to store the results of the match

    if (std::regex_search(strUrl, matches, urlPattern))
    {
        spdlog::trace("control-server incoming url pattern matched: {}", matches.size());
        if (matches.size() == 5)
        {
            const std::string host = matches[1].str();
            const std::string port = "3334"; // Assuming port for HTTPS is 3334
            const std::string eventId = matches[2].str();
            const std::string userId = matches[3].str();
            const std::string pin = matches[4].str();

            spdlog::trace("host: {}, port: {}, eventId: {}, userId: {}, pin: {}", host, port, eventId, userId, pin);

            // Construct HTTPS link for the player
            std::string playerLink = "https://" + host + ":" + port + "/" + "shreyaapp" + "/" + userId + "/" + pin;

            // Set the player link in the JSON response
            jsonResponse["player_link"] = playerLink;
            jsonResponse["allowed"] = true; // Assuming all outgoing requests are allowed
        }
        else
        {
            throw ExInvalidUrlException(strUrl);
        }
    }
    else
    {
        throw ExInvalidUrlException(strUrl);
    }
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
