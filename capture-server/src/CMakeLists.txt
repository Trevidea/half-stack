set(HALF_STACK_SRC
    half-stack-exceptions.cpp
    filesysutils.cpp
    handler.cpp
    holiday.cpp
    config.cpp
    entity-base.cpp
    response.cpp
    request.cpp
    employee.cpp
    gateway.cpp
    event.cpp
    team.cpp
    metatype.cpp)
add_library(half-stack STATIC ${HALF_STACK_SRC})
target_include_directories(half-stack PUBLIC "./" api-client)
target_link_libraries(half-stack PUBLIC
    spdlog::spdlog
    api-client
    omal
    pg-dal)