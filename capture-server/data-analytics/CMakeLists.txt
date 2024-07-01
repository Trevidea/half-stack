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
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/build/release/src/libduckdb_static.a
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

add_library(data-analytics ${DATA_ANALYTICS_SOURCES})
target_include_directories(data-analytics PUBLIC "./" ${source_dir}/src/include)

add_dependencies(data-analytics duckdb)
if(APPLE)
    target_link_libraries(data-analytics PUBLIC ${binary_dir}/build/release/src/libduckdb.dylib)
else()
    target_link_libraries(data-analytics PUBLIC ${binary_dir}/build/release/src/libduckdb_static.a)
endif()
