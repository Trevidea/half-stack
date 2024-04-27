#include "base.h"
#include "gateway.h"
#include <json/json.h>
#include "db-manager.h"

Base::Base(Json::Value& model):m_model{model}
{
}
void Base::report()
{
}
std::string Base::toString()
{
    return Json::FastWriter().write(this->m_model);
}
std::string Base::toResponse()
{
    return Gateway::instance().formatResponse({{this->m_model}});
}

// Definition of executeSqlJson method matching the declaration
Json::Value Base::executeSqlJson(const std::string &sql)
{
    auto &&connection = DBManager::instance().getConnection();
    connection.execute(sql);
    return connection.result().root();
}

Base::~Base()
{
}