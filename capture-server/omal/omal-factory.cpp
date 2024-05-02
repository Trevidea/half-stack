#include "omal-factory.h"
#include "virtual-host.h"
#include "virtual-host-conf.h"
#include "network-quality-assessment.h"
#include "client-factory.h"
#include "omal-exceptions.h"
#include "db-manager.h"
#include "iostream"

OMALFactory &OMALFactory::getInstance()
{
    static OMALFactory instance;
    return instance;
}
int OMALFactory::createOrFind(const std::string &name, char const *err)
{
    char ep[128] = { '\0' };
    const std::string baseUrl = DBManager::instance().getEnv("OM_URL", "http://drake.in:1437/v1");
    snprintf(ep, 128, "%s/vhosts", baseUrl.c_str());
    auto rest = Rest::ClientFactory::getInstance().create(ep);
    rest.get([](const std::string &result){
        
    }, [&err](const std::string &error){
        err = error.c_str();
    });
    err = (char*)"no error";
    return 1;
}
VirtualHost &OMALFactory::create(const std::string &name)
{
    auto it = virtualHostMap.find(name);
    if (it != virtualHostMap.end())
    {
        return *it->second;
    }
    else
    {
        char err[256] = {'\0'};
        if (createOrFind(name, err))
        {
            VirtualHost *newVirtualHost = new VirtualHost(name, omal::vhost());
            virtualHostMap[name] = newVirtualHost;
            return *newVirtualHost;
        }
        else
            throw ExVHostCreationException(err);
    }
}

std::string OMALFactory::baseUrl()
{
    return this->m_endpointUrl;
}

OMALFactory::OMALFactory()
{

    char endpointUrl[128] = {'\0'};
    snprintf(endpointUrl, 128, "http://%s:%s/v1", serverIP, port);
    this->m_endpointUrl = endpointUrl;
}
