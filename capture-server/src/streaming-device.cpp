#include "streaming-device.h"
#include "gateway.h"
#include "response.h"
#include "request.h"
#include "json/json.h"
#include <cstdlib> // for rand() and srand()
#include <ctime>   // for time()
#include <random>
#include <sstream>

std::string generateUniqueDeviceID() {
    // Initialize random number generator
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dis(1, 99); // Range of 1-99 for 1 or 2-digit IDs

    // Generate random device ID
    int id = dis(gen);

    // Convert int to string
    std::stringstream ss;
    ss << id;

    return ss.str(); // Convert stringstream to string and return
}

StreamingDevice::StreamingDevice() : EntityBase("streaming_device") {}

StreamingDevice::~StreamingDevice() {}

void StreamingDevice::report() {
    EntityBase::report();

    Gateway::instance().route("POST", "/api/streaming-device", // To add a streaming device
                              [this](const Request &req, Response &rsp) {
                                  this->addStreamingDevice(req, rsp);
                              });

    Gateway::instance().route("GET", "/api/streaming-device/:id", // To view a streaming device
                              [this](const Request &req, Response &rsp) {
                                  this->viewStreamingDevice(req, rsp);
                              });

    Gateway::instance().route("DELETE", "/api/streaming-device/:id", // To delete a streaming device
                              [this](const Request &req, Response &rsp) {
                                  this->deleteStreamingDevice(req, rsp);
                              });

    Gateway::instance().route("PUT", "/api/streaming-device/:id/block", // To block a streaming device
                              [this](const Request &req, Response &rsp) {
                                  this->blockStreamingDevice(req, rsp);
                              });
}

void StreamingDevice::addStreamingDevice(const Request &req, Response &rsp) {
    // Assuming the request contains the device name and stream key in JSON format
    Json::Value requestData = req.json();

    // Extract device name and stream key from the request data
    std::string deviceName = requestData["device_name"].asString();
    std::string streamKey = requestData["stream_key"].asString();

    // Perform logic to add the streaming device, such as storing it in a database
    // For demonstration purposes, let's generate a unique device ID
    std::string deviceID = generateUniqueDeviceID(); // Use the generated ID here

    // Construct a JSON response containing the device ID and any other relevant information
    Json::Value responseData;
    responseData["device_id"] = deviceID;
    responseData["device_name"] = deviceName;
    responseData["stream_key"] = streamKey;

    // Set the response data
    rsp.setData(Json::FastWriter().write(responseData));
}

void StreamingDevice::viewStreamingDevice(const Request &req, Response &rsp) {
    // // Extract the device ID from the request path
    // std::string deviceID = req.queries().front().m_operand2;

    // // Fetch the device information based on the device ID (assuming you have a database)
    // std::string deviceName = fetchDeviceNameFromDatabase(deviceID); // Fetch device name from the database
    // std::string streamKey = fetchStreamKeyFromDatabase(deviceID);   // Fetch stream key from the database

    // // Construct a JSON response containing the device information
    // Json::Value responseData;
    // responseData["device_id"] = deviceID;
    // responseData["device_name"] = deviceName;
    // responseData["stream_key"] = streamKey;

    // // Set the response data
    // rsp.setData(Json::FastWriter().write(responseData));
}

void StreamingDevice::deleteStreamingDevice(const Request &req, Response &rsp) {
    
}

void StreamingDevice::blockStreamingDevice(const Request &req, Response &rsp) {
    
}
