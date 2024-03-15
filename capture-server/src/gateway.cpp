#include "gateway.h"
#include "employee.h"
#include "config.h"
#include "holiday.h"
#include "attendance.h"
#include "spdlog/spdlog.h"
#include "payroll.h"
#include "salary-rate.h"
#include "payroll-leave.h"
#include "privilege.h"
#include "sick-leave.h"
#include "monthly-attendance.h"
#include "payroll-exceptions.h"
#include "salary-slip-field.h"
#include "monthly-salary.h"
#include "metatype.h"

Gateway::Gateway()
{
}

void Gateway::init()
{
    spdlog::trace("Registering handlers..");
    this->m_entities.push_back(new Employee());
    this->m_entities.push_back(new Attendance());
    this->m_entities.push_back(new Config());
    this->m_entities.push_back(new Holiday());
    this->m_entities.push_back(new Payroll());
    this->m_entities.push_back(new SalaryRate());
    this->m_entities.push_back(new PayrollLeave());
    this->m_entities.push_back(new Privilege());
    this->m_entities.push_back(new SickLeave());
    this->m_entities.push_back(new MonthlyAttendance());
    this->m_entities.push_back(new SalarySlipField());
    this->m_entities.push_back(new MonthlySalary());
    this->m_entities.push_back(new MetaType());
    for (auto &&e : this->m_entities)
    {
        e->report();
    }
}
std::string Gateway::flatten(std::string method, const std::string path)
{
    return method.append(path);
}

void Gateway::route(const std::string &method, const std::string &path, const std::function<void(const Request &, Response &)> &handler)
{
    std::string key = this->flatten(method, path);
    this->m_handlers[key] = handler;
    spdlog::trace("handler registered for...{}", key);
}

// UNIT TEST THIS
Response &Gateway::request(std::string method, const std::string &path, const std::string &query, const std::string &data)
{
    std::cout << "request received.." << std::endl;
    Response r;
    int x = r.id();
    this->m_reg[x] = std::move(r);

    std::string key = this->flatten(method, path);

    spdlog::trace("\n\tmethod:{}\n\tpath:{}\n\tquery:{}\n\tdata:{}", method, path, query, data);

    auto &&handler = this->m_handlers[key];
    if (handler)
    {
        std::cout << "handler found for:" << key << std::endl;
        try
        {
            handler(Request(query, data), this->m_reg[x]);
        }
        catch (const std::exception &e)
        {
            spdlog::error("Error handlingf request, {}", e.what());
            Json::Value errJs = Json::objectValue;
            errJs["error"] = e.what(); 
            this->m_reg[x].setData(Json::FastWriter().write(errJs));
        }
        return this->m_reg[x];
    }
    else
        throw ExHandlerNotFound();
}

Gateway::~Gateway()
{
};