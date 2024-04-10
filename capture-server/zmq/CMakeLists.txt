set(ZMQ_SRC
    publisher.cpp
    subscriber.cpp
    )
find_package(cppzmq)
# message(STATUS "ZeroMQ include directories: ${ZeroMQ_INCLUDE_DIR}")
# message(STATUS "ZeroMQ libraries: ${ZeroMQ_LIBRARY}")
# include_directories(${ZeroMQ_INCLUDE_DIRS})

add_library(zmq STATIC ${ZMQ_SRC})
target_include_directories(zmq PUBLIC "./")
target_link_libraries(zmq PUBLIC
    spdlog::spdlog
    cppzmq)    