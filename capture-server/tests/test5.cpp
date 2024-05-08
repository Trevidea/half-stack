//test5.cpp

#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

class ScriptRemoveTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Initialize any objects or set up any resources required for each test case
    }

    void TearDown() override {
        // Clean up any resources allocated in SetUp()
    }
};

// Test case to check if the basic DELETE statement is constructed correctly
TEST_F(ScriptRemoveTest, BasicDelete) {
    Json::Value json;
    json["table"] = "employees";

    std::string expectedSQL = "DELETE FROM employees ";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

// Test case to check if the DELETE statement with criteria is constructed correctly
TEST_F(ScriptRemoveTest, DeleteWithCriteria) {
    Json::Value json;
    json["table"] = "employees";
    json["criteria"] = "WHERE age > 30";

    std::string expectedSQL = "DELETE FROM employees WHERE age > 30";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

// Test case to check if the DELETE statement with empty criteria is constructed correctly
TEST_F(ScriptRemoveTest, DeleteWithEmptyCriteria) {
    Json::Value json;
    json["table"] = "employees";
    json["criteria"] = "";

    std::string expectedSQL = "DELETE FROM employees ";
    EXPECT_EQ(SqlHelper::ScriptRemove(json), expectedSQL);
}

// Main function for test suite
int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
