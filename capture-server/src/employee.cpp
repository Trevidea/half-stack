#include "employee.h"
#include "gateway.h"
#include "datetimeutils.h"
#include "holiday.h"

Employee::Employee() : EntityBase("employee")
{
}

void Employee::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/employees", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/employee", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/employee", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/employee", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/employee", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}
bool Employee::testLateArrival(const std::string &inTime) const
{
    auto itm = getNumberFromFileTime(inTime);
    return itm > (this->intime() + 5);
}
bool Employee::testEarlyDeparture(const std::string &outTime) const
{
    auto otm = getNumberFromFileTime(outTime);
    return otm < this->outtime();
}
std::vector<time_t> Employee::getHolidaysForTheMonth(const std::string &month, std::vector<Holiday> &list)
{
    auto checkMonth = getTmFromFilter(month);
    std::vector<time_t> _list;
    for (auto &&row : list)
    {
        auto date = row.dtholiday();
        auto tmHld = getTmFromSql(date);
        if (checkMonth.tm_mon == tmHld.tm_mon + 1)
        {
            _list.push_back(mktime(&tmHld));
        }
    }
    return _list;
}
mondt_t Employee::getDateDataForTheMonth(const std::string &forMonth, time_t &doj, const char *holidayListCat, const int wkOff)
{
    mondt_t dateDataForTheMonth;
    const auto datesForTheMonth = getDatesForMonth(forMonth, doj);

    const std::string syear = forMonth.substr(2, 4);
    const int year = std::stoi(syear);
    auto holidays = Holiday::forPeriod(year, holidayListCat);
    auto holidaysForTheMonth = getHolidaysForTheMonth(forMonth, holidays);
    for (auto &&date : datesForTheMonth)
    {
        int wday = getWeekDay(date);
        bool dayOff = isOneOf(wday, wkOff);
        bool holiday = (std::find(holidaysForTheMonth.begin(), holidaysForTheMonth.end(), date) != holidaysForTheMonth.end());
        bool workingDay = !(dayOff || holiday);

        // spdlog::trace("Workingday:{}, weeklyoff:{}, holiday:{}", workingDay, dayOff, holiday);
        dateDataForTheMonth.push_back({date, workingDay, dayOff, holiday});
    }
    return dateDataForTheMonth;
}
mondt_t Employee::getEmpDateDataForTheMonth(const Employee employee, const std::string &forMonth)
{
    auto doj = employee.dtjoining();
    auto intWkOff = employee.weeklyoff();
    auto hfile = employee.holidaycat();

    time_t tdoj = getTimeFromFile(doj);
    return getDateDataForTheMonth(forMonth, tdoj, hfile.c_str(), intWkOff);
}
empmondt_t Employee::getEmpDateDataForTheMonth(const std::string &forMonth)
{

    empmondt_t data;
    auto employees = EntityBase::list<Employee>();
    for (auto &&employee : employees)
    {
        // auto doj = employee.dtjoining();
        // auto intWkOff = employee.weeklyoff();
        // auto hfile = employee.holidaycat();

        // time_t tdoj = getTimeFromFile(doj);
        // data[employee.code()] = getDateDataForTheMonth(forMonth, tdoj, hfile.c_str(), intWkOff);
        data[employee.code()] = getEmpDateDataForTheMonth(employee, forMonth);
    }

    return data;
}

Employee::~Employee()
{
}