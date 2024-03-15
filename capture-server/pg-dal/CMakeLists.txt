set(PG_DAL_SRC 
  pgresult.cpp
  model.cpp
  connection.cpp
  stringutils.cpp
  sqlerror.cpp
  jsonresult.cpp
  db-exceptions.cpp
  db-manager.cpp
  # pg-task.cpp
  transaction.cpp
)

add_library(pg-dal STATIC ${PG_DAL_SRC}
)
target_link_libraries(pg-dal PUBLIC 
  spdlog::spdlog
  jsoncpp_lib
  pqxx)

target_include_directories(pg-dal PUBLIC "./")

