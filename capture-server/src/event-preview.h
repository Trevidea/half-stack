#ifndef EVENTPREVIEW_H
#define EVENTPREVIEW_H

#include "base.h"
#include "event-device.h" // Include EventDevice header
#include <vector>

class EventPreview : public Base {
public:
    void report() override;
    EventPreview() = default;
    EventPreview(Json::Value &model);

    // Getter and Setter properties

    std::string dtEvent() const;
    void setDtEvent(const std::string &value);

    std::string level() const;
    void setLevel(const std::string &value);

    std::string program() const;
    void setProgram(const std::string &value);

    std::string sport() const;
    void setSport(const std::string &value);

    std::string status() const;
    void setStatus(const std::string &value);

    std::string title() const;
    void setTitle(const std::string &value);

    std::string cityAddress() const;
    void setCityAddress(const std::string &value);

    std::string streetAddress() const;
    void setStreetAddress(const std::string &value);

    std::string detailType() const;
    void setDetailType(const std::string &value);

    std::string venueLocation() const;
    void setVenueLocation(const std::string &value);

    int year() const;
    void setYear(int value);

    int time() const;
    void setTime(int value);

    std::string eventType() const;
    void setEventType(const std::string &value);

    std::string countdown() const;
    void setCountdown(const std::string &value);

    // ActiveDevice array
    std::vector<EventDevice> &activeDevices();
    const std::vector<EventDevice> &activeDevices() const;

    void setActiveDevices(const std::vector<EventDevice>& activeDevices);

private:
    std::vector<EventDevice> m_activeDevice;
};

#endif // EVENTPREVIEW_H
