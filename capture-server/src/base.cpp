// base.cpp
#include "base.h"
#include "gateway.h"
#include <json/json.h>
#include "db-manager.h"

Base::Base(Json::Value &model) : m_model{model}
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
    // Log the content of m_model for debugging purposes
    std::string modelString = Json::FastWriter().write(this->m_model);
    spdlog::debug("Model content in toResponse(): {}", modelString);

    return Gateway::instance().formatResponse({{this->m_model}});
}

Base::~Base()
{
}