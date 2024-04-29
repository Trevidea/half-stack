#ifndef OMAL_H
#define OMAL_H
#include <iostream>
#include "entity-base.h"
#include "watcher.h"

class Omal: public EntityBase
{
private:
    std::unique_ptr<Watcher> m_vodDumpWatcher; // Member variable to hold the Watcher instance

public:
    Omal();
    void report();
    void assessNetworkQuality(const Request &req, Response &rsp);
    ~Omal();
};


#endif // OMAL_H