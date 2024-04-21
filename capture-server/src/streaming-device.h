// streaming-device.h
#ifndef STREAMING_DEVICE_H
#define STREAMING_DEVICE_H

#include <string>
#include <iostream> // Include for demo purposes
#include "device.h"

class StreamingDevice : public Device {
public:
    // Constructors
    StreamingDevice();
    StreamingDevice(const std::string& deviceName, const std::string& streamKey);

    // Routes for device management
    void addDevice(const std::string& deviceName, const std::string& streamKey);
    void viewDevice() const;
    void deleteDevice();
    void blockDevice();

private:
    bool m_blocked = false; // Define m_blocked member here
};

#endif // STREAMING_DEVICE_H
