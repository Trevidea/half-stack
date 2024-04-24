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


ExModelNotFoundException::ExModelNotFoundException(const std::string &entity, const int id) : m_entity{entity},
                                                                                              m_id{id}
{
}
ExModelNotFoundException::~ExModelNotFoundException()
{
}
ExInvalidPreviewDurationException::ExInvalidPreviewDurationException(const std::string &eventId, const int duration)
{
    snprintf(this->msg, 128, "The duration of %d minutes for the evnet %s is more than the 60 minutes limit for the preview to start.", duration, eventId.c_str());
}
ExInvalidPreviewDurationException::~ExInvalidPreviewDurationException()
{
}
