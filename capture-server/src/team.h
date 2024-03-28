#ifndef TEAM_H
#define TEAM_H

#include "entity-base.h" // Assuming this includes definitions for Request and Response
#include "gateway.h"     // Assuming this includes definitions for Gateway
#include <string>
#include <ctime>

// Class to represent Team entity
class Team : public EntityBase
{
public:
    Team();

    // Getter and setter functions for Team properties
    int getId() const
    {
        return this->id;
    }

    void setId(int id)
    {
        this->id = id;
    }

    const std::string &getName() const
    {
        return this->name;
    }

    void setName(const std::string &name)
    {
        this->name = name;
        this->m_model.set("name", name);
    }

    const std::string &getLogo() const
    {
        return this->logo;
    }

    void setLogo(const std::string &logo)
    {
        this->logo = logo;
        this->m_model.set("logo", logo);
    }

    const std::string &getCreatedAt() const
    {
        return this->createdAt;
    }

    void setCreatedAt(const std::string &createdAt)
    {
        this->createdAt = createdAt;
        this->m_model.set("createdAt", createdAt);
    }

    const std::string &getState() const
    {
        return this->state;
    }

    void setState(const std::string &state)
    {
        this->state = state;
        this->m_model.set("state", state);
    }

private:
    // Member variables
    int id;
    std::string name;
    std::string logo;
    std::string createdAt;
    std::string state;
};

#endif // TEAM_H
