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

<<<<<<< HEAD
void Omal::createVHost(const Request &req, Response &rsp)
{
    // Handle creating new VHost
    // Parse the request body and extract necessary information
    // Use the information to create a new VHost

    // Send appropriate response
    rsp.setData("New VHost created successfully.");
}

void Omal::report()
=======
void Omal::report() 
>>>>>>> 986748d51e66e89ff48ab42355a0e92af907ce42
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
<<<<<<< HEAD

=======
                              
>>>>>>> 986748d51e66e89ff48ab42355a0e92af907ce42
    Gateway::instance().route("GET", "/api/omal/app", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  Json::Value response = Json::objectValue;
                                  response["app"] = "spip";
                                  const auto &strResponse = Gateway::instance().formatResponse({{response}});
                                  rsp.setData(strResponse);
<<<<<<< HEAD
                              })
        // Add routes for creating new VHost and application
        Gateway::instance()
            .route("POST", "/api/create-vhost",
                   [this](const Request &req, Response &rsp)
                   {
                       this->createVHost(req, rsp);
                   });
=======
                              });

    // Implement route for Control Server
    Gateway::instance().route("POST", "/api/control-server", 
                              [this](const Request &req, Response &rsp)
                              {
                                  handleControlServerRequest(req, rsp);
                              });
}
>>>>>>> 986748d51e66e89ff48ab42355a0e92af907ce42

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

<<<<<<< HEAD
    Omal::~Omal()
=======
    rsp.setData(Json::FastWriter().write(jsonResults));
}

void Omal::handleControlServerRequest(const Request &req, Response &rsp)
{
    // Log the incoming request
    std::cout << "Incoming Control Server request:\n" << req.data() << std::endl;

    // Extract necessary data from the request
    std::string direction = req.json()["request"]["direction"].asString();
    std::string protocol = req.json()["request"]["protocol"].asString();
    std::string status = req.json()["request"]["status"].asString();
    std::string url = req.json()["request"]["url"].asString();
    std::string newUrl = req.json()["request"]["new_url"].asString();

    // Construct the client JSON object
    Json::Value clientJson;
    clientJson["address"] = req.json()["client"]["address"];
    clientJson["port"] = req.json()["client"]["port"];
    clientJson["user_agent"] = req.json()["client"]["user_agent"];

    // Construct the request JSON object
    Json::Value requestJson;
    requestJson["direction"] = direction;
    requestJson["protocol"] = protocol;
    requestJson["status"] = status;
    requestJson["url"] = url;
    requestJson["new_url"] = newUrl;
    requestJson["time"] = ""; // Add the current time here

    // Construct the complete JSON object
    Json::Value fullJson;
    fullJson["client"] = clientJson;
    fullJson["request"] = requestJson;

    // Log the full JSON object
    std::cout << "Full JSON request:\n" << Json::FastWriter().write(fullJson) << std::endl;

    // Construct the response based on the AdmissionWebhooks documentation
    Json::Value jsonResponse;
    if (status == "closing") {
        jsonResponse["allowed"] = true; // Or false based on your logic
    } else {
        jsonResponse["allowed"] = true; // Or false based on your logic
    }

    // Log the response
    std::cout << "Outgoing Control Server response:\n" << Json::FastWriter().write(jsonResponse) << std::endl;

    // Set the response data
    rsp.setData(Json::FastWriter().write(jsonResponse));

    // Send the response to the control server
    std::string controlServerUrl = "https://drake.in:1437/api/control-server";
}

Omal::~Omal()
{
    // Stop the watcher when Omal object is destroyed
    if (m_vodDumpWatcher)
>>>>>>> 986748d51e66e89ff48ab42355a0e92af907ce42
    {
        // Stop the watcher when Omal object is destroyed
        if (m_vodDumpWatcher)
        {
            m_vodDumpWatcher->stop();
        }
    }