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

// Forward declaration of OnDemandEvent
class OnDemandEvent;

class EntityBase : public Handler
{
private:
    std::string executeSqlStr(const std::string &sql);
    Json::Value executeSqlJson(const std::string &sql);
    PGResult executeSqlModel(const std::string &sql);
    std::string m_entity;
    EntityBase(const Model &model);
    Json::Value schemaJson();

    // Declare OnDemandEvent as a friend class
    friend class OnDemandEvent;

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
    void function(const Request &request, Response &response, const std::string &func);
    Json::Value function(const std::string &funcName, const std::string &params);
    Json::Value create(const Request &request, Response &response);
    Json::Value update(const Request &request, Response &response);
    Json::Value remove(const Request &request, Response &response);
    void schema(const Request &request, Response &response);
    void postTemplate(const Request &request, Response &response);
    void sync(const Request &req, Response &rsp);
    virtual std::string entity();
    Model m_model;
    Model m_setModel;
    int executeSqlAndGetId(const std::string &sql);

public:
    EntityBase(const std::string &entity);

    // New public method to execute SQL query
    void executeSql(const std::string &sql)
    {
        executeSqlStr(sql);
    }

    int id() const
    {
        return this->m_model.get<int>("id");
    }
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
    void set(const std::string &prop, T val)
    {
        this->m_setModel.set(prop, val);
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

    // Serialize the current object to a JSON string
    std::string serializeToJson() const;

    // Deserialize from a JSON string and update the current object
    void deserializeFromJson(const std::string &jsonString);
};

#endif // ENTITYBASE_H