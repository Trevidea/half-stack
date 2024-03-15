#ifndef DBEXCEPTIONS_H
#define DBEXCEPTIONS_H
#include <iostream>
#include <exception>

class ExNameNotFoundException : public std::exception
{
private:
    const char *m_msg = "A connection by that name does not exist in the connection pool.";
public:
    ExNameNotFoundException();

    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExNameNotFoundException();
};
class ExConnectionPoolChokedException : public std::exception
{
private:
    const char *m_msg = "No more connections available in the connection pool.";
public:
    ExConnectionPoolChokedException();

    const char *what() const noexcept
    {
        return this->m_msg;
    }
    ~ExConnectionPoolChokedException();
};
class ExSqlExecutionError: public std::exception
{
private:
    std::string m_internalMsg;
    const char *m_msg = "The sql execution failed with the following message: ";
public:
    ExSqlExecutionError(const char *msg);
    const char *what() const noexcept
    {
        return this->m_internalMsg.c_str();
    }
    ~ExSqlExecutionError();
};

class ExWorkConnectionError: public std::exception
{
private:
    std::string m_internalMsg;
    const char *m_msg = "Creating new transactional work failed with the following error: ";
public:
    ExWorkConnectionError(const char *msg);
    const char *what() const noexcept
    {
        return this->m_internalMsg.c_str();
    }
    ~ExWorkConnectionError();
};

class ExWorkNotAvailableError: public std::exception
{
private:
    std::string m_internalMsg;
    const char *m_msg = "No transaction worker available for the thread.";
public:
    ExWorkNotAvailableError(const char *msg = "");
    const char *what() const noexcept
    {
        return this->m_internalMsg.c_str();
    }
    ~ExWorkNotAvailableError();
};
#endif // DBEXCEPTIONS_H