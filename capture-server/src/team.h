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
    void report();

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

private:
    // Member variables
    int id;
    std::string name;
    std::string logo;
};

#endif // TEAM_H
