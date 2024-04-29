#ifndef VIRTUALHOST_H
#define VIRTUALHOST_H

#include <string>
#include "virtual-host-conf.h" 
#include "output-profile.h"
#include <map>
#include "watcher.h"
#include "network-quality-assessment.h"

class OMALFactory;


class VirtualHost {
public:
    const char *DUMPS_BASE_LOCATION = "/tmp/ovenmediaengine/vod_dumps";
    // const char *DUMPS_BASE_LOCATION = "/usr/share/ovenmediaengine/conf/html";
    friend class OMALFactory;

    /// @brief Creates a stream in the specified application with the key provided by the function user
    /// @param app The name of the application within which the stream has to be created
    /// @param key The key to be used to create the stream, that shall be used by the RTMP device
    /// @param profile The profile to be created for the stream, to be used for encoding and other recording configurations
    /// @return returns the stream-key that the device will use
    std::string createStream(const std::string &app, const std::string &key, const OutputProfile &profile);

    /// @brief Gets the locations of all the VOD dumps know to the OMAL
    /// @return a collection
    std::map<std::string, std::string> getVODDumps();

    /// @brief https://airensoft.gitbook.io/ovenmediaengine/streaming/low-latency-hls#dump
    /// @param streamName 
    /// @param relativeOutputPath 
    /// @return 
    void setVODDumps(const std::string &streamName, const std::string &relativeOutputPath);

    // Destructor declaration
    ~VirtualHost();

private:
    VirtualHost(const std::string& name, const vhost& vhost);

private:
    std::string m_name;
    vhost m_vhost;
    std::string m_dumpsBaseLocation;
};

#endif // VIRTUALHOST_H
