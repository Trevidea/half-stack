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
    INSTALL_COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_BINARY_DIR}/duckdb/src/duckdb/build/release/src/libduckdb_static.a ${CMAKE_BINARY_DIR}/lib/duckdb/libduckdb_static.a
    BUILD_IN_SOURCE 1
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/lib/duckdb/libduckdb_static.a
)
message("Cmake_Binary_Dir = ${CMAKE_BINARY_DIR}")

ExternalProject_Get_Property(duckdb source_dir)
ExternalProject_Get_Property(duckdb binary_dir)
include_directories(${source_dir}/src/include)

message("DuckDB include directory = ${source_dir}/src/include")
message("DuckDB binary directory = ${binary_dir}")

file(GLOB DATA_ANALYTICS_SOURCES
    "*.cpp"
)

add_library(data-analytics SHARED ${DATA_ANALYTICS_SOURCES})

add_dependencies(data-analytics duckdb)
set(DUCKDB_LIB_PATH ${CMAKE_BINARY_DIR}/lib/duckdb)
if(APPLE)
    target_link_libraries(data-analytics PRIVATE ${DUCKDB_LIB_PATH}/libduckdb.dylib)
else()
    target_link_libraries(data-analytics PRIVATE ${DUCKDB_LIB_PATH}/libduckdb_static.a)
endif()

target_include_directories(data-analytics PUBLIC "./" ${source_dir}/src/include)
