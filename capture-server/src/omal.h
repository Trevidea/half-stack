#ifndef OMAL_H
#define OMAL_H
#include <iostream>
#include "entity-base.h"
#include "watcher.h"
#include "request.h"
#include "response.h"
#include "virtual-host.h"
#include "virtual-app.h"
#include "omal-factory.h"
    
class Omal : public EntityBase
{
private:
    std::unique_ptr<Watcher> m_vodDumpWatcher; // Member variable to hold the Watcher instance

public:
    Omal();
    void report();
    void assessNetworkQuality(const Request &req, Response &rsp);
    void handleControlServerRequest(const Request &req, Response &rsp);

    ~Omal();

private:
    void openPreview(const Request &req, Response &rsp);
    std::vector<std::string> fetchStreamsList(const std::string &eventId);
    Json::Value fetchStreamInfo(const std::string &eventId, const std::string &streamKey);
};

#endif // OMAL_H