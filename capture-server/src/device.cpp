#include "device.h"
Device::Device():Base(){}
Device::Device(Json::Value& model) : Base(model) {}

std::string Device::user() const {
    return m_model["user"].asString();
}

void Device::setUser(const std::string& value) {
    m_model["user"] = value;
}

std::string Device::location() const {
    return m_model["location"].asString();
}

void Device::setLocation(const std::string& value) {
    m_model["location"] = value;
}

std::string Device::deviceId() const {
    return m_model["deviceId"].asString();
}

void Device::setDeviceId(const std::string& value) {
    m_model["deviceId"] = value;
}

std::string Device::deviceType() const {
    return m_model["deviceType"].asString();
}

void Device::setDeviceType(const std::string& value) {
    m_model["deviceType"] = value;
}

std::string Device::network() const {
    return m_model["network"].asString();
}

void Device::setNetwork(const std::string& value) {
    m_model["network"] = value;
}