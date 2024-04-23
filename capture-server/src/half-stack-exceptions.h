#ifndef PAYROLLEXCEPTIONS_H
#define PAYROLLEXCEPTIONS_H
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

class ExHandlerNotFound: public std::exception
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
class ExFieldMissingInRequest: public std::exception
{
private:
    std::string m_internalMsg;
    const char * m_msg = "The JSON request does not have the field being queried. ";
public:
    ExFieldMissingInRequest(const std::string &field);
    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExFieldMissingInRequest();
};
class ExModelNotFoundException: public std::exception
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
class ExInvalidPreviewDurationException: public std::exception
{
private:
    std::string m_eventId;
    int m_duration;
public:
    ExInvalidPreviewDurationException(const std::string &eventId, const int duration);
    const char *what() const noexcept
    {
        char msg[128] = {'\0'};
        snprintf(msg, 128, "The duration of %d minutes for the evnetId %s is more than the 60 minutes limit for the preview to start.", this->m_duration, this->m_eventId.c_str());
        return msg;
    }
    ~ExInvalidPreviewDurationException();
};

class ExMonthMissingInRequest: public std::exception
{
private:
    std::string m_internalMsg;
    const char * m_msg = "The action requires the month of payroll to process. Please send the month in query-string in format MMYYYY. ";
public:
    ExMonthMissingInRequest();
    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExMonthMissingInRequest();
};

#endif // PAYROLLEXCEPTIONS_H