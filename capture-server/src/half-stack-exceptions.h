#ifndef HALFSTACKEXCEPTIONS_H
#define HALFSTACKEXCEPTIONS_H
#include <iostream>
#include <exception>

class ExEntityNotSet : public std::exception
{
private:
    const char *m_msg = "The entity has not been set against any data as yet.";

public:
    ExEntityNotSet();

    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExEntityNotSet();
};

class ExHandlerNotFound : public std::exception
{
private:
    const char *m_msg = "Handler not found for the request.";

public:
    ExHandlerNotFound();

    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExHandlerNotFound();
};
class ExFieldMissingInRequest : public std::exception
{
private:
    std::string m_internalMsg;
    const char *m_msg = "The JSON request does not have the field being queried. ";

public:
    ExFieldMissingInRequest(const std::string &field);
    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExFieldMissingInRequest();
};
class ExModelNotFoundException : public std::exception
{
private:
    std::string m_entity;
    int m_id;
    std::string *m_msg = new std::string("There is no record in table %s with id %d");

public:
    ExModelNotFoundException(const std::string &entity, const int id);
    const char *what() const noexcept
    {
        char msg[128] = {'\0'};
        snprintf(msg, 128, this->m_msg->c_str(), this->m_entity.c_str(), this->m_id);
        *this->m_msg = msg;
        return this->m_msg->c_str();
    }
    ~ExModelNotFoundException();
};
class ExInvalidPreviewDurationException : public std::exception
{
private:
    char msg[128] = {'\0'};

public:
    ExInvalidPreviewDurationException(const std::string &eventId, const int duration);
    const char *what() const noexcept
    {
        return msg;
    }
    ~ExInvalidPreviewDurationException();
};

class ExInvalidUrlException : public std::exception
{
private:
    std::string m_message;

public:
    ExInvalidUrlException(const std::string &url);

    virtual const char *what() const noexcept override;

    ~ExInvalidUrlException() noexcept override;
};

#endif // HALFSTACKEXCEPTIONS_H