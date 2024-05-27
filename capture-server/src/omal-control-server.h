#ifndef CONTROLSERVER_H
#define CONTROLSERVER_H

#include <string>
#include <regex>
#include <json/json.h>
#include <spdlog/spdlog.h>
#include "request.h"
#include "response.h"
#include "event-device.h"
#include "half-stack-exceptions.h"

namespace ControlServer
{
    void saveEventDeviceIPAdd(EventDevice &ed, const std::string &ipAdd);
    void handleControlServerRequest(const Request &req, Response &rsp);
    void handleIncomingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl);
    void handleOutgoingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl);
}

#endif // CONTROLSERVER_H
