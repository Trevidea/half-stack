#ifndef COACH_H
#define COACH_H

#include "entity-base.h"
#include <string>

class Coach : public EntityBase
{
public:
    Coach();
    void report();

    // Accessor methods
    int id() const;
    std::string sport() const;
    std::string title() const;
    std::string program() const;
    std::string year() const;
    std::string first_name() const;
    std::string last_name() const;
    std::string mobile() const;
    std::string email() const;

    ~Coach();
};

#endif // COACH_H
