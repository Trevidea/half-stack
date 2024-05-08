#include <gtest/gtest.h>
#include <json/json.h>
#include "sqlhelper.h"

TEST(SqlHelperTests, EmptyJson) {
    Json::Value json;
    std::string criteria = criteriaBuilder(json);
    EXPECT_EQ(criteria, "");
}

TEST(SqlHelperTests, SingleCriterion) {
    Json::Value json;
    json["criteria"][0]["field"] = "age";
    json["criteria"][0]["value"] = 25;
    std::string criteria = criteriaBuilder(json);
    EXPECT_EQ(criteria, "WHERE age = 25");
}

TEST(SqlHelperTests, MultipleCriteria) {
    Json::Value json;
    json["criteria"][0]["field"] = "age";
    json["criteria"][0]["value"] = 25;
    json["criteria"][1]["field"] = "name";
    json["criteria"][1]["value"] = "John";
    std::string criteria = criteriaBuilder(json);
    EXPECT_EQ(criteria, "WHERE age = 25 AND name = 'John'");
}

// Add more test cases as needed

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
