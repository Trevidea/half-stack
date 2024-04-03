#ifndef USER_H
#define USER_H

#include <string>

class User {
private:
    std::string username;
    std::string email;
    bool confirmed;

public:
    // Constructors
    User(); // Default constructor
    User(const std::string &username, const std::string &email, bool confirmed);

    // Destructor
    ~User();

    // Getters and Setters
    const std::string& getUsername() const;
    void setUsername(const std::string &username);
    
    const std::string& getEmail() const;
    void setEmail(const std::string &email);

    bool isConfirmed() const;
    void setConfirmed(bool confirmed);

    // Method to retrieve user ID by username
    int getUserIdByUsername(const std::string &username);
};

#endif // USER_H
