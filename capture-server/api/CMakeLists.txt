if(NOT TARGET spdlog)
    # Stand-alone build
    find_package(spdlog REQUIRED)
endif()

add_executable(capture-server 
    server.cpp)

target_link_libraries(capture-server PUBLIC
    spdlog::spdlog
    cpprest
    jsoncpp_lib
    pg-dal
    omal
    data-analytics
    duckdb
    half-stack)