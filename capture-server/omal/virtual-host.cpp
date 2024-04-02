#include "virtual-host.h"

VirtualHost::VirtualHost(const std::string& name, const omal::vhost& vhost) : m_name(name), m_vhost(vhost) {}


std::string VirtualHost::createStream(const std::string &app, const std::string &key, const OutputProfile &profile)
{
    return "";
    
}
