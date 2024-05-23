#ifndef LIVE_EVENT_HPP
#define LIVE_EVENT_HPP

#include <string>
#include <vector>
#include "base.h"
#include "connection-detail.h"

class LiveEvent:public Base {
private:

public:
    LiveEvent();

    std::string dtEvent();
    void setDtEvent(const std::string& dtEvent);
    std::string level();
    void setLevel(const std::string& level);
    std::string program();
    void setProgram(const std::string& program);
    std::string sport();
    void setSport(const std::string& sport);
    std::string status();
    void setStatus(const std::string& status);
    std::string title();
    void setTitle(const std::string& title);
    std::string detailCityAddress();
    void setDetailCityAddress(const std::string& cityAddress);
    std::string detailStreetAddress();
    void setDetailStreetAddress(const std::string& streetAddress);
    std::string detailType();
    void setDetailType(const std::string& type);
    int year();
    void setYear(int year);
    std::string venueLocation();
    void setVenueLocation(const std::string& location);
    int time();
    void setTime(int time);
    std::string type();
    void setType(const std::string& type);
    std::string countdown();
    void setCountdown(const std::string& countdown);
    std::vector<ConnectionDetail> connectionDetails();
    void setConnectionDetails(const std::vector<ConnectionDetail>& connectionDetails);
    // void setActiveDevices(const std::vector<EventDevice> &activeDevices);
};

#endif // LIVE_EVENT_HPP
