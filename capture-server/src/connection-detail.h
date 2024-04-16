#ifndef CONNECTION_DETAIL_HPP
#define CONNECTION_DETAIL_HPP

#include <string>
#include "base.h"

enum class QualityEnum {
    Good,
    Average,
    Poor
};

enum class TransmitEnum {
    Receiving,
    Streaming
};

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
    std::string network();
    void setNetwork(const std::string& network);
    QualityEnum quality();
    void setQuality(QualityEnum quality);
    std::string ipAddress();
    void setIpAddress(const std::string& ipAddress);
    TransmitEnum transmitStatus();
    void setTransmitStatus(TransmitEnum transmitStatus);
    int filesReceived();
    void setFilesReceived(int filesReceived);
    int retries();
    void setRetries(int retries);
};

#endif // CONNECTION_DETAIL_HPP
