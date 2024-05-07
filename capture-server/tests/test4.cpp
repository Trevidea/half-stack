//test4.cpp

#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

class ScriptUpdateTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Initialize any objects or set up any resources required for each test case
    }

    void TearDown() override {
        // Clean up any resources allocated in SetUp()
    }
};

TEST_F(ScriptUpdateTest, BasicUpdate) {
    Json::Value json;
    json["table"] = "employees";

    //Create JSON array to represent an update operation
    Json::Value columns(Json::arrayValue);
    Json::Value column1;
    column1["field"] = "name";
    column1["value"] = "\"John\"";
    columns.append(column1);
    json["columns"] = columns;

    // Define the expected SQL statement after the update operation
    std::string expectedSQL = "UPDATE employees SET name = \"John\" ";
    //Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(SqlHelper::ScriptUpdate(json), expectedSQL);
}

TEST_F(ScriptUpdateTest, UpdateWithMultipleColumns) {
    Json::Value json;
    json["table"] = "employees";

    //Create JSON array to represent an update operation
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
    //Declare that the generated SQL statement matches the expected SQL statement
    EXPECT_EQ(SqlHelper::ScriptUpdate(json), expectedSQL);
}

// Main function for test suite
int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
