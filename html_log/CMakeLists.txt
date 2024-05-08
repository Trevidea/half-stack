cmake_minimum_required (VERSION 3.9 FATAL_ERROR)
project (html_log LANGUAGES CXX VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 17) # C++14...
set(CMAKE_CXX_STANDARD_REQUIRED ON) #...is required...
set(CMAKE_CXX_EXTENSIONS OFF) #...without compiler extensions like gnu++11

include(FetchContent)

FetchContent_Declare(
  json
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG v3.10.5  # Optionally specify the exact tag or commit to fetch
)

FetchContent_GetProperties(json)
if(NOT json_POPULATED)
  FetchContent_Populate(json)
  add_subdirectory(${json_SOURCE_DIR} ${json_BINARY_DIR} EXCLUDE_FROM_ALL)
endif()


set(CMAKE_INSTALL_PREFIX "${CMAKE_BINARY_DIR}/install")
set (PKG_GENERATOR ON)
set(SRCS 
    src/main.cpp)

add_executable(${PROJECT_NAME} 
${SRCS}
)
target_link_libraries(${PROJECT_NAME}  PRIVATE nlohmann_json::nlohmann_json)
