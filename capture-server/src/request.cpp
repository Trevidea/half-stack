#include "request.h"


Request::Request(const std::string &qry, const std::string &data):
    m_query{qry},
    m_data{data}
{
    std::vector<std::string> qstrs;
    su_split('&',qstrs, qry);
    for (auto &&q : qstrs)
    {
        query qr{q};
        if(!qr.empty)
            this->m_queries.push_back(std::move(qr));
    }
    
}
std::string Request::data() const
{
    return this->m_data;
}
Json::Value Request::json() const
{
    const std::string jsonString = this->data();
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    return std::move(parsedJson);
}
const std::vector<query> &Request::queries() const
{
    return this->m_queries;
}

Request::~Request()
{
}