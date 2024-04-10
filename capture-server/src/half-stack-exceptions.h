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
public:
    ExModelNotFoundException(const std::string &entity, const int id);
    const char *what() const noexcept
    {
        char msg[128] = {'\0'};
        snprintf(msg, 128, "There is no record in table %s with id %d", this->m_entity.c_str(), this->m_id);
        return msg;
    }
    ~ExModelNotFoundException();
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