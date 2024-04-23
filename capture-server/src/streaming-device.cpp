// streaming-device.cpp
#include "streaming-device.h"

StreamingDevice::StreamingDevice() {}

StreamingDevice::StreamingDevice(const std::string& deviceName, const std::string& streamKey)
    : Device(), m_blocked(false) {
    // Set device properties using inherited methods
    setUser(deviceName);
    setDeviceId(streamKey);
}

void StreamingDevice::addDevice(const std::string& deviceName, const std::string& streamKey) {
    // Implement addDevice using inherited methods from Device class
    setUser(deviceName);
    setDeviceId(streamKey);
    std::cout << "Adding device: " << deviceName << std::endl;
    // Example: Save device to database
}

void StreamingDevice::viewDevice() const {
    // Implement viewDevice using inherited methods from Device class
    std::cout << "Device Name: " << user() << ", Stream Key: " << deviceId() << std::endl;
}

void StreamingDevice::deleteDevice() {
    // Implement deleteDevice using inherited methods from Device class
    std::cout << "Deleting device: " << user() << std::endl;
    // Example: Remove device from database
}

void StreamingDevice::blockDevice() {
    // Implement blockDevice using inherited methods from Device class
    m_blocked = true; // Set m_blocked to true
    std::cout << "Blocking device: " << user() << std::endl;
}
