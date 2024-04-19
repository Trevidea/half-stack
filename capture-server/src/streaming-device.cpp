#include "streaming-device.h"
#include <iostream> // Include for demo purposes

void addDeviceRoute(StreamingDevice& device) {
    std::string deviceName, streamKey;

    // Prompt user to enter device_name
    std::cout << "Enter device_name: ";
    std::getline(std::cin, deviceName);

    // Prompt user to enter stream_key
    std::cout << "Enter stream_key: ";
    std::getline(std::cin, streamKey);

    // Add device using entered device_name and stream_key
    device.addDevice(deviceName, streamKey);
}

void viewDeviceRoute(const StreamingDevice& device) {
    device.viewDevice();
}

void deleteDeviceRoute(StreamingDevice& device) {
    device.deleteDevice();
}

void blockDeviceRoute(StreamingDevice& device) {
    device.blockDevice();
}

int main() {
    // Create a device instance
    StreamingDevice device;

    // Call addDeviceRoute to add a streaming device
    addDeviceRoute(device);

    // View device route
    viewDeviceRoute(device);

    // Delete device route
    deleteDeviceRoute(device);

    // Block device route
    blockDeviceRoute(device);

    return 0;
}
