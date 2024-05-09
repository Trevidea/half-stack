#include <gtest/gtest.h>
#include "sqlhelper.h"

class SqlHelperTests : public ::testing::Test
{
    void SetUp() override
    {
    }

    void TearDown() override
    {
    }
};

TEST_F(SqlHelperTests, CREATE_SQL_FOR_LIST)
{
    const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[],
      "criteria": []
        }
        )";
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptSelect(parsedJson);
    EXPECT_EQ(sql, "SELECT * FROM unit_tests_employee ");
};

TEST_F(SqlHelperTests, CREATE_SQL_TO_FETCH_ONE_RECORD_BASED_ON_ONE_CRITERIA)
{
    const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[],
      "criteria": [
        {
            "field":"id",
            "value":2
        }
      ]
        }
        )";
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptSelect(parsedJson);
    EXPECT_EQ(sql, "SELECT * FROM unit_tests_employee WHERE id = 2");
};

/*
INSERT INTO unit_tests_employee (
    employee_id,
    first_name,
    last_name,
    salary,
    is_manager,
    doj)
    VALUES (
        3,
        'Neha',
        'Agrawal',
        '120.00',
        true,
        '2020-02-29'
    )
*/
TEST_F(SqlHelperTests, CREATE_SQL_TO_INSERT_ONE_RECORD)
{
    const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[
        {
            "field":"employee_id",
            "value":9,
            "type":0
        },
        {
            "field":"first_name",
            "value":"bheem",
            "type":1
        },
        {
            "field":"last_name",
            "value":"kumar",
            "type":1
        },
        {
            "field":"salary",
            "value":12500.50,
            "type":2
        },
        {
            "field":"is_manager",
            "value":true,
            "type":3
        },
        {
            "field":"doj",
            "value":"2020-08-12",
            "type":4
        }
        ],
      "criteria": []
        }
        )";
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptInsert(parsedJson);
    EXPECT_EQ(sql, "INSERT INTO unit_tests_employee (employee_id, first_name, last_name, salary, is_manager, doj) VALUES(9, 'bheem', 'kumar', 12500.5, \x1, '2020-08-12')");
};
TEST_F(SqlHelperTests, CREATE_SQL_TO_UPDATE_ONE_RECORD_BASED_ON_ONE_CRITERIA)
{
    const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[
        {
            "field":"employee_id",
            "value":4,
            "type":0
        },
        {
            "field":"first_name",
            "value":"arjun",
            "type":1
        },
        {
            "field":"last_name",
            "value":"kumar",
            "type":1
        },
        {
            "field":"salary",
            "value":12500.50,
            "type":2
        },
        {
            "field":"is_manager",
            "value":true,
            "type":3
        },
        {
            "field":"doj",
            "value":"2020-08-12",
            "type":4
        }
        ],
      "criteria": [
        {
            "field":"doj",
            "value":"2020-08-12",
            "type":4            
        }
      ]
        }
        )";
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptUpdate(parsedJson);
    EXPECT_EQ(sql, "UPDATE unit_tests_employee SET employee_id = 4, first_name = 'arjun', last_name = 'kumar', salary = 12500.5, is_manager = \x1, doj = '2020-08-12' WHERE doj = '2020-08-12' ");
};

TEST_F(SqlHelperTests, CREATE_SQL_TO_REMOVE_RECORDS_BASED_ON_ONE_CRITERIA)
{
    const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[],
      "criteria": [
        {
            "field":"id",
            "value":2
        }
      ]
        }
        )";
    Json::Value parsedJson;
    Json::Reader reader;
    reader.parse(jsonString, parsedJson);
    const auto sql = SqlHelper::ScriptRemove(parsedJson);
    EXPECT_EQ(sql, "DELETE FROM unit_tests_employee WHERE id = 2");
};