if(NOT TARGET spdlog)
    # Stand-alone build
    find_package(spdlog REQUIRED)
endif()
if(WIN32)
    add_executable(payroll-server serverwin32.cpp)
else(WIN32)
    add_executable(payroll-server server.cpp)
endif(WIN32)
target_link_libraries(payroll-server PUBLIC
    spdlog::spdlog
    cpprest
    jsoncpp_lib
    pg-dal
    hr-manager)