#include "virtual-host.h"
#include <filesystem>
#include <iostream>
#include <spdlog/spdlog.h>

namespace fs = std::filesystem;

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
    std::vector<std::string> dumps;
    try
    {
        for (const auto &entry : fs::directory_iterator(this->m_dumpsBaseLocation))
        {
            if(fs::is_directory(entry.path()))
            {
                dumps.push_back(entry.path().generic_string());
            }
        }
        
    }
    catch(const std::exception& e)
    {
        spdlog::error("Error getting VOD dumps location: {}", e.what());
    }
    return dumps;
}

void VirtualHost::setVODDumps(const std::string &streamName, const std::string &relativeOutputPath)
{

}