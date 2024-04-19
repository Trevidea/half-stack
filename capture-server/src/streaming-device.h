#ifndef STREAMING_DEVICE_H
#define STREAMING_DEVICE_H

#include <string>
#include <iostream> // Include for demo purposes

class StreamingDevice {
private:
    std::string m_deviceName;
    std::string m_streamKey;
    bool m_blocked;

public:
    // Constructors
    StreamingDevice() : m_blocked(false) {}
    StreamingDevice(const std::string& deviceName, const std::string& streamKey)
        : m_deviceName(deviceName), m_streamKey(streamKey), m_blocked(false) {}

    // Getter and setter for device name
    const std::string& deviceName() const { return m_deviceName; }
    void setDeviceName(const std::string& deviceName) { m_deviceName = deviceName; }

    // Getter and setter for stream key
    const std::string& streamKey() const { return m_streamKey; }
    void setStreamKey(const std::string& streamKey) { m_streamKey = streamKey; }

    // Getter and setter for blocked status
    bool blocked() const { return m_blocked; }
    void setBlocked(bool blocked) { m_blocked = blocked; }

    // Routes for device management
    void addDevice(const std::string& deviceName, const std::string& streamKey) {
        // Add device logic
        std::cout << "Adding device: " << deviceName << std::endl;
        // Example: Save device to database
    }

    void viewDevice() const {
        // View device logic
        std::cout << "Device Name: " << m_deviceName << ", Stream Key: " << m_streamKey << std::endl;
    }

    void deleteDevice() {
        // Delete device logic
        std::cout << "Deleting device: " << m_deviceName << std::endl;
        // Example: Remove device from database
    }

    void blockDevice() {
        // Block device logic
        m_blocked = true;
        std::cout << "Blocking device: " << m_deviceName << std::endl;
    }
};

#endif // STREAMING_DEVICE_H
