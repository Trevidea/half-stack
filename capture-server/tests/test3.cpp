//UNit test for the ScriptInsert function of SqlHelper class

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
