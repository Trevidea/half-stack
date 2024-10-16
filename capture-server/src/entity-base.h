#ifndef ENTITYBASE_H
#define ENTITYBASE_H
#include <iostream>
#include "request.h"
#include "response.h"
#include "json/json.h"
#include <vector>
#include "model.h"
#include "sqlhelper.h"
#include "handler.h"
#include "pgresult.h"
#include <tuple>
#include "half-stack-exceptions.h"
#include "data-set.h"

class EntityBase : public Handler
{

    friend class Event;
    friend class Device;
    friend class EventConnection;
    friend class EventDevice;
    friend class EventManager;
    friend class PastEvent;
    friend class Player;

private:
    std::string executeSqlStr(const std::string &sql);
    Json::Value executeSqlJson(const std::string &sql);
    PGResult executeSqlModel(const std::string &sql);
    std::string m_entity;
    EntityBase(const Model &model);
    Json::Value schemaJson();


    template <typename T = std::string>
    void setColumn(Json::Value &column, Json::Value &field, const std::string &tp, const T *value = nullptr)
    {
        column["field"] = field;
        if ((tp == "bigint") || (tp == "integer"))
        {
            column["type"] = 0;
            if (value)
                column["value"] = value;
            else
                column["value"] = 0;
        }
        else if ((tp == "date") || (tp == "timestamp without time zone"))
        {
            column["type"] = 4;
            if (value)
                column["value"] = value;
            else
                column["value"] = "2000-11-01";
        }
        else if (tp == "character varying")
        {
            column["type"] = 1;
            if (value)
                column["value"] = value;
            else
                column["value"] = "var-char";
        }
        else if (tp == "boolean")
        {
            column["type"] = 3;
            if (value)
                column["value"] = value;
            else
                column["value"] = true;
        }
        else if (tp == "jsonb")
        {
            column["type"] = 5;
            if (value)
                column["value"] = value;
            else
                column["value"] = true;
        }
        else
        {
            column["type"] = 1;
            if (value)
                column["value"] = value;
            else
                column["value"] = "Unknown";
        }
        spdlog::trace("setColumn().column..{}", Json::FastWriter().write(column));
    }

protected:
    void list(const Request &request, Response &response);
    void find(const Request &request, Response &response);
    void view(const Request &request, Response &response, const std::string &view);
    DataSet  view(const std::string &view, const std::string &query);
    void function(const Request &request, Response &response, const std::string &func);
    Json::Value function(const std::string &funcName, const std::string &params);
    Json::Value create(const Request &request, Response &response);
    Json::Value update(const Request &request, Response &response);
    Json::Value remove(const Request &request, Response &response);
    void schema(const Request &request, Response &response);
    void postTemplate(const Request &request, Response &response);
    void sync(const Request &req, Response &rsp);
    
    template<class T>
    static T byId(const int id)
    {
        char crit[128] = {'\0'};
        snprintf(crit, 128, "id = %d", id);
        
        const auto result = EntityBase::find<T>(crit);

        if(result.size() <= 0)
            throw ExModelNotFoundException(T().entity(), id);

        return result[0];
    }

    virtual std::string entity();
    Model m_model;
    Model m_setModel;

public:
    EntityBase(const std::string &entity);

    int id() const
    {
        return this->m_model.get<int>("id");
    }
    bool notSet() const;

    std::string getAsString(const std::string &field) const
    {
        return this->m_model.get<std::string>(field);
    }

    int getAsInt(const std::string &field) const
    {
        return this->m_model.get<int>(field);
    }

    double getAsDouble(const std::string &field) const
    {
        return this->m_model.get<double>(field);
    }
    void report() override;

    template <typename T = EntityBase>
    static std::vector<T> list()
    {
        auto typeInstance = T();
        const std::string jsonString = SqlHelper::JsonStub(typeInstance.entity());
        Json::Value parsedJson;
        Json::Reader reader;
        reader.parse(jsonString, parsedJson);
        const auto sql = SqlHelper::ScriptSelect(parsedJson);
        auto result = typeInstance.executeSqlModel(sql);
        std::vector<T> models;
        for (auto &&model : result.models())
        {
            models.push_back(T());
            auto &last = models.back();
            last.m_model = model;
        }
        return models;
    }

    template <typename T = EntityBase>
    static std::vector<T> find(const std::string &queryString)
    {
        auto typeInstance = T();
        const std::string jsonString = SqlHelper::JsonStub(typeInstance.entity());
        std::vector<query> queries;
        std::vector<std::string> qstrs;
        su_split('&', qstrs, queryString);
        for (auto &&q : qstrs)
        {
            queries.push_back(query(q));
        }

        Json::Value parsedJson;
        Json::Reader reader;
        reader.parse(jsonString, parsedJson);
        for (auto &&qry : queries)
        {
            auto &js = parsedJson["criteria"];
            Json::Value crt = Json::objectValue;
            crt["field"] = qry.m_operand1;
            crt["value"] = qry.m_operand2;
            js.append(crt);
        }

        const auto sql = SqlHelper::ScriptSelect(parsedJson);

        auto result = typeInstance.executeSqlModel(sql);
        std::vector<T> models;
        spdlog::trace("models::{}", models.size());
        for (auto &&model : result.models())
        {
            models.push_back(T());
            auto &last = models.back();
            last.m_model = model;
        }
        return models;
    }
    template <typename T = EntityBase>
    static std::vector<T> remove(const std::string &queryString)
    {
        auto typeInstance = T();
        const std::string jsonString = SqlHelper::JsonStub(typeInstance.entity());
        std::vector<query> queries;
        std::vector<std::string> qstrs;
        su_split('&', qstrs, queryString);
        for (auto &&q : qstrs)
        {
            queries.push_back(query(q));
        }

        Json::Value parsedJson;
        Json::Reader reader;
        reader.parse(jsonString, parsedJson);
        for (auto &&qry : queries)
        {
            auto &js = parsedJson["criteria"];
            Json::Value crt = Json::objectValue;
            crt["field"] = qry.m_operand1;
            crt["value"] = qry.m_operand2;
            js.append(crt);
        }

        const auto sql = SqlHelper::ScriptRemove(parsedJson);

        auto result = typeInstance.executeSqlModel(sql);
        std::vector<T> models;
        spdlog::trace("models::{}", models.size());
        for (auto &&model : result.models())
        {
            models.push_back(T());
            auto &last = models.back();
            last.m_model = model;
        }
        return models;
    }

    template <typename T>
    void set(T val, const std::string &prop)
    {
        this->m_setModel.set(val, std::move(prop));
    }
    void merge();
    void save();
    void update();
    ~EntityBase();
    std::string toString() const
    {
        return this->m_model.toString();
    }

    class LogPrinter
    {
    public:
        void setPrintSqlOn();
        ~LogPrinter();
    };
    static LogPrinter logOptions()
    {
        return LogPrinter();
    }

};

#endif // ENTITYBASE_H