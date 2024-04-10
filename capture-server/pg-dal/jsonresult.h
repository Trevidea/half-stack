#ifndef SQLRESULT_H
#define SQLRESULT_H
#include <pqxx/pqxx>
#include <json/json.h>
#include "spdlog/spdlog.h"

class JsonResult
{
private:
    pqxx::result m_result;
    Json::Value m_root;
    void setRoot(const pqxx::result &sqlResult, Json::Value &jsonRoot);
public:
    JsonResult() = default;
    JsonResult(const pqxx::result &result);
    void setValue(Json::Value &json, const pqxx::field &field);
    ~JsonResult();
    Json::Value root()  {
        if(this->m_root.empty())
        {
            this->setRoot(this->m_result, this->m_root);
        }
        return this->m_root;
    }

};


#endif // SQLRESULT_H