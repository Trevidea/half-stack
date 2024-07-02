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
    half-stack)
    
target_include_directories(capture-server PUBLIC ${CMAKE_BINARY_DIR}/half-stack)