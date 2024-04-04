#include "user.h"
#include "gateway.h"
#include "db-manager.h"

// Default constructor
User::User() {
    confirmed = false; // Default value for confirmation status
}

// Parameterized constructor
User::User(const std::string &username, const std::string &email, bool confirmed) {
    this->username = username;
    this->email = email;
    this->confirmed = confirmed;
}

// Destructor
User::~User() {
    // Destructor implementation, if needed
}

// Getter for username
const std::string& User::getUsername() const {
    return username;
}

// Setter for username
void User::setUsername(const std::string &username) {
    this->username = username;
}

// Getter for email
const std::string& User::getEmail() const {
    return email;
}

// Setter for email
void User::setEmail(const std::string &email) {
    this->email = email;
}

// Getter for confirmation status
bool User::isConfirmed() const {
    return confirmed;
}

// Setter for confirmation status
void User::setConfirmed(bool confirmed) {
    this->confirmed = confirmed;
}

// Method to retrieve user ID by username
int User::getUserIdByUsername(const std::string &username) {
    // Implementation to retrieve user ID from database or other source
    int userId = DBManager::instance().getUserIdByUsername(username);
    return userId;
}
