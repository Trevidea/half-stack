#ifndef VIRTUALHOST_H
#define VIRTUALHOST_H

#include <string>
#include "virtual-host-data.h" 
#include "output-profile.h"

class OMALFactory;

class VirtualHost {
public:
    friend class OMALFactory;

    /// @brief Creates a stream in the specified application with the key provided by the function user
    /// @param app The name of the application within which the stream has to be created
    /// @param key The key to be used to create the stream, that shall be used by the RTMP device
    /// @param profile The profile to be created for the stream, to be used for encoding and other recording configurations
    /// @return returns the stream-key that the device will use
    std::string createStream(const std::string &app, const std::string &key, const OutputProfile &profile);
private:
    VirtualHost(const std::string& name, const omal::vhost& vhost);

private:
    std::string m_name;
    omal::vhost m_vhost;
};

#endif // VIRTUALHOST_H
