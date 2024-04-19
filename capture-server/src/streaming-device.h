#ifndef STREAMING_DEVICE_H
#define STREAMING_DEVICE_H

#include <iostream>
#include "entity-base.h"

class StreamingDevice : public EntityBase {
private:
    std::string m_deviceID;
    std::string m_streamKey;
    int m_eventID;

public:
    StreamingDevice();
    StreamingDevice(const std::string &deviceID, const std::string &streamKey, int eventID);
    void report() override;
    std::string deviceID() const;
    void setDeviceID(const std::string &deviceID);
    std::string streamKey() const;
    void setStreamKey(const std::string &streamKey);
    int eventID() const;
    void setEventID(int eventID);
    ~StreamingDevice();

    void addStreamingDevice(const Request &req, Response &rsp);
    void viewStreamingDevice(const Request &req, Response &rsp);
    void deleteStreamingDevice(const Request &req, Response &rsp);
    void blockStreamingDevice(const Request &req, Response &rsp);

};

#endif // STREAMING_DEVICE_H
