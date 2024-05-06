#include "virtual-host.h"
#include <filesystem>
#include <iostream>
#include <spdlog/spdlog.h>
#include <map>
#include "db-manager.h"
#include "client-factory.h"
#include "omal-exceptions.h"

namespace fs = std::filesystem;

VirtualHost::VirtualHost(const std::string &name, const omal::vhost &vhost) : m_name(name),
                                                                              m_vhost(vhost),
                                                                              m_dumpsBaseLocation{DUMPS_BASE_LOCATION}
{
}
Json::Value VirtualHost::deepCreate()
{
    Json::Value jsResult = Json::objectValue;
    jsResult["created"] = false;
    jsResult["existed"] = false;
    jsResult["error"] = "";
    jsResult["result"] = -1;
    char msg[256] = {'\0'};

    if (!deepFind(this->m_name))
    {
        int result = deepCreate(this->m_name, msg);
        if (result == 0)
        {
            jsResult["created"] = true;
            jsResult["existed"] = false;
        }
        else
        {
            jsResult["created"] = false;
        }
        jsResult["result"] = result;
    }
    else
    {
        jsResult["created"] = true;
        jsResult["existed"] = true;
        jsResult["result"] = 1;
    }
    jsResult["error"] = msg;

    return std::move(jsResult);
}

int VirtualHost::deepFind(const std::string &name)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts", baseUrl.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    int result = rest.get(pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    Json::Value jsVHostArray = jsResult["response"];
    const auto &item = std::find_if(jsVHostArray.begin(), jsVHostArray.end(), [&name](const Json::Value &item)
                                    { 
                                        spdlog::trace("std::find_if item is..{}", item.asString()); 
                                        return item.asString() == name; });
    if (item != jsVHostArray.end())
        return ++result;
    else
        return result;
}
int VirtualHost::deepCreate(const std::string &name, char *msg)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts", baseUrl.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    std::string data = recipeVHost(name);
    int result = rest.post(data, pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    Json::Value jsVHostArray = jsResult["response"];
    const auto &item = std::find_if(jsVHostArray.begin(), jsVHostArray.end(), [&name](const Json::Value &item)
                                    { 
                                        spdlog::trace("std::find_if item is..{}", item.asString()); 
                                        return item.asString() == name; });
    if (item != jsVHostArray.end())
        return ++result;
    else
        return result;
}
std::string VirtualHost::createStream(const std::string &app, const std::string &key, const OutputProfile &profile)
{
    return "";
}
std::map<std::string, std::string> VirtualHost::getVODDumps()
{
    std::map<std::string, std::string> dumps;
    try
    {
        for (const auto &entry : fs::directory_iterator(this->m_dumpsBaseLocation))
        {
            if (fs::is_directory(entry.path()))
            {
                const auto startsWith = entry.path().filename().generic_string().substr(0, this->m_name.size());
                if (startsWith == this->m_name)
                {
                    dumps.insert({entry.path().generic_string(), entry.path().filename()});
                }
            }
        }
    }
    catch (const std::exception &e)
    {
        spdlog::error("Error getting VOD dumps location: {}", e.what());
    }
    return dumps;
}

void VirtualHost::setVODDumps(const std::string &streamName, const std::string &relativeOutputPath)
{
}