#include "omal-control-server.h"

namespace ControlServer
{
    void saveEventDeviceIPAdd(EventDevice &ed, const std::string &ipAdd)
    {
        ed.set(ipAdd, "ip_add");
        ed.update();
    }
    void handleControlServerRequest(const Request &req, Response &rsp)
    {
        Json::Value jsonResponse;
        jsonResponse["allowed"] = true;

        spdlog::trace("Incoming Control Server request:\n{}", req.data());

        Json::Value omRequest = req.json();

        const std::string strUrl = omRequest["request"]["url"].asString();
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

        spdlog::trace("control-server response: {}", Json::FastWriter().write(jsonResponse));
        rsp.setRawData(jsonResponse);
    }

    void handleIncomingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl)
    {
        spdlog::trace("control-server incoming");
        jsonResponse["allowed"] = false;

        std::regex urlPattern(R"(rtmp://([^/]+)/([^/]+)/([^/]+)/([^/]+))");
        std::smatch matches;

        if (std::regex_search(strUrl, matches, urlPattern))
        {
            spdlog::trace("control-server incoming url pattern matched: {}", matches.size());
            if (matches.size() == 5)
            {
                const std::string endPoint = matches[1].str();
                const std::string appName = matches[2].str();
                const std::string deviceId = matches[3].str();
                const std::string pin = matches[4].str();

                spdlog::trace("appName: {}, deviceId: {}, pin: {}", appName, deviceId, pin);

                char query[128] = {'\0'};
                snprintf(query, 128, "device_id=%s&pin='%s'&app_name='%s'",
                         deviceId.c_str(), pin.c_str(), appName.c_str());
                
                const auto result = EventDevice::find<EventDevice>(query);
                bool allowed = (result.size() > 0);
                if (allowed)
                {
                    const std::string streamName = result.front().streamName();
                    char newUrl[128] = {'\0'};
                    snprintf(newUrl, 128, "rtmp://%s/%s/%s", endPoint.c_str(), appName.c_str(), streamName.c_str());
                    jsonResponse["new_url"] = newUrl;
                    jsonResponse["allowed"] = true;
                    for (auto &&elem : result)
                    {
                        saveEventDeviceIPAdd(const_cast<EventDevice &>(elem), omRequest["client"]["address"].asString());
                    }
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

    void handleOutgoingControlServerRequest(const Json::Value &omRequest, Json::Value &jsonResponse, const std::string &strUrl)
    {
        std::regex urlPattern(R"(https://([^/]+)/([^/]+)/([^/]+)/?([^/]+))");
        spdlog::trace("control-server outgoing");
        jsonResponse["allowed"] = false;

        std::smatch matches;

        if (std::regex_search(strUrl, matches, urlPattern))
        {
            spdlog::trace("control-server outgoing url pattern matched: {}", matches.size());
            if (matches.size() == 5)
            {
                const std::string endPoint = matches[1].str();
                const std::string appName = matches[2].str();
                const std::string deviceId = matches[3].str();
                const std::string pin = matches[4].str();
                std::vector<std::string> querystring;
                su_split('=', querystring, pin);

                spdlog::trace("host: {}, port: {}, eventId: {}, userId: {}, pin: {}", endPoint, appName, deviceId, querystring[1]);

                char query[128] = {'\0'};
                snprintf(query, 128, "device_id=%s&pin='%s'&app_name='%s'",
                         deviceId.c_str(), querystring[1].c_str(), appName.c_str());
                const auto result = EventDevice::find<EventDevice>(query);
                bool allowed = (result.size() > 0);

                if (allowed)
                {
                    const std::string streamName = result.front().streamName();
                    char newUrl[128] = {'\0'};
                    snprintf(newUrl, 128, "https://%s/%s/%s/llhls.m3u8",
                             endPoint.c_str(), appName.c_str(), streamName.c_str());
                    jsonResponse["new_url"] = newUrl;
                    jsonResponse["allowed"] = true;
                    for (auto &&elem : result)
                    {
                        saveEventDeviceIPAdd(const_cast<EventDevice &>(elem), omRequest["client"]["address"].asString());
                    }
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

} // namespace ControlServer
