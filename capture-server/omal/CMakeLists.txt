set(OMAL_SRC
    output-profile.cpp
    omal-factory.cpp
    virtual-host.cpp)
add_library(omal STATIC ${OMAL_SRC})
target_include_directories(omal PUBLIC "./" rest-client)
target_link_libraries(omal PUBLIC
    spdlog::spdlog
    rest-client)