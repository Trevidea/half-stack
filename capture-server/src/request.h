#ifndef REQUEST_H
#define REQUEST_H
#include <iostream>
#include <vector>
#include "stringutils.h"
#include "json/json.h"
#include "half-stack-exceptions.h"
#pragma push_macro("U")
#undef U
#include "spdlog/spdlog.h"
#pragma pop_macro("U")

struct query
{
    std::string m_operand1;
    std::string m_operator;
    std::string m_operand2;
    bool empty = false;
    void getOps(const std::vector<std::string> &oprs, std::vector<std::string> &ops, const std::string &qs)
    {
        for (auto &&opr : oprs)
        {
            if (qs.find(opr) != std::string::npos)
            {
                spdlog::trace("splitting::{} on {}", qs, opr[0]);
                su_split(opr[0], ops, qs);
                for (auto &&i : ops)
                    spdlog::trace("split elem:{}", i);
                
                ops.push_back(opr);
                break;
            }
        }
    }                              
    query(const std::string &queryString)
    {
        std::vector<std::string> ops;
        getOps({"=",">","<"}, ops, queryString);
        spdlog::trace("qs={}, op.length={}", queryString, ops.size());
        if (ops.size() > 2)
        {
            this->m_operand1 = ops[0];
            this->m_operator = ops[2];
            this->m_operand2 = ops[1];
        }
        else
            this->empty = true;
    }
};

class Request
{
private:
    std::string m_query;
    std::string m_data;
    std::vector<query> m_queries;

public:
    Request(const std::string &query, const std::string &data);
    std::string data() const;
    Json::Value json() const;
    const std::vector<query> &queries() const;

    template <typename T>
    T getColumn(const char *field) const
    {
        auto &&reqJson = this->json();
        auto &columns = reqJson["columns"];
        auto jsObj = std::find_if(columns.begin(), columns.end(), [&field](const Json::Value &obj)
                                  { return strcmp(obj["field"].asString().c_str(), field) == 0; });
        if (jsObj != columns.end())
        {
            return (*jsObj)["value"].template as<T>();
        }
        throw ExFieldMissingInRequest(field);
    }
    std::string getQueryValue(const std::string &key) const
    {
        for (auto &&q : this->m_queries)
        {
            if(q.m_operand1 == key)
            {
                return q.m_operand2;
            }
        }
        return "";
    }
    ~Request();
};

#endif // REQUEST_H