set(QRY_SRC
    m3u8.cpp 
    hls-video.cpp 
    timestamp.cpp 
    segment.cpp
    fnv-1a.cpp
    )
add_library(query-engine STATIC ${QRY_SRC})

message("data-ana: ${duckdb_source}")
message("data-ana: ${duckdb_binary}")



target_include_directories(query-engine PUBLIC "./" ${duckdb_source})
target_link_libraries(query-engine PRIVATE
                        ${duckdb_binary}
                        spdlog::spdlog)