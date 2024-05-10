// test4.cpp

#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

class SqlHelperTests : public ::testing::Test
{
protected:
    void SetUp() override
    {
        // Initialize any objects or set up any resources required for each test case
    }

    void TearDown() override
    {
        // Clean up any resources allocated in SetUp()
    }
};

TEST_F(SqlHelperTests, EmptyColumnsInsert)
{
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
    std::string generatedSql = SqlHelper::ScriptInsert(json);

    // Declare that the generated SQL string matches the expected SQL string
    EXPECT_EQ(generatedSql, expectedSql);
}

TEST_F(SqlHelperTests, BasicInsert)
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

TEST_F(SqlHelperTests, BasicUpdate)
{
    Json::Value json;
    json["table"] = "employees";

    // Create JSON array to represent an update operation
    Json::Value columns(Json::arrayValue);
    Json::Value column1;
    column1["field"] = "name";
    column1["value"] = "\"John\"";
    columns.append(column1);
    json["columns"] = columns;

    // Define the expected SQL statement after the update operation
    std::string expectedSQL = "UPDATE employees SET name = \"John\" ";
    // Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(SqlHelper::ScriptUpdate(json), expectedSQL);
}

TEST_F(SqlHelperTests, UpdateWithMultipleColumns)
{
    Json::Value json;
    json["table"] = "employees";

    // Create JSON array to represent an update operation
    Json::Value columns(Json::arrayValue);
    Json::Value column1;
    column1["field"] = "name";
    column1["value"] = "\"John\"";
    Json::Value column2;
    column2["field"] = "age";
    column2["value"] = 30;
    columns.append(column1);
    columns.append(column2);
    json["columns"] = columns;

    // Define the expected SQL statement after the update operation with multiple cloumns
    std::string expectedSQL = "UPDATE employees SET name = \"John\", age = 30 ";
    // Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(SqlHelper::ScriptUpdate(json), expectedSQL);
}

// Test case to check if the basic DELETE statement is constructed correctly
TEST_F(SqlHelperTests, BasicDelete)
{
    Json::Value json;
    json["table"] = "employees";

    std::string expectedSQL = "DELETE FROM employees ";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

// Test case to check if the DELETE statement with criteria is constructed correctly
TEST_F(SqlHelperTests, DeleteWithCriteria)
{
    Json::Value json;
    json["table"] = "employees";

    // Construct the criteria in the expected format
    Json::Value criteria(Json::arrayValue);
    Json::Value criterion;
    criterion["field"] = "age";
    criterion["value"] = 30;
    criteria.append(criterion);
    json["criteria"] = criteria;

    // Define the expected SQL statement after the delete operation with criteria
    std::string expectedSQL = "DELETE FROM employees WHERE age = 30";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

TEST_F(SqlHelperTests, RemoveDataFromTable) {
    std::string tableName = "employees";
    std::string criteria = "id = 5";

    std::string expectedSQL = "DELETE FROM employees WHERE id = 5"; 
    EXPECT_EQ(SqlHelper::ScriptRemove(tableName, criteria), expectedSQL);
}

// Test case to check if the DELETE statement with empty criteria is constructed correctly
TEST_F(SqlHelperTests, DeleteWithEmptyCriteria)
{
    Json::Value json;
    json["table"] = "employees";
    json["criteria"] = "";

    std::string expectedSQL = "DELETE FROM employees ";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

TEST_F(SqlHelperTests, ConstructJsonStub) {
    // Define the JsonStub function inline
    auto JsonStub = [](const std::string &tableName) -> std::string {
        char js[1024] = {0};
        const char *fmt = R"(
                        {
                            "table":"%s",
                            "columns":[],
                            "criteria": []
                        })";
        snprintf(js, 1024, fmt, tableName.c_str());
        return js;
    };

    // Test the JsonStub function
    std::string tableName = "employees";
    std::string expectedJson = R"(
                        {
                            "table":"employees",
                            "columns":[],
                            "criteria": []
                        })";
    std::string generatedJson = JsonStub(tableName);
    EXPECT_EQ(generatedJson, expectedJson);
}

TEST_F(SqlHelperTests, ConstructsCorrectSql)
{
    //Define the SchemaSql function inline
    auto SchemaSql = [](const std::string &tableName) -> std::string {
        char sql[1024] = {0};
        const char *fmt = R"(SELECT
                            column_name,
                            data_type
                        FROM
                            information_schema.columns
                        WHERE
                            table_name = '%s';)";
        snprintf(sql, 1024, fmt, tableName.c_str());
        return sql;
    };

    //Test the SchemaSql function
    std::string tableName = "employees";
    std::string expectedSql = R"(SELECT
                            column_name,
                            data_type
                        FROM
                            information_schema.columns
                        WHERE
                            table_name = 'employees';)";
        std::string generatedSql = SchemaSql(tableName);
        EXPECT_EQ(generatedSql, expectedSql);
}

// TEST_F(SqlHelperTests, ValidJson)
// {
//     // Create a sample JSON object
//     Json::Value json;
//     json["table"] = "my_table";

//     // Call the function with the sample JSON object
//     std::string result = ScriptSelect(json);

//     // Expected SQL select string
//     std::string expected = "SELECT * FROM my_table #criteria#"; // Assuming criteriaBuilder returns empty string

//     // Check if the result matches the expected string
//     EXPECT_EQ(result, expected);
// }

// Main function for test suite
int main(int argc, char **argv)
{
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
