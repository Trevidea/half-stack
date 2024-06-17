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
    Gateway::instance().route("POST", "/api/user/account", // To post account info
                              [this](const Request &req, Response &rsp)
                              {
                                  this->postAccountInfo(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/user/account", // To get user details by username
                              [this](const Request &req, Response &rsp)
                              {
                                  this->getUserDetails(req, rsp);
                              });

}

void UserProfile::getAccountInfo(const Request &req, Response &rsp)
{
    try
    {
        Json::Value accountDetails(Json::arrayValue);

        Json::Value account(Json::arrayValue);
        Json::Value username;
        username["field"] = "username";
        username["type"] = 1; // string
        username["value"] = "garry";
        account.append(username);

        Json::Value firstName;
        firstName["field"] = "firstName";
        firstName["type"] = 1; // string
        firstName["value"] = "Garry";
        account.append(firstName);

        Json::Value lastName;
        lastName["field"] = "lastName";
        lastName["type"] = 1; // string
        lastName["value"] = "Kart";
        account.append(lastName);

        Json::Value email;
        email["field"] = "email";
        email["type"] = 1; // string
        email["value"] = "gary@sp.com";
        account.append(email);

        Json::Value phoneNumber;
        phoneNumber["field"] = "phoneNumber";
        phoneNumber["type"] = 1; // string
        phoneNumber["value"] = "089089090";
        account.append(phoneNumber);

        Json::Value role;
        role["field"] = "role";
        role["type"] = 1; // string
        role["value"] = "Coach";
        account.append(role);

        Json::Value address;
        address["field"] = "address";
        address["type"] = 1; // string
        address["value"] = "Union Street 123, Fairfort";
        account.append(address);

        Json::Value profileImage;
        profileImage["field"] = "profileImage";
        profileImage["type"] = 1; // string
        profileImage["value"] = "path/to/profile/image.jpg";
        account.append(profileImage);

        accountDetails.append(account);

        Json::FastWriter writer;
        std::string accountDetailsStr = writer.write(accountDetails);

        rsp.setData(accountDetailsStr); // Use setData to set the response content
        rsp.setStatus(200);             // Set the status code to 200 OK
    }
    catch (const std::exception &e)
    {
        spdlog::error("Failed to fetch account details: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Set the status code to 500 Internal Server Error
    }
}

void UserProfile::postAccountInfo(const Request &req, Response &rsp)
{
    try
    {
        // Parse the JSON request body
        Json::Value body;
        Json::Reader reader;
        if (!reader.parse(req.data(), body))
        {
            rsp.setData("Invalid JSON");
            rsp.setStatus(400);
            return;
        }

        std::string username = body["username"].asString();
        std::string email = body["email"].asString();
        std::string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Simulated token
        int expires_in = 3600; // Simulated expiration time in seconds

        Json::Value gatewayResponse;
        gatewayResponse["user"]["username"] = username;
        gatewayResponse["user"]["email"] = email;
        gatewayResponse["token"] = token;
        gatewayResponse["expires_in"] = expires_in;

        Json::FastWriter writer;
        std::string responseStr = writer.write(gatewayResponse);

        rsp.setData(responseStr); // Use setData to set the response content
        rsp.setStatus(200);       // Set the status code to 200 OK
    }
    catch (const std::exception &e)
    {
        spdlog::error("Failed to post account details: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Set the status code to 500 Internal Server Error
    }
}

void UserProfile::getUserDetails(const Request &req, Response &rsp)
{
    try
    {
        std::string username = req.getQueryValue("username");

        Json::Value userDetails;
        if (username == "johndoe")
        {
            userDetails["username"] = "johndoe";
            userDetails["firstName"] = "John";
            userDetails["lastName"] = "Doe";
            userDetails["email"] = "johndoe@example.com";
            userDetails["phoneNumber"] = "123456789";
            userDetails["role"] = "User";
            userDetails["address"] = "123 Main Street, Anytown";
            userDetails["profileImage"] = "path/to/johndoe/image.jpg";
        }
        else
        {
            rsp.setData("User not found");
            rsp.setStatus(404); // Set the status code to 404 Not Found
            return;
        }

        Json::FastWriter writer;
        std::string userDetailsStr = writer.write(userDetails);

        rsp.setData(userDetailsStr); // Use setData to set the response content
        rsp.setStatus(200);          // Set the status code to 200 OK
    }
    catch (const std::exception &e)
    {
        spdlog::error("Failed to fetch user details: {}", e.what());
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
