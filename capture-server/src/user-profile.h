#ifndef USER_H
#define USER_H

#include <iostream>
#include "entity-base.h"

class UserProfile:public EntityBase {
private:


public:
    UserProfile(); 
    void report();

    int id() const { return m_model.get<int>("id"); }
    std::string dob() const { return m_model.get<std::string>("dob"); }
    std::string notifications() const { return m_model.get<std::string>("notifications"); }
    std::string email() const { return m_model.get<std::string>("email"); }
    std::string phone() const { return m_model.get<std::string>("phone"); }
    std::string role() const { return m_model.get<std::string>("role"); }
    std::string address() const { return m_model.get<std::string>("address"); }
    std::string gender() const { return m_model.get<std::string>("gender"); }
    std::string firstname() const { return m_model.get<std::string>("firstname"); }
    std::string lastname() const { return m_model.get<std::string>("lastname"); }

    ~UserProfile();
};
#endif // USER_H
