#include <gtest/gtest.h>
// #include "dal.h"
// #include "sqldatabase.h"
#include "sqlhelper.h"

class SqlDatabaseTest : public ::testing::Test
{
protected:
  SqlDatabase db = SqlDatabase::addDatabase("sharan", "drake.in", 5432, "payroll");
  void SetUp() override
  {
    db.open("postgres", "123");
  }

  void TearDown() override
  {
    db.close();
  }
};

TEST_F(SqlDatabaseTest, SELECT_QUERY_EXECUTED)
{

  std::string sql1 = "SELECT * FROM TABLE";
  EXPECT_EQ(SqlDatabase::isSelectQuery(sql1), true);

  std::string sql2 = " SEleCT * FROM TABLE";
  EXPECT_EQ(SqlDatabase::isSelectQuery(sql2), true);

  std::string sql3 = "INSERT INTO TABLE";
  EXPECT_EQ(SqlDatabase::isSelectQuery(sql3), false);

  db.execute("SELECT * FROM unit_tests_employee");

  EXPECT_EQ(db.lastError().isValid(), false);
  std::cout << "Json root:" << db.result().root() << std::endl;
}

TEST_F(SqlDatabaseTest, INSERT_QUERY_EXECUTED)
{

  const std::string jsonString = R"(
   {
     "table":"unit_tests_employee",
     "columns":[
        {
            "field":"employee_id",
            "value":8,
            "type":0
        },
        {
            "field":"first_name",
            "value":"aaryan",
            "type":1
        },
        {
            "field":"last_name",
            "value":"kumar",
            "type":1
        },
        {
            "field":"salary",
            "value":100.50,
            "type":2
        },
        {
            "field":"is_manager",
            "value":true,
            "type":3
        },
        {
            "field":"doj",
            "value":"2022-08-12",
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
  db.execute(sql);

  EXPECT_EQ(db.lastError().isValid(), false);
}