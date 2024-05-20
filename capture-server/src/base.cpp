//base.cpp
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

// std::string Base::toResponse()
// {
//     return Gateway::instance().formatResponse({{this->m_model}});
// }

std::string Base::toResponse()
{
    Json::FastWriter writer;
    std::string jsonString = writer.write(m_model);
    return Gateway::instance().formatResponse({{jsonString}});
}


Base::~Base()
{
}