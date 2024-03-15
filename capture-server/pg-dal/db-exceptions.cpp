#include "db-exceptions.h"


ExNameNotFoundException::ExNameNotFoundException()
{
}

ExNameNotFoundException::~ExNameNotFoundException()
{
}

ExConnectionPoolChokedException::ExConnectionPoolChokedException()
{
}

ExConnectionPoolChokedException::~ExConnectionPoolChokedException()
{
}

ExSqlExecutionError::ExSqlExecutionError(const char *msg)
{
    this->m_internalMsg = this->m_msg;
    this->m_internalMsg.append(msg);
}

ExSqlExecutionError::~ExSqlExecutionError()
{
}

ExWorkConnectionError::ExWorkConnectionError(const char *msg)
{
    this->m_internalMsg = this->m_msg;
    this->m_internalMsg.append(msg);
}

ExWorkConnectionError::~ExWorkConnectionError()
{
}

ExWorkNotAvailableError::ExWorkNotAvailableError(const char *msg)
{
    this->m_internalMsg = this->m_msg;
    this->m_internalMsg.append(msg);
}

ExWorkNotAvailableError::~ExWorkNotAvailableError()
{
}
