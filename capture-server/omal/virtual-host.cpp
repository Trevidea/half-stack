#include "virtual-host.h"
#include <filesystem>
#include <iostream>
#include <spdlog/spdlog.h>
#include <map>
#include "watcher.h"

namespace fs = std::filesystem;

VirtualHost::VirtualHost(const std::string &name, const vhost &vhost) : m_name(name),
                                                                        m_vhost(vhost),
                                                                        m_dumpsBaseLocation{DUMPS_BASE_LOCATION}
{
    //Start watching VOD dumps when initializing a VirtualHost instance
    watchVODDumps();
}

VirtualHost::~VirtualHost() {
    // Stop watching VOD dumps when destroying a VirtualHost instance
    stopWatchingVODDumps();
}

void VirtualHost::watchVODDumps() {
    auto callback = [this](const std::string& filename) {
        spdlog::info("Change detected in VOD dump folder: {}", filename);
        // Implement your logic to handle the change (e.g., process the new file)
    };

    m_watcher = std::make_unique<Watcher>(m_dumpsBaseLocation, callback);
    m_watcher->start();
}

void VirtualHost::stopWatchingVODDumps() {
    if (m_watcher) {
        m_watcher->stop();
        m_watcher.reset();
    }
}

std::string VirtualHost::createStream(const std::string &app, const std::string &key, const OutputProfile &profile)
{
    return "";
}
std::map<std::string, std::string> VirtualHost::getVODDumps()
{
    std::map<std::string, std::string> dumps;
    try
    {
        for (const auto &entry : fs::directory_iterator(this->m_dumpsBaseLocation))
        {
            if (fs::is_directory(entry.path()))
            {
                const auto startsWith = entry.path().filename().generic_string().substr(0, this->m_name.size());
                if (startsWith == this->m_name)
                {
                    dumps.insert({entry.path().generic_string(), entry.path().filename()});
                }
            }
        }
    }
    catch (const std::exception &e)
    {
        spdlog::error("Error getting VOD dumps location: {}", e.what());
    }
    return dumps;
}

void VirtualHost::setVODDumps(const std::string &streamName, const std::string &relativeOutputPath)
{

}

