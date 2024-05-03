set(TEST_BIN "unit-tests")
set(TEST_SRC 
    test1.cpp
    test2.cpp
    test3.cpp
    # test4.cpp
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