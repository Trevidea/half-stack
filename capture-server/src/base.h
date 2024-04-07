#ifndef BASE_H
#define BASE_H

#include <json/json.h>
#include "handler.h"

class Base: public Handler
{
private:
    
public:
    Base(Json::Value& model);
    void report();
    ~Base();
protected:
    Json::Value& m_model;
};



#endif //BASE_H