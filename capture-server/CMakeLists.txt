cmake_minimum_required(VERSION 3.16.0)



if(APPLE)
    set(CMAKE_OSX_ARCHITECTURES "arm64" CACHE STRING "Build architecture for macOS")
endif()

project(capture-server VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_BUILD_TYPE Debug)
set(Boost_DEBUG ON)

find_package(PostgreSQL REQUIRED)
find_package(OpenSSL REQUIRED)

# if (WIN32)
#     set(PostgreSQL_LIBRARIES "C:/Program Files/PostgreSQL/15/lib")
#     set(PostgreSQL_INCLUDE_DIR "C:/Program Files/PostgreSQL/15/include")
# endif (WIN32)

set(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake/")
include(AddSubmodule)

include(FetchContent)

set(PostgreSQL_ADDITIONAL_VERSIONS "14")
set(OPENSSL_ROOT_DIR "/opt/homebrew/bin/openssl")

#ENV-VARS------------------
#HR_CAPS = to set the path of the folder where are capture files are stored 
#PG_SRV = name of the postgres server
#PG_DBS = name pf the postgres database
#PG_USR = name of the postgres user
#PG_PWD = postgres password for the user
#--------------------------

FetchContent_Declare(
    libpqxx
    GIT_REPOSITORY https://github.com/jtv/libpqxx.git
    GIT_TAG 7.7.4
    GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(libpqxx)


# Build DuckDB with JSON extension
set(BUILD_JSON ON CACHE BOOL "Build JSON extension")
set(GEN "ninja" CACHE STRING "Build system generator")

include(ExternalProject)
ExternalProject_Add(duckdb
    PREFIX ${CMAKE_BINARY_DIR}/duckdb
    GIT_REPOSITORY https://github.com/duckdb/duckdb.git
    GIT_TAG v1.0.0
    CONFIGURE_COMMAND ""
    BUILD_COMMAND GEN=${GEN} BUILD_JSON=1 make
    INSTALL_COMMAND ""
    BUILD_IN_SOURCE 1
    # BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/duckdb/src/duckdb/build/release/src/libduckdb.so
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/duckdb/src/duckdb/build/release/src/libduckdb.dylib
)
message("Cmake_Binary_Dir = ${CMAKE_BINARY_DIR}")

ExternalProject_Get_Property(duckdb source_dir)
ExternalProject_Get_Property(duckdb binary_dir)
# include_directories(${source_dir}/src/include)

set(duckdb_source ${source_dir}/src/include)
if(APPLE)
    set(duckdb_binary ${binary_dir}/build/release/src/libduckdb.dylib)
else()
    set(duckdb_binary ${binary_dir}/build/release/src/libduckdb.so)
endif()





add_git_submodule(dependency/jsoncpp)
add_git_submodule(dependency/cpprestsdk)
add_git_submodule(dependency/spdlog)
add_git_submodule(dependency/libzmq)
add_git_submodule(dependency/cppzmq)
add_git_submodule(dependency/googletest)

add_subdirectory(dependency)
add_subdirectory(pg-dal)
add_subdirectory(omal)
add_subdirectory(src)
add_subdirectory(rest-client)
add_subdirectory(api)
add_subdirectory(zmq)
add_subdirectory(data-analytics)
add_subdirectory(query-engine)
add_subdirectory(tests)
# add_subdirectory(tests)