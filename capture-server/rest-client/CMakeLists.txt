set(REST_CLIENT_SRC 
  client.cpp
  client-factory.cpp
)

add_library(rest-client STATIC ${REST_CLIENT_SRC}
)
target_link_libraries(rest-client PUBLIC 
  spdlog::spdlog
  cpprest
  jsoncpp_lib)

target_include_directories(rest-client PUBLIC "./")

