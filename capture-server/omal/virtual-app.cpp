#include "virtual-app.h"
#include <filesystem>
#include <iostream>
#include <spdlog/spdlog.h>
#include <map>
#include "db-manager.h"
#include "client-factory.h"
#include "omal-exceptions.h"

namespace fs = std::filesystem;

VirtualApp::VirtualApp(const std::string &name, const std::string &vhost) : m_name(name), m_vhost{vhost}
{
}

Json::Value VirtualApp::deepFindOrCreate()
{
    Json::Value jsResult = Json::objectValue;
    jsResult["vapp-created"] = false;
    jsResult["vapp-existed"] = false;
    jsResult["vapp-error"] = "";
    jsResult["vapp-result"] = -1;
    char msg[256] = {'\0'};

    if (!deepFind(this->m_name))
    {
        int result = deepCreate(this->m_name, msg);
        if (result == 0)
        {
            jsResult["vapp-created"] = true;
            jsResult["vapp-existed"] = false;
        }
        else
        {
            jsResult["vapp-created"] = false;
        }
        jsResult["vapp-result"] = result;
    }
    else
    {
        jsResult["vapp-created"] = true;
        jsResult["vapp-existed"] = true;
        jsResult["vapp-result"] = 1;
    }
    jsResult["vapp-error"] = msg;

    return std::move(jsResult);
}

int VirtualApp::deepFind(const std::string &name)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps", baseUrl.c_str(), this->m_vhost.c_str());
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

int VirtualApp::deepCreate(const std::string &name, char *msg)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps", baseUrl.c_str(), this->m_vhost.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    std::string data = recipeVApp(name);
    int result = rest.post(data, pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    for (auto &&item : jsResult)
    {
        if (item["message"] == "OK")
        {
            result = 0;
            break;
        }
        result = -1;
    }
    return result;
}

std::vector<std::string> VirtualApp::getStreamsList()
{
    std::vector<std::string> list;

    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps/%s/streams", baseUrl.c_str(), this->m_vhost.c_str(), this->m_name.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    int result = rest.get(pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    Json::Value jsVHostArray = jsResult["response"];
    for (auto &&stream : jsVHostArray)
    {
        list.push_back(stream.asString());
    }
    return list;
}

Json::Value VirtualApp::getStreamInfo(const std::string &streamKey)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps/%s/streams/%s",
             baseUrl.c_str(), this->m_vhost.c_str(), this->m_name.c_str(), streamKey.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    int result = rest.get(pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    Json::Value jsStreamInfo = jsResult["response"];
    return std::move(jsStreamInfo);
}

std::vector<std::string> VirtualApp::getAll(const std::string &vhost)
{
    std::vector<std::string> appList;

    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps", baseUrl.c_str(), vhost.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    int result = rest.get(pass, fail, "drake", "drake_ome");
    if (result != 0)
        throw ExOMResourceAccessException(ep);

    Json::Value jsResult;
    Json::Reader().parse(pass, jsResult);
    Json::Value jsAppArray = jsResult["response"];
    for (const auto &app : jsAppArray)
    {
        appList.push_back(app.asString());
    }

    return appList;
}

void VirtualApp::startDump(const std::string &streamName, const std::string &streamId, const std::string &outPath, Json::Value &result)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps/%s/streams/%s:startHlsDump",
             baseUrl.c_str(), this->m_vhost.c_str(), this->m_name.c_str(), streamName.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;

    const std::string data = this->recipeStartDump(streamName, streamId, outPath);

    int intResult = rest.post(data, pass, fail, "drake", "drake_ome");
    if (intResult != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    result["result"] = jsResult["response"];
}

void VirtualApp::stopDump(const std::string &streamName, const std::string &streamId, Json::Value &result)
{
    char ep[128] = {'\0'};
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:8081/v1");
    snprintf(ep, 128, "%s/vhosts/%s/apps/%s/streams/%s:stopHlsDump",
             baseUrl.c_str(), this->m_vhost.c_str(), this->m_name.c_str(), streamName.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    std::string pass, fail;
    
    const std::string data = this->recipeStopDump(streamName, streamId);

    int intResult = rest.post(data, pass, fail, "drake", "drake_ome");
    if (intResult != 0)
        throw ExOMResourceAccessException(ep);
    Json::Value jsResult = Json::objectValue;
    Json::Reader().parse(pass, jsResult);
    result["result"] = jsResult["response"];
}
VirtualApp::~VirtualApp() {}