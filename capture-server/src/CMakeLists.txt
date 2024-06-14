set(HALF_STACK_SRC
    half-stack-exceptions.cpp
    filesysutils.cpp
    handler.cpp
    config.cpp
    entity-base.cpp
    response.cpp
    request.cpp
    gateway.cpp
    event.cpp
    event-manager.cpp
    on-demand-event.cpp
    omal.cpp
    omal-control-server.cpp
    user-profile.cpp
    base.cpp
    event-preview.cpp
    event-runner.cpp
    device.cpp
    event-device.cpp
    countdown.cpp
    worker-loop.cpp
    connection-detail.cpp
    event-connection.cpp
    live-event.cpp
    past-event.cpp
    distribution-list.cpp
    metatype.cpp)
add_library(half-stack STATIC ${HALF_STACK_SRC})
target_include_directories(half-stack PUBLIC "./" rest-client zmq)
target_link_libraries(half-stack PUBLIC
    spdlog::spdlog
    rest-client
    omal
    pg-dal
    zmq)