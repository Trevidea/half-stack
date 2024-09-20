#ifndef METATYPE_H
#define METATYPE_H
#include "entity-base.h"

class MetaType: public EntityBase
{
private:

public:
    MetaType();
    void report();
    
    std::string name()
    {
        return this->m_model.get<std::string>("name");
    }
    std::string values()
    {
        return this->m_model.get<std::string>("values");
    }
    std::string key()
    {
        return this->m_model.get<std::string>("key");
    }
    ~MetaType();
};


#endif // METATYPE_H