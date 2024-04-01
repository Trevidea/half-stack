set(OMAL_SRC
    api-client.cpp)
add_library(omal STATIC ${OMAL_SRC})
target_include_directories(omal PUBLIC "./" api-client)
target_link_libraries(omal PUBLIC
    spdlog::spdlog
    api-client)