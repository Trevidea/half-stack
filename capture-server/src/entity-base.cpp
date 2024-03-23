#include "entity-base.h"
#include "sqlhelper.h"
#include "db-manager.h"
#include "spdlog/spdlog.h"
#include "gateway.h"
#include "model.h"

/// @brief 
/// @param model 
EntityBase::EntityBase(const Model &model) : m_model{model}
{
}
/// @brief 
/// @param entity 
EntityBase::EntityBase(const std::string &entity) : m_entity{entity}
{
}
/// @brief 
void EntityBase::report()
{
    char schemaUrl[128] = {0};
    snprintf(schemaUrl, 128, "/api/%s/schema", this->entity().c_str());
    Gateway::instance().route("GET", schemaUrl, // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->schema(req, rsp);
                              });

    char templateUrl[128] = {0};
    snprintf(templateUrl, 128, "/api/%s/template", this->entity().c_str());
    Gateway::instance().route("GET", templateUrl, // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->postTemplate(req, rsp);
                              });
}
/// @brief 
/// @param funcName 
/// @param params 
/// @return 
Json::Value EntityBase::function(const std::string& funcName, const std::string &params)
{
    char functionQry[128] = {0};
    snprintf(functionQry, 128, "SELECT * FROM %s(%s)", funcName.c_str(), params.c_str());
    spdlog::debug("Function..{}", functionQry);
    return this->executeSqlJson(functionQry);
}
EntityBase::~EntityBase()
{
}
/// @brief 
/// @return 
std::string EntityBase::entity()
{
    return m_entity;
}
/// @brief 
/// @param sql 
/// @return 
std::string EntityBase::executeSqlStr(const std::string &sql)
{
    auto &&connection = DBManager::instance().getConnection();
    connection.execute(sql);
    Json::FastWriter fastWriter;
    auto &&js = connection.result().root();
    return fastWriter.write(js);
}
/// @brief 
/// @param sql 
/// @return 
Json::Value EntityBase::executeSqlJson(const std::string &sql)
{
    auto &&connection = DBManager::instance().getConnection();
    connection.execute(sql);
    return connection.result().root();
}

