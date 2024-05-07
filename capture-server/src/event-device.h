// event-device.h
#ifndef EVENTDEVICE_H
#define EVENTDEVICE_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h" 
#include "sqlhelper.h"
#include "gateway.h"

class EventDevice : public EntityBase {
public:
    // Constructors
    EventDevice();
    void report();
    EventDevice(Json::Value& model);
    void find(const Request &request, Response &response);

    // Getter and Setter properties
    int userId() const;
    void setUserId(int value);

    std::string name() const;
    void setName(const std::string& value);

    int deviceId() const;
    void setDeviceId(int value);

    std::string deviceType() const;
    void setDeviceType(const std::string& value);

    std::string status() const;
    void setStatus(const std::string& value);

    std::string location() const;
    void setLocation(const std::string& value);

    std::string network() const;
    void setNetwork(const std::string& value);

    int eventId() const;
    void setEventId(int value);

    std::string pin() const;
    void setPin(const std::string& value);

    // Method to check if the combination exists
    bool combinationExists(int eventId, int userId, const std::string& pin);

private:
};

#endif // EVENTDEVICE_H

