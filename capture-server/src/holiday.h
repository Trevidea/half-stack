#ifndef HOLIDAY_H
#define HOLIDAY_H
#include <iostream>
#include "entity-base.h"

class Holiday: public EntityBase
{
private:

public:
    Holiday();
    void report();
    int year()
    {
        return this->m_model.get<int>("year");
    }
    std::string name()
    {
        return this->m_model.get<std::string>("name");
    }
    std::string dtholiday()
    {
        return this->m_model.get<std::string>("dt_holiday");
    }
    std::string category()
    {
        return this->m_model.get<std::string>("category");
    }
    static std::vector<Holiday> forPeriod(int year, const std::string &cat);
    ~Holiday();
};


#endif // HOLIDAY_H