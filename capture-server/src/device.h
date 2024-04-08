#ifndef DEVICE_H
#define DEVICE_H
#include "base.h"

class Device : public Base {
public:
    // Constructor
    Device(Json::Value& model);

    // Getter and Setter properties
    std::string user() const;
    void setUser(const std::string& value);

    std::string location() const;
    void setLocation(const std::string& value);

    std::string deviceId() const;
    void setDeviceId(const std::string& value);

    std::string deviceType() const;
    void setDeviceType(const std::string& value);

    std::string network() const;
    void setNetwork(const std::string& value);

private:
};

#endif // DEVICE_H
