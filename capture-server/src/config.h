#ifndef CONFIG_H
#define CONFIG_H
#include <iostream>
#include "entity-base.h"


class Config: public EntityBase
{
private:

public:
    Config();
    void report();
    std::string key()
    {
        return this->m_model.get<std::string>("key");
    }
    std::string value()
    {
        return this->m_model.get<std::string>("value");
    }
    ~Config();
};


#endif // CONFIG_H