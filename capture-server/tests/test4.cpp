#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

// Define a test case named "ScriptInsertTest.BasicTest"
TEST(ScriptInsertTest, BasicTest)
{
    // Create a JSON object to simulate input data
    Json::Value json;

    // Set the table name in the JSON object
    json["table"] = "test_table";

    // Create an array of column objects in the JSON object
    Json::Value columns(Json::arrayValue);

    // Create the first column object and set its field name and value
    Json::Value column1;
    column1["field"] = "column1";
    column1["value"] = "value1";

    // Add the first column object to the array of columns
    columns.append(column1);

    // Create the second column object and set its field name and value
    Json::Value column2;
    column2["field"] = "column2";
    column2["value"] = "value2";

    // Add the second column object to the array of columns
    columns.append(column2);

    // Set the array of columns in the JSON object
    json["columns"] = columns;

    // Define the expected SQL statement
    std::string expectedSql = "INSERT INTO test_table (column1, column2) VALUES ('value1', 'value2') RETURNING id";

    // Call the ScriptInsert function from the SqlHelper class with the JSON object and get the generated SQL statement
    std::string generatedSql = SqlHelper::ScriptInsert(json);

    // Step 1: Check Expected and Actual Values
    std::cout << "Expected SQL: " << expectedSql << std::endl;
    std::cout << "Generated SQL: " << generatedSql << std::endl;

    // Step 2: Verify Input Data
    std::cout << "Input JSON: " << json << std::endl;

    // Step 3: Inspect Implementation
    // If necessary, review the implementation of the ScriptInsert function in the SqlHelper class.

    // Step 4: Debugging
    // If needed, use a debugger to step through the ScriptInsert function.

    // Step 5: Check for Recent Changes
    // Review any recent changes in the ScriptInsert function or related code.

    // Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(generatedSql, expectedSql);
}
