#include "virtual-host.h"

VirtualHost::VirtualHost(const std::string &name, const vhost &vhost) : m_name(name),
                                                                              m_vhost(vhost),
                                                                              m_dumpsBaseLocation{DUMPS_BASE_LOCATION}
{

}

std::string VirtualHost::createStream(const std::string &app, const std::string &key, const OutputProfile &profile)
{
    return "";
}
std::vector<std::string> VirtualHost::getVODDumps()
{
    return std::vector<std::string>();
}

void VirtualHost::setVODDumps(const std::string &streamName, const std::string &relativeOutputPath)
{

}