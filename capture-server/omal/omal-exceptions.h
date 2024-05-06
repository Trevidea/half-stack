#ifndef OMALEXCEPTIONS_H
#define OMALEXCEPTIONS_H
#include <iostream>
#include <exception>


class ExUnautorizedException: public std::exception
{
private:
    char msg[128] = {'\0'};
public:
    ExUnautorizedException(const std::string &user, const std::string &event);
    const char *what() const noexcept
    {
        return msg;
    }
    ~ExUnautorizedException();
};
class ExVHostCreationException: public std::exception
{
private:
    char msg[128] = {'\0'};
public:
    ExVHostCreationException(const std::string &name);
    const char *what() const noexcept
    {
        return msg;
    }
    ~ExVHostCreationException();
};

class ExOMResourceAccessException: public std::exception
{
private:
    char msg[128] = {'\0'};
public:
    ExOMResourceAccessException(const std::string &resource);
    const char *what() const noexcept
    {
        return msg;
    }
    ~ExOMResourceAccessException();
};

#endif // OMALEXCEPTIONS_H