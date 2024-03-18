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