#ifndef PGRESULT_H
#define PGRESULT_H
#include <iostream>
#include <pqxx/pqxx>
#include <vector>
#include "model.h"
#include "json/json.h"

class PGResult
{
private:
    pqxx::result m_result;
    Json::Value m_root;
    void setValue(Json::Value &json, const pqxx::field &field);
    std::vector<Model> m_models;
public:
    PGResult() = default;
    PGResult(const pqxx::result &result);
    std::vector<Model> models()
    {
        return this->m_models;
    }
    ~PGResult();
};

#endif // PGRESULT_H