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
    // Log the content of m_model for debugging purposes
    std::string modelString = Json::FastWriter().write(this->m_model);
    spdlog::debug("Model content in toResponse(): {}", modelString);

    try {
        // Attempt to convert m_model to a string
        std::string responseString = Gateway::instance().formatResponse({{this->m_model}});
        spdlog::debug("Response string: {}", responseString);
        return responseString;
    } catch (const std::exception &e) {
        // Log any exceptions that occur during conversion
        spdlog::error("Exception occurred while converting to response: {}", e.what());
        throw; // Re-throw the exception to propagate it
    }
}


Base::~Base()
{
}