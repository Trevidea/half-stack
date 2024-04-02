#ifndef OMALFACTORY_H
#define OMALFACTORY_H

#include <string>
#include <map>
#include "virtual-host-data.h"

class VirtualHost;

class OMALFactory {
public:
    static OMALFactory& getInstance();

    VirtualHost& create(const std::string& name);
    std::string baseUrl();

    OMALFactory(const OMALFactory&) = delete;
    void operator=(const OMALFactory&) = delete;
private:
    OMALFactory();

private:
    const char* serverIP = "localhost";
    const char *port = "8081";
    std::string m_endpointUrl;
    std::map<std::string, VirtualHost*> virtualHostMap;
};

#endif // OMALFACTORY_H