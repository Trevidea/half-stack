#ifndef EMPLOYEE_H
#define EMPLOYEE_H
#include <iostream>
#include "entity-base.h"
#include "model.h"
#include "datetimeutils.h"
#include "payroll-types.h"
#include "holiday.h"

class Employee : public EntityBase
{
private:
    static bool isOneOf(int num, int wholeNum)
    {
        bool checked = false;
        bool doCheck = false;
        int place = 10;
        do
        {
            int rem = wholeNum % place;
            // spdlog::trace("num={}, wholenum={}, place={}, rem={}", num, wholeNum, place, rem);
            if (num == rem)
            {
                checked = true;
                break;
            }
            wholeNum = wholeNum / place;

            doCheck = wholeNum > 1;
        } while (doCheck);
        return checked;
    }
    static std::vector<time_t> getHolidaysForTheMonth(const std::string &month, std::vector<Holiday> &list);
    static mondt_t getDateDataForTheMonth(const std::string &forMonth, time_t &doj, const char *holidayListCat = "primary", const int wkOff = 0);

public:
    Employee();
    void report();
    bool testLateArrival(const std::string &inTime) const;
    bool testEarlyDeparture(const std::string &outTime) const;
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

    static empmondt_t getEmpDateDataForTheMonth(const std::string &forMonth);
    static mondt_t getEmpDateDataForTheMonth(const Employee employee, const std::string &forMonth);
    ~Employee();
};

#endif // EMPLOYEE_H