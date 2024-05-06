#include "response.h"
#include "json/json.h"
int Response::s_count = 0;
Response::Response(const request::detail &detail) : m_id{++s_count}, m_detail{detail}
{
}
std::string Response::data()
{
    return this->m_data;
}
void Response::setData(const std::string &d)
{
    Json::Value jsObject = Json::objectValue;
    jsObject["Absolute URI"] = this->m_detail.method + "::" + this->m_detail.path;
    Json::Reader().parse(d, jsObject["Gateway Response"]);
    this->m_data = Json::FastWriter().write(jsObject);
}
void Response::setRawData(const Json::Value &d)
{
    this->m_data = Json::FastWriter().write(d);
}
void Response::complete()
{
    // create a functional here to inform the subscribers that the work has been completed
}
Response::~Response()
{
}
