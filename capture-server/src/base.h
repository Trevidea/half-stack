//base.h
#ifndef BASE_H
#define BASE_H

#include <json/json.h>
#include "handler.h"

class Base: public Handler
{
private:

public:
    Base() = default;
    Base(Json::Value& model);
    void report();
    std::string toString();
    std::string toResponse();
    ~Base();
protected:
    Json::Value m_model;
};

#endif //BASE_H