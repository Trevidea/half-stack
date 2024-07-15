

message("DuckDB include directory = ${source_dir}/src/include")
message("DuckDB binary directory = ${binary_dir}")

file(GLOB DATA_ANALYTICS_SOURCES
    "*.cpp"
)

add_library(data-analytics STATIC ${DATA_ANALYTICS_SOURCES})
target_include_directories(data-analytics PUBLIC "./" ${duckdb_source})

add_dependencies(data-analytics duckdb)
target_link_libraries(data-analytics PRIVATE 
                        ${duckdb_binary}
                        jsoncpp_lib)
