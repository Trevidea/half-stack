#include "half-stack-exceptions.h"

ExEntityNotSet::ExEntityNotSet()
{
}

ExEntityNotSet::~ExEntityNotSet()
{
}

ExHandlerNotFound::ExHandlerNotFound()
{
}

ExHandlerNotFound::~ExHandlerNotFound()
{
}

ExFieldMissingInRequest::ExFieldMissingInRequest(const std::string &field)
{
    this->m_internalMsg = this->m_msg;
    this->m_internalMsg.append("Field name: ");
    this->m_internalMsg.append(field);
}

ExFieldMissingInRequest::~ExFieldMissingInRequest()
{
}

ExMonthMissingInRequest::ExMonthMissingInRequest()
{
}

ExMonthMissingInRequest::~ExMonthMissingInRequest()
{
}

ExModelNotFoundException::ExModelNotFoundException(const std::string &entity, const int id) : m_entity{entity},
                                                                                              m_id{id}
{
}
ExModelNotFoundException::~ExModelNotFoundException()
{
}
ExInvalidPreviewDurationException::ExInvalidPreviewDurationException(const std::string &eventId, const int duration) : m_eventId{eventId},
                                                                                              m_duration{duration}
{
}
ExInvalidPreviewDurationException::~ExInvalidPreviewDurationException()
{
}
