set(OMAL_SRC
    api-client.cpp)
add_library(omal STATIC ${OMAL_SRC})
target_include_directories(omal PUBLIC "./" rest-client)
target_link_libraries(omal PUBLIC
    spdlog::spdlog
    rest-client)