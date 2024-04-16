#include "omal-factory.h"
#include "virtual-host.h" 
#include "virtual-host-conf.h"
#include "network-quality-assessment.h"

OMALFactory& OMALFactory::getInstance() {
    static OMALFactory instance;
    return instance;
}

VirtualHost& OMALFactory::create(const std::string& name) {
    auto it = virtualHostMap.find(name);
    if (it != virtualHostMap.end()) {
        return *it->second;
    } else {
        //Find out if OME has a vhost by this name. 
        //If it has, then just add the vhost here 
        //else create one in ome first and then add here 
        //and finally return the reference
        VirtualHost* newVirtualHost = new VirtualHost(name, vhost());
        virtualHostMap[name] = newVirtualHost;
        return *newVirtualHost;
    }
}

std::string OMALFactory::baseUrl()
{
    return this->m_endpointUrl;
}

OMALFactory::OMALFactory() {

    char endpointUrl[128] = {'\0'};
    snprintf(endpointUrl, 128, "http://%s:%s/v1", serverIP, port);
    this->m_endpointUrl = endpointUrl;
}
