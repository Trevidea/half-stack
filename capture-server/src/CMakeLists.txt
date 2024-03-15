set(HR_MANAGER_SRC
    filesysutils.cpp
    handler.cpp
    inout.cpp
    holiday.cpp
    config.cpp
    entity-base.cpp
    response.cpp
    request.cpp
    attendance.cpp
    employee.cpp
    payroll.cpp
    salary-rate.cpp
    payroll-leave.cpp
    privilege.cpp
    sick-leave.cpp
    monthly-attendance.cpp
    gateway.cpp
    payroll-exceptions.cpp
    salary.cpp
    salary-slip-field.cpp
    monthly-salary.cpp
    metatype.cpp)
add_library(hr-manager STATIC ${HR_MANAGER_SRC})
target_include_directories(pg-dal PUBLIC "./")
target_link_libraries(hr-manager PUBLIC
    spdlog::spdlog
    pg-dal)