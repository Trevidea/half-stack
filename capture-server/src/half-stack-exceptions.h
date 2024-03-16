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


#endif // PAYROLLEXCEPTIONS_H