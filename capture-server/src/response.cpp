#include "response.h"

int Response::s_count = 0;
Response::Response() : m_id{++s_count}
{
}
std::string Response::data()
{
    return this->m_data;
}
void Response::setData(const std::string &d)
{
    this->m_data = d;
}
void Response::complete()
{
    //create a functional here to inform the subscribers that the work has been completed
}
Response::~Response()
{
}