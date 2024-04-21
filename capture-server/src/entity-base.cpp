#include "entity-base.h"
#include "sqlhelper.h"
#include "db-manager.h"
#include "spdlog/spdlog.h"
#include "gateway.h"
#include "model.h"
#include "client-factory.h"

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
Json::Value EntityBase::function(const std::string &funcName, const std::string &params)
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
    Json::Value columns = parsedJson["columns"];
    std::string newItem = columns[columns.size() - 1]["value"].asString();
    Json::Value returnValue;
    returnValue["item"] = newItem;
    response.setData(result);
    response.complete();
    return returnValue;
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
    Json::FastWriter f2;
    std::string strResult = f2.write(jsResult);
    std::cout << strResult << std::endl;
    Json::Value result = jsResult["result"];
    Json::Value columns = Json::arrayValue;
    for (auto &&row : result)
    {
        columns.append(Json::objectValue);
        Json::Value &column = columns[columns.size() - 1];
        spdlog::trace("Row data..{}", Json::FastWriter().write(row));
        this->setColumn(column, row[0]["value"], row[1]["value"].as<std::string>());
        // column["field"] = row[0]["value"];
        // if (row[1]["value"] == "bigint")
        // {
        //     column["type"] = 0;
        //     column["value"] = 0;
        // }
        // else if (row[1]["value"] == "date")
        // {
        //     column["type"] = 4;
        //     column["value"] = "2000-11-01";
        // }
        // else if (row[1]["value"] == "character varying")
        // {
        //     column["type"] = 1;
        //     column["value"] = "var-char";
        // }
        // else if (row[1]["value"] == "boolean")
        // {
        //     column["type"] = 1;
        //     column["value"] = true;
        // }
        // else
        // {
        //     column["type"] = 1;
        //     column["value"] = "Unknown";
        // }
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

void EntityBase::sync(const Request &req, Response &rsp)
{
    auto &factory = Rest::ClientFactory::getInstance();
    const auto &reqData = req.data();
    spdlog::trace("Request data..{}", reqData);

    Json::Reader reader;
    Json::Value requestJson;
    reader.parse(reqData, requestJson);
    const auto &jsUrl = requestJson.get("source", DBManager::instance().getEnv("FS_URL", "http://localhost:1337/api"));
    const auto &jsDeleteCriteria = requestJson.get("delete-criteria", "false");
    const auto &deleteSql = SqlHelper::ScriptRemove(this->entity(), jsDeleteCriteria.asString());

    Client client = factory.create(jsUrl.asString());
    client.get([this, &rsp, &reader, &deleteSql](const std::string &response)
               {
                    
                   /*A.***Event data from the Full Stack - STRAPI****/
                   Json::Value responseJson;
                   reader.parse(response, responseJson);
                   Json::Value dataJson = responseJson.get("data", Json::arrayValue);
                   spdlog::trace("sync().dataJson..{}", Json::FastWriter().write(dataJson));
                   /***********************************************/

                   /*B.********This is the template that has all the fields we need to save for a record*********/
                   Json::Value jsEntityTemplate = this->schemaJson();
                   Json::FastWriter fw;
                   auto x = fw.write(jsEntityTemplate);
                   spdlog::trace("Insert Json..{}", x);
                   /*******************************************************************************************/

                   /*C.****This is the JSON stub to be used for creating the SQL*****/
                   Json::Value jsSQLInput;
                   const auto &sqlInput = SqlHelper::JsonStub("event");
                   spdlog::trace("sqlInput: {}", sqlInput);
                   auto stub = reader.parse(sqlInput, jsSQLInput);

                   /*
                   We need to populate C.
                   B has all the fields that will go into the Columns array in C.
                   And A has all the data that we will set for the columns in B.
                   Run a loop on B, get values for the fields in B from data in A, create a Json::Value and add to C.
                   */
                   Json::Value &columns = jsSQLInput["columns"];

                   const Json::Value &jsId = dataJson[0].get("id", Json::intValue);
                   const Json::Value &attributes = dataJson[0].get("attributes", Json::objectValue);

                   for (auto &&col : jsEntityTemplate)
                   {
                       columns.append(Json::objectValue);
                       Json::Value &column = columns[columns.size() - 1];
                       const auto &field = col["field"].asString();
                       const auto &type = col["type"];

                       spdlog::trace("Field name..{}, type..{}", field, Json::FastWriter().write(type));
                       column["field"] = field;
                       column["type"] = type;

                       if (field == "id")
                           column["value"] = jsId;
                       else
                       {
                           const auto &val = attributes.get(field, Json::objectValue);
                           if (val.isObject())
                           {
                               Json::FastWriter objectToStringConverter;
                               const auto &converted = objectToStringConverter.write(val);
                               column["value"] = converted;
                           }
                           else
                           {
                               column["value"] = val;
                           }
                       }
                   }
                   Json::FastWriter f1;
                   const std::string djs = f1.write(columns);
                   std::cout << "Final column for sql: " << djs << std::endl;
                   /***************************************************************/

                   const auto sql = SqlHelper::ScriptInsert(jsSQLInput);
                   spdlog::trace("Insert script..{}", sql);
                   auto && trs = DBManager::instance().createTransaction();
                    this->executeSqlJson(deleteSql);
                   
                    auto jsResult = this->executeSqlJson(sql);
                   trs.commit();
                   rsp.setData(Json::FastWriter().write(jsResult)); },
               [](const std::string &s)
               {
                   spdlog::error("failure..{}", s);
               });

    rsp.setData("Sync operation completed successfully.");
    rsp.complete();
}

bool EntityBase::notSet() const
{
    return this->id() <= 0;
}