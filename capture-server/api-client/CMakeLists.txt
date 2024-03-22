set(API_CLIENT_SRC 
  client.cpp
  client-factory.cpp
)

add_library(api-client STATIC ${API_CLIENT_SRC}
)
target_link_libraries(api-client PUBLIC 
  spdlog::spdlog
  cpprest
  jsoncpp_lib)

target_include_directories(api-client PUBLIC "./")

