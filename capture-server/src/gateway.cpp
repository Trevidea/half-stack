#include "gateway.h"
#include "employee.h"
#include "config.h"
#include "holiday.h"
#include "spdlog/spdlog.h"
#include "metatype.h"
#include "event.h"
#include "omal.h"
#include "on-demand-event.h"
#include "user-profile.h"
#include "event-preview.h"
#include "streaming-device.h"
#include <vector>
#include <map>
#include <json/json.h>

Gateway::Gateway()
{
}

void Gateway::init()
{
    spdlog::trace("Registering handlers..");
    this->m_entities.push_back(new Employee());
    this->m_entities.push_back(new Config());
    this->m_entities.push_back(new Holiday());
    this->m_entities.push_back(new Omal());
    this->m_entities.push_back(new MetaType());
    this->m_entities.push_back(new Event());
    this->m_entities.push_back(new UserProfile());
    this->m_entities.push_back(new EventPreview());
    this->m_entities.push_back(new StreamingDevice());
    for (auto &&e : this->m_entities)
    {
        e->report();
    }
}
std::string Gateway::flatten(std::string method, const std::string path)
{
    return method.append(path);
}

void Gateway::route(const std::string &method, const std::string &path, const std::function<void(const Request &, Response &)> &handler)
{
    std::string key = this->flatten(method, path);
    this->m_handlers[key] = handler;
    spdlog::trace("handler registered for...{}", key);
}

// UNIT TEST THIS
Response &Gateway::request(std::string method, const std::string &path, const std::string &query, const std::string &data)
{
    std::cout << "request received.." << std::endl;
    Response r;
    int x = r.id();
    this->m_reg[x] = std::move(r);

    std::string key = this->flatten(method, path);

    spdlog::trace("\n\tmethod:{}\n\tpath:{}\n\tquery:{}\n\tdata:{}", method, path, query, data);

    auto &&handler = this->m_handlers[key];
    if (handler)
    {
        std::cout << "handler found for:" << key << std::endl;
        try
        {
            handler(Request(query, data), this->m_reg[x]);
        }
        catch (const std::exception &e)
        {
            spdlog::error("Error handlingf request, {}", e.what());
            Json::Value errJs = Json::objectValue;
            errJs["error"] = e.what();
            this->m_reg[x].setData(Json::FastWriter().write(errJs));
        }
        return this->m_reg[x];
    }
    else
        throw ExHandlerNotFound();
}

std::string Gateway::formatResponse(const std::vector<std::vector<Json::Value>> &data)
{
    Json::Value root; // = Json::objectValue;
    std::vector<Json::Value> results;
    for (auto &&c = data.begin(); c != data.end(); ++c) // ROWS
    {
        results.push_back(Json::arrayValue);
        Json::Value &row = results.back();
        for (auto &&r : *c) // COLUMNS
        {
            row.append(r);
        }
    }
    root["count"] = static_cast<int>(results.size());
    root["result"] = Json::Value{Json::arrayValue};
    std::for_each(results.begin(), results.end(), [&root](Json::Value &val)
                  { root["result"].append(val); });
    return Json::FastWriter().write(root);
}
std::string Gateway::formatResponse(const std::vector<std::map<std::string, std::string>> &data)
{
    Json::Value root; // = Json::objectValue;
    std::vector<Json::Value> results;
    for (auto &&c = data.begin(); c != data.end(); ++c) // ROWS
    {
        results.push_back(Json::arrayValue);
        Json::Value &row = results.back();
        for (auto &&r : *c) // COLUMNS
        {
            Json::Value obj = Json::objectValue;
            obj[r.first] = r.second;
            row.append(obj);
        }
    }
    root["count"] = static_cast<int>(results.size());
    root["result"] = Json::Value{Json::arrayValue};
    std::for_each(results.begin(), results.end(), [&root](Json::Value &val)
                  { root["result"].append(val); });
    return Json::FastWriter().write(root);
}
Gateway::~Gateway(){};