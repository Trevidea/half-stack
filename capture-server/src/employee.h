#ifndef EMPLOYEE_H
#define EMPLOYEE_H
#include <iostream>
#include "entity-base.h"
#include "model.h"
#include "datetimeutils.h"
#include "holiday.h"

class Employee : public EntityBase
{
private:
public:
    Employee();
    void report();
    std::string code() const
    {
        return this->m_model.get<std::string>("code");
    }
    std::string firstname() const
    {
        return this->m_model.get<std::string>("first_name");
    }
    std::string lastname() const
    {
        return this->m_model.get<std::string>("last_name");
    }
    std::string designation() const
    {
        return this->m_model.get<std::string>("designation");
    }
    std::string department() const
    {
        return this->m_model.get<std::string>("department");
    }
    std::string dtjoining() const
    {
        return this->m_model.get<std::string>("dt_joining");
    }
    std::string holidaycat() const
    {
        return this->m_model.get<std::string>("holiday_cat");
    }
    int weeklyoff() const
    {
        return this->m_model.get<int>("weekly_off");
    }
    float paidalc() const
    {
        return this->m_model.get<float>("paid_alc");
    }
    float sickalc() const
    {
        return this->m_model.get<float>("sick_alc");
    }
    float paidbal() const
    {
        return this->m_model.get<float>("paid_bal");
    }
    float sickbal() const
    {
        return this->m_model.get<float>("sick_bal");
    }
    int intime() const
    {
        return this->m_model.get<int>("in_time");
    }
    int outtime() const
    {
        return this->m_model.get<int>("out_time");
    }

    ~Employee();
};

#endif // EMPLOYEE_H