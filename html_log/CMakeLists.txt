cmake_minimum_required (VERSION 3.9 FATAL_ERROR)
project (html_log LANGUAGES CXX VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 17) # C++14...
set(CMAKE_CXX_STANDARD_REQUIRED ON) #...is required...
set(CMAKE_CXX_EXTENSIONS OFF) #...without compiler extensions like gnu++11

set(CMAKE_INSTALL_PREFIX "${CMAKE_BINARY_DIR}/install")
set (PKG_GENERATOR ON)
set(SRCS 
    src/main.cpp)

add_executable(${PROJECT_NAME} 
${SRCS}
)
