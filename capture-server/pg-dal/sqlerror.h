#ifndef SQLERROR_H
#define SQLERROR_H

#include <iostream>


class SqlError
{
private:
    const std::exception *mp_e = nullptr;
public:
    SqlError(const std::exception *e = nullptr);
    ~SqlError();
    bool isValid()
    {
        return this->mp_e != nullptr;
    }
    std::string text()
    {
        return this->mp_e->what();
    }
    void clear() {
        this->mp_e = nullptr;
    }
};


#endif//SQLERROR_H