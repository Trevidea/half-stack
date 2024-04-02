#include "omal-factory.h"
#include "virtual-host.h" 

OMALFactory& OMALFactory::getInstance() {
    static OMALFactory instance;
    return instance;
}

VirtualHost& OMALFactory::create(const std::string& name) {
    auto it = virtualHostMap.find(name);
    if (it != virtualHostMap.end()) {
        return *it->second;
    } else {
        omal::vhost vhost; //Initialize it as required
        VirtualHost* newVirtualHost = new VirtualHost(name, vhost);
        virtualHostMap[name] = newVirtualHost;
        return *newVirtualHost;
    }
}

std::string OMALFactory::baseUrl()
{
}

OMALFactory::OMALFactory() {

    char endpointUrl[128] = {'\0'};
    snprintf(endpointUrl, 128, "http://%s:%s/v1", serverIP, port);
    this->m_endpointUrl = endpointUrl;
}