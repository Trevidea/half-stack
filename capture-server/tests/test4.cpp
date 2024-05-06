#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

TEST(ScriptUpdateTest, BasicTest) {
    // Create a JSON object representing the input data
    Json::Value json;
    json["table"] = "test_table";
    Json::Value columns(Json::arrayValue);
    Json::Value column1;
    column1["field"] = "column1";
    column1["value"] = "value1";
    columns.append(column1);
    Json::Value column2;
    column2["field"] = "column2";
    column2["value"] = "value2";
    columns.append(column2);
    json["columns"] = columns;

    // Define the expected SQL statement with double-quoted values
    std::string expectedSql = "UPDATE test_table SET column1 = 'value1', column2 = 'value2' ";

    // Call the ScriptUpdate function from the SqlHelper class with the JSON object and get the generated SQL statement
    std::string generatedSql = SqlHelper::ScriptUpdate(json);

    // Assert that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(generatedSql, expectedSql);
}
