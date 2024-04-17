#ifndef OMAL_H
#define OMAL_H
#include <iostream>
#include "entity-base.h"

class Omal: public EntityBase
{
private:

public:
    Omal();
    void report();
    void assessNetworkQuality(const Request &req, Response &rsp);
    ~Omal();
};


#endif // OMAL_H