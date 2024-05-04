//Unit test for the ScriptInsert function of SqlHelper class

#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"


TEST(ScriptInsertTest, EmptyColumnsTest) {
    // Create a Json::Value object named json
    Json::Value json;

    // Set the "table" key in the json object to "test_table"
    json["table"] = "test_table";

    // Create a Json::Value object named columns, which represents an array in JSON
    Json::Value columns(Json::arrayValue);

    // Set the "columns" key in the json object to the columns array
    json["columns"] = columns;

    // Define the expected SQL string when inserting into test_table with empty columns
    std::string expectedSql = "INSERT INTO test_table () VALUES () RETURNING id";

    // Call the static method ScriptInsert of the SqlHelper class with the json object and store the result in generatedSql
    std::string generatedSql =  SqlHelper::ScriptInsert(json);

    // Declare that the generated SQL string matches the expected SQL string
    EXPECT_EQ(generatedSql, expectedSql);
}


TEST(ScriptInsertTest, BasicTest)
{
    // Create a JSON object to simulate input data
    Json::Value json;
    json["table"] = "test_table";
    Json::Value columns(Json::arrayValue);

    // Create the first column object and set its field name and value (with double quotes)
    Json::Value column1;
    column1["field"] = "column1";
    column1["value"] = "\"value1\"";
    columns.append(column1);

    // Create the second column object and set its field name and value (with double quotes)
    Json::Value column2;
    column2["field"] = "column2";
    column2["value"] = "\"value2\"";
    columns.append(column2);

    // Set the array of columns in the JSON object
    json["columns"] = columns;

    // Define the expected SQL statement
    std::string expectedSql = "INSERT INTO test_table (column1, column2) VALUES (\"value1\", \"value2\") RETURNING id";

    // Call the ScriptInsert function from the SqlHelper class with the JSON object and get the generated SQL statement
    std::string generatedSql = SqlHelper::ScriptInsert(json);

    // Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(generatedSql, expectedSql);
}
