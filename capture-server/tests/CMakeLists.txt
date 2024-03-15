FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)


set(TEST_BIN "unit-tests")
set(TEST_SRC 
    # "sqlhelpertests.cpp"
    # "sqldatabasetests.cpp"
    )
set(TEST_INC
    "./")

enable_testing()

add_executable(${TEST_BIN} ${TEST_SRC})

target_include_directories(${TEST_BIN} PUBLIC 
    ${TEST_INC})
    
target_link_libraries(${TEST_BIN} PRIVATE
    pg-dal
    GTest::gtest_main)

include(GoogleTest)
gtest_discover_tests(${TEST_BIN})