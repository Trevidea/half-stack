#include "user-profile.h"
#include "gateway.h"
#include "db-manager.h"
#include "entity-base.h"

// Default constructor
UserProfile::UserProfile():  EntityBase("userprofile"){
    
}

void UserProfile::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/user-profiles", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/user-profile", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/user-profile", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/user-profile", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/user-profile", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/user/account", // To request account info
                              [this](const Request &req, Response &rsp)
                              {
                                  this->getAccountInfo(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/user/account/change-password", // To change password
                              [this](const Request &req, Response &rsp)
                              {
                                  this->changePassword(req, rsp);
                              });

}

void UserProfile::getAccountInfo(const Request &req, Response &rsp)
{
    try
    {
        Json::Value accountDetails(Json::arrayValue);

        // Account 1
        Json::Value account1(Json::arrayValue);
        Json::Value username1;
        username1["field"] = "username";
        username1["type"] = 1; // string
        username1["value"] = "garry";
        account1.append(username1);

        Json::Value firstName1;
        firstName1["field"] = "firstName";
        firstName1["type"] = 1; // string
        firstName1["value"] = "Garry";
        account1.append(firstName1);

        Json::Value lastName1;
        lastName1["field"] = "lastName";
        lastName1["type"] = 1; // string
        lastName1["value"] = "Kart";
        account1.append(lastName1);

        Json::Value email1;
        email1["field"] = "email";
        email1["type"] = 1; // string
        email1["value"] = "gary@sp.com";
        account1.append(email1);

        Json::Value phoneNumber1;
        phoneNumber1["field"] = "phoneNumber";
        phoneNumber1["type"] = 1; // string
        phoneNumber1["value"] = "089089090";
        account1.append(phoneNumber1);

        Json::Value role1;
        role1["field"] = "role";
        role1["type"] = 1; // string
        role1["value"] = "Coach";
        account1.append(role1);

        Json::Value address1;
        address1["field"] = "address";
        address1["type"] = 1; // string
        address1["value"] = "Union Street 123, Fairfort";
        account1.append(address1);

        Json::Value profileImage1;
        profileImage1["field"] = "profileImage";
        profileImage1["type"] = 1; // string
        profileImage1["value"] = "path/to/profile/image.jpg";
        account1.append(profileImage1);

        accountDetails.append(account1);

        // Account 2
        Json::Value account2(Json::arrayValue);
        Json::Value username2;
        username2["field"] = "username";
        username2["type"] = 1; // string
        username2["value"] = "jane";
        account2.append(username2);

        Json::Value firstName2;
        firstName2["field"] = "firstName";
        firstName2["type"] = 1; // string
        firstName2["value"] = "Jane";
        account2.append(firstName2);

        Json::Value lastName2;
        lastName2["field"] = "lastName";
        lastName2["type"] = 1; // string
        lastName2["value"] = "Doe";
        account2.append(lastName2);

        Json::Value email2;
        email2["field"] = "email";
        email2["type"] = 1; // string
        email2["value"] = "jane.doe@example.com";
        account2.append(email2);

        Json::Value phoneNumber2;
        phoneNumber2["field"] = "phoneNumber";
        phoneNumber2["type"] = 1; // string
        phoneNumber2["value"] = "123456789";
        account2.append(phoneNumber2);

        Json::Value role2;
        role2["field"] = "role";
        role2["type"] = 1; // string
        role2["value"] = "Manager";
        account2.append(role2);

        Json::Value address2;
        address2["field"] = "address";
        address2["type"] = 1; // string
        address2["value"] = "Elm Street 456, Somewhere";
        account2.append(address2);

        Json::Value profileImage2;
        profileImage2["field"] = "profileImage";
        profileImage2["type"] = 1; // string
        profileImage2["value"] = "path/to/profile/image2.jpg";
        account2.append(profileImage2);

        accountDetails.append(account2);

        // Account 3
        Json::Value account3(Json::arrayValue);
        Json::Value username3;
        username3["field"] = "username";
        username3["type"] = 1; // string
        username3["value"] = "john";
        account3.append(username3);

        Json::Value firstName3;
        firstName3["field"] = "firstName";
        firstName3["type"] = 1; // string
        firstName3["value"] = "John";
        account3.append(firstName3);

        Json::Value lastName3;
        lastName3["field"] = "lastName";
        lastName3["type"] = 1; // string
        lastName3["value"] = "Smith";
        account3.append(lastName3);

        Json::Value email3;
        email3["field"] = "email";
        email3["type"] = 1; // string
        email3["value"] = "john.smith@example.com";
        account3.append(email3);

        Json::Value phoneNumber3;
        phoneNumber3["field"] = "phoneNumber";
        phoneNumber3["type"] = 1; // string
        phoneNumber3["value"] = "987654321";
        account3.append(phoneNumber3);

        Json::Value role3;
        role3["field"] = "role";
        role3["type"] = 1; // string
        role3["value"] = "Developer";
        account3.append(role3);

        Json::Value address3;
        address3["field"] = "address";
        address3["type"] = 1; // string
        address3["value"] = "Maple Avenue 789, Anywhere";
        account3.append(address3);

        Json::Value profileImage3;
        profileImage3["field"] = "profileImage";
        profileImage3["type"] = 1; // string
        profileImage3["value"] = "path/to/profile/image3.jpg";
        account3.append(profileImage3);

        accountDetails.append(account3);

        Json::FastWriter writer;
        std::string accountDetailsStr = writer.write(accountDetails);

        rsp.setData(accountDetailsStr); // Use setData to set the response content
        rsp.setStatus(200); // Set the status code to 200 OK
    }
    catch (const std::exception &e)
    {
        spdlog::error("Failed to fetch account details: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Set the status code to 500 Internal Server Error
    }
}

void UserProfile::changePassword(const Request &req, Response &rsp) {
    try {
        // Parse the JSON request body
        Json::Value body;
        Json::Reader reader;
        if (!reader.parse(req.data(), body)) {
            rsp.setData("Invalid JSON");
            rsp.setStatus(400);
            return;
        }
        std::string currentPassword = body["currentPassword"].asString();
        std::string newPassword = body["newPassword"].asString();

        // Validate current password and update to new password
        // Replace this with actual database logic to validate and update the password
        if (currentPassword == "oldpassword") { // Simulating password validation
            // Simulating password update
            rsp.setData("Password changed successfully");
            rsp.setStatus(200); // Set the status code to 200 OK
        } else {
            rsp.setData("Current password is incorrect");
            rsp.setStatus(400); // Set the status code to 400 Bad Request
        }
    } catch (const std::exception &e) {
        spdlog::error("Failed to change password: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Set the status code to 500 Internal Server Error
    }
}

UserProfile::~UserProfile() {
    // Destructor implementation, if needed
}
