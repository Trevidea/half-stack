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

void UserProfile::getAccountInfo(const Request &req, Response &rsp) {
    try {
        std::string accountDetails = R"(
        {
            "username": "garry",
            "firstName": "Garry",
            "lastName": "Kart",
            "email": "gary@sp.com",
            "phoneNumber": "089089090",
            "role": "Coach",
            "address": "Union Street 123, Fairfort",
            "profileImage": "path/to/profile/image.jpg"
        })";
        rsp.setData(accountDetails); // Use setData to set the response content
        rsp.setStatus(200); // Set the status code to 200 OK
    } catch (const std::exception &e) {
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
