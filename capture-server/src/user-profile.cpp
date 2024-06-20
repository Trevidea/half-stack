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

    Gateway::instance().route("GET", "/api/user/account-info", // To request account info
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
        Json::Value account(Json::arrayValue);
        
        auto appendField = [&account](const std::string &field, int type, const std::string &value)
        {
            Json::Value fieldObject;
            fieldObject["field"] = field;
            fieldObject["type"] = type;
            fieldObject["value"] = value;
            account.append(fieldObject);
        };

        appendField("username", 1, "garry");
        appendField("firstName", 1, "Garry");
        appendField("lastName", 1, "Kart");
        appendField("email", 1, "gary@sp.com");
        appendField("phoneNumber", 1, "089089090");
        appendField("role", 1, "Coach");
        appendField("address", 1, "Union Street 123, Fairfort");
        appendField("profileImage", 1, "path/to/profile/image.jpg");

        Json::Value gatewayResponse;
        gatewayResponse["count"] = 1;
        gatewayResponse["result"].append(account);

        Json::FastWriter writer;
        std::string accountDetailsStr = writer.write(gatewayResponse);

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

        Json::Value userDetails(Json::arrayValue);
        if (username == "johndoe")
        {
            Json::Value field1;
            field1["field"] = "username";
            field1["type"] = 1; // string
            field1["value"] = "johndoe";
            userDetails.append(field1);

            Json::Value field2;
            field2["field"] = "firstName";
            field2["type"] = 1; // string
            field2["value"] = "John";
            userDetails.append(field2);

            Json::Value field3;
            field3["field"] = "lastName";
            field3["type"] = 1; // string
            field3["value"] = "Doe";
            userDetails.append(field3);

            Json::Value field4;
            field4["field"] = "email";
            field4["type"] = 1; // string
            field4["value"] = "johndoe@example.com";
            userDetails.append(field4);

            Json::Value field5;
            field5["field"] = "phoneNumber";
            field5["type"] = 1; // string
            field5["value"] = "123456789";
            userDetails.append(field5);

            Json::Value field6;
            field6["field"] = "role";
            field6["type"] = 1; // string
            field6["value"] = "User";
            userDetails.append(field6);

            Json::Value field7;
            field7["field"] = "address";
            field7["type"] = 1; // string
            field7["value"] = "123 Main Street, Anytown";
            userDetails.append(field7);

            Json::Value field8;
            field8["field"] = "profileImage";
            field8["type"] = 1; // string
            field8["value"] = "path/to/johndoe/image.jpg";
            userDetails.append(field8);
        }
        else
        {
            rsp.setData("User not found");
            rsp.setStatus(404); // Set the status code to 404 Not Found
            return;
        }

        Json::Value gatewayResponse(Json::objectValue);
        gatewayResponse["count"] = 1;
        gatewayResponse["result"].append(userDetails);

        Json::FastWriter writer;
        std::string userDetailsStr = writer.write(gatewayResponse);

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