/// @brief 
/// @param sql 
/// @return 
PGResult EntityBase::executeSqlModel(const std::string &sql)
{
    auto &&connection = DBManager::instance().getConnection();
    connection.execute(sql);
    return connection.data();
}
/// @brief 
/// @param request 
/// @param response 
void EntityBase::list(const Request &request, Response &response)
{
    const std::string jsonString = SqlHelper::JsonStub(this->entity());
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptSelect(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
}
/// @brief 
/// @param request 
/// @param response 
void EntityBase::find(const Request &request, Response &response)
{
    const std::string jsonString = SqlHelper::JsonStub(this->entity());
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    for (auto &&qry : request.queries())
    {
        auto &js = parsedJson["criteria"];
        Json::Value crt = Json::objectValue;
        crt["field"] = qry.m_operand1;
        crt["value"] = qry.m_operand2;
        crt["op"] = qry.m_operator;
        js.append(crt);
    }

    const auto sql = SqlHelper::ScriptSelect(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
}

/// @brief 
/// @param request 
/// @param response 
/// @param func 
void EntityBase::function(const Request &request, Response &response, const std::string &func)
{
    const std::string jsonString = SqlHelper::JsonStub(func);
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    for (auto &&qry : request.queries())
    {
        auto &js = parsedJson["criteria"];
        Json::Value crt = Json::objectValue;
        crt["field"] = qry.m_operand1;
        crt["value"] = qry.m_operand2;
        crt["op"] = qry.m_operator;
        js.append(crt);
    } 

    const auto sql = SqlHelper::ScriptFunction(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
}

void EntityBase::view(const Request &request, Response &response, const std::string &view)
{
    const std::string jsonString = SqlHelper::JsonStub(view);
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    for (auto &&qry : request.queries())
    {
        auto &js = parsedJson["criteria"];
        Json::Value crt = Json::objectValue;
        crt["field"] = qry.m_operand1;
        crt["value"] = qry.m_operand2;
        crt["op"] = qry.m_operator;
        js.append(crt);
    }

    const auto sql = SqlHelper::ScriptSelect(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
}

Json::Value EntityBase::create(const Request &request, Response &response)
{
    Json::Value parsedJson = request.json();

    const auto sql = SqlHelper::ScriptInsert(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
    return parsedJson;
}
Json::Value EntityBase::update(const Request &request, Response &response)
{
    Json::Value parsedJson = request.json();

    const auto sql = SqlHelper::ScriptUpdate(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
    return parsedJson;
}
Json::Value EntityBase::remove(const Request &request, Response &response)
{
    Json::Value parsedJson = request.json();

    const auto sql = SqlHelper::ScriptRemove(parsedJson);
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
    return parsedJson;
}

void EntityBase::schema(const Request &request, Response &response)
{
    const auto sql = SqlHelper::SchemaSql(this->entity());
    std::string result = this->executeSqlStr(sql);
    response.setData(result);
    response.complete();
}
Json::Value EntityBase::schemaJson()
{
    const auto sql = SqlHelper::SchemaSql(this->entity());
    spdlog::trace("EntityBase::schemaJson() executing..{}", sql);
    Json::Value jsResult = this->executeSqlJson(sql);
    Json::Value result = jsResult["result"];
    Json::Value columns = Json::arrayValue;
    for (auto &&row : result)
    {
        columns.append(Json::objectValue);
        Json::Value &column = columns[columns.size() - 1];
        column["field"] = row[0]["value"];
        if (row[1]["value"] == "bigint")
        {
            column["type"] = 0;
            column["value"] = 0;
        }
        else if (row[1]["value"] == "date")
        {
            column["type"] = 4;
            column["value"] = "2000-11-01";
        }
        else if (row[1]["value"] == "character varying")
        {
            column["type"] = 1;
            column["value"] = "var-char";
        }
        else if (row[1]["value"] == "boolean")
        {
            column["type"] = 1;
            column["value"] = true;
        }
        else
        {
            column["type"] = 1;
            column["value"] = "Unknown";
        }
    }
    return columns;
}
void EntityBase::postTemplate(const Request &request, Response &response)
{
    Json::FastWriter fastWriter;
    auto columns = this->schemaJson();
    std::string ret = fastWriter.write(columns);
    response.setData(ret);
    response.complete();
}

void EntityBase::merge()
{
    m_model.merge(m_setModel);
}
void EntityBase::save()
{
    this->merge();

    auto schemaJson = this->schemaJson();
    auto columns = m_model.populate(schemaJson);
    Json::Value insertJson = Json::objectValue;
    insertJson["table"] = this->entity();
    insertJson["columns"] = columns;
    const std::string sql = SqlHelper::ScriptInsert(insertJson);
    spdlog::trace("Insert..{}", sql);

    std::string result = this->executeSqlStr(sql);
}

void EntityBase::update()
{
    auto schemaJson = this->schemaJson();
    auto columns = m_setModel.populate(schemaJson);

    Json::Value crit = Json::arrayValue;
    Json::Value critUpdate = Json::objectValue;
    critUpdate["field"] = "id";
    critUpdate["value"] = this->id();

    crit.append(critUpdate);

    Json::Value updateJson = Json::objectValue;
    updateJson["table"] = this->entity();
    updateJson["columns"] = columns;
    updateJson["criteria"] = crit;
    const std::string sql = SqlHelper::ScriptUpdate(updateJson);
    spdlog::trace("Update..{}", sql);
    std::string result = this->executeSqlStr(sql);
}

void EntityBase::LogPrinter::setPrintSqlOn()
{
    DBManager::instance().s_printResults = true;
}
EntityBase::LogPrinter::~LogPrinter()
{
    DBManager::instance().s_printResults = false;
}