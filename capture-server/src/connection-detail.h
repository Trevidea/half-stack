#ifndef CONNECTION_DETAIL_HPP
#define CONNECTION_DETAIL_HPP

#include <string>
#include "base.h"

class ConnectionDetail: public Base {
private:

public:
    ConnectionDetail();

    int id();
    void setId(int id);
    std::string name();
    void setName(const std::string& name);
    std::string role();
    void setRole(const std::string& role);
    std::string location();
    void setLocation(const std::string& location);
    std::string device();
    void setDevice(const std::string& device);
    std::string deviceType();
    void setDeviceType(const std::string& device);
    std::string network();
    void setNetwork(const std::string& network);
    std::string quality();
    void setQuality(const std::string& quality);
    std::string ipAddress();
    void setIpAddress(const std::string& ipAddress);
    std::string transmitStatus();
    void setTransmitStatus(const std::string& transmitStatus);
    int filesReceived();
    void setFilesReceived(int filesReceived);
    int retries();
    void setRetries(int retries);

    int direction();
    void setDirection(int direction);

    std::string pin();
    void setPin(const std::string& pin);

    int deviceId();
    void setDeviceId(int deviceId);

    std::string appName();
    void setAppName(const std::string& appName);
};

#endif // CONNECTION_DETAIL_HPP
