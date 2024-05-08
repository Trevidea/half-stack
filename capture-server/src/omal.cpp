#include "omal.h"
#include "gateway.h"
#include "omal-factory.h"
#include "virtual-host.h"
#include <functional>
#include <regex>
#include "event-device.h"
#include <vector>

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
    Gateway::instance().route("POST", "/api/omal/create-app",
                              [this](const Request &req, Response &rsp)
                              {
                                  auto &vh = OMALFactory::getInstance().create("spip");

                                  const auto &jsReq = req.json();
                                  int eventId = jsReq["eventId"].asInt();

                                  std::stringstream ss;
                                  ss << eventId;
                                  Json::Value result = Json::objectValue;
                                  vh.createApp(ss.str(), result);
                                  auto strResponse = Gateway::instance().formatResponse({{result}});
                                  rsp.setData(strResponse);
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
    Gateway::instance().route("GET", "/api/omal/app", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  Json::Value response = Json::objectValue;
                                  response["app"] = "spip";
                                  const auto &strResponse = Gateway::instance().formatResponse({{response}});
                                  rsp.setData(strResponse);
                              });
    Gateway::instance().route("GET", "/api/omal/streams-list", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  const auto eventId = req.getQueryValue("event-id");
                                  const std::vector<const std::string> list = this->fetchStreamsList(eventId);
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
}
std::vector<const std::string> Omal::fetchStreamsList(const std::string &eventId)
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
void Omal::handleControlServerRequest(const Request &req, Response &rsp)
{
    Json::Value jsonResponse;
    jsonResponse["allowed"] = false;

    spdlog::trace("Incoming Control Server request:\n{}", req.data());

    Json::Value omRequest = req.json();

    const std::string strUrl = omRequest["request"]["url"].asString();
    std::regex urlPattern(R"(rtmp://[^/]+/([^/]+)/([^/]+)/([^/]+)/)");

    std::smatch matches; // Used to store the results of the match

    if (std::regex_search(strUrl, matches, urlPattern))
    {
        if (matches.size() == 4)
        {
            const std::string eventId = matches[1].str();
            const std::string userId = matches[2].str();
            const std::string pin = matches[3].str();

            spdlog::trace("eventId: {}, userId: {}, pin: {}", eventId, userId, pin);

            EventDevice ed;
            char query[128] = {'\0'};
            snprintf(query, 128, "user_id=%s&event_id=%s&pin='%s'",
                     userId.c_str(), eventId.c_str(), pin.c_str());
            const auto result = ed.find<EventDevice>(query);
            jsonResponse["allowed"] = (result.size() > 0);
        }
        else
        {
            // throw invalid url exception
            throw ExInvalidUrlException(strUrl);
        }
    }
    else
    {
        // throw invalid url exception
<<<<<<< HEAD
=======
        throw ExInvalidUrlException(strUrl);
        spdlog::trace("No match found");
>>>>>>> 1500a11d9fec8a3b2cbf9016bd6f3ad99c6eb540
    }

    rsp.setRawData(jsonResponse);
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