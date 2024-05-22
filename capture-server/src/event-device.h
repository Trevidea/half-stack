// event-device.h
#ifndef EVENTDEVICE_H
#define EVENTDEVICE_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"
#include "sqlhelper.h"
#include "gateway.h"

class EventDevice : public EntityBase
{
public:
    // Constructors
    EventDevice();
    void report();
    EventDevice(Json::Value &model);

    // Getter and Setter properties
    int userId() const;
    void setUserId(int value);

    std::string streamName() const;
    void setStreamName(const std::string &value);

    int deviceId() const;
    void setDeviceId(int value);

    std::string deviceType() const;
    void setDeviceType(const std::string &value);

    std::string status() const;
    void setStatus(const std::string &value);

    std::string location() const;
    void setLocation(const std::string &value);

    std::string network() const;
    void setNetwork(const std::string &value);

    int eventId() const;
    void setEventId(int value);

    std::string pin() const;
    void setPin(const std::string &value);

    std::string streamId() const;
    void setStreamId(const std::string &value);

    std::string ipAdd() const;
    void setIpAdd(const std::string &value);
    // // Modified list function to filter devices by eventId
    // std::vector<EventDevice> list(int eventId);

    // Method to check if the combination exists
    bool combinationExists(int eventId, int userId, const std::string &pin);

private:
};

#endif // EVENTDEVICE_H
