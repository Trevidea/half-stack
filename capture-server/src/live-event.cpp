#include "live-event.h"

LiveEvent::LiveEvent()  {}

std::string LiveEvent::dtEvent() {
    return m_model["dtEvent"].asString();
}

void LiveEvent::setDtEvent(const std::string& dtEvent) {
    m_model["dtEvent"] = dtEvent;
}

std::string LiveEvent::level() {
    return m_model["level"].asString();
}

void LiveEvent::setLevel(const std::string& level) {
    m_model["level"] = level;
}

std::string LiveEvent::program() {
    return m_model["program"].asString();
}

void LiveEvent::setProgram(const std::string& program) {
    m_model["program"] = program;
}

std::string LiveEvent::sport() {
    return m_model["sport"].asString();
}

void LiveEvent::setSport(const std::string& sport) {
    m_model["sport"] = sport;
}

std::string LiveEvent::status() {
    return m_model["status"].asString();
}

void LiveEvent::setStatus(const std::string& status) {
    m_model["status"] = status;
}

std::string LiveEvent::title() {
    return m_model["title"].asString();
}

void LiveEvent::setTitle(const std::string& title) {
    m_model["title"] = title;
}

std::string LiveEvent::detailCityAddress() {
    return m_model["detail"]["cityAddress"].asString();
}

void LiveEvent::setDetailCityAddress(const std::string& cityAddress) {
    m_model["detail"]["cityAddress"] = cityAddress;
}

std::string LiveEvent::detailStreetAddress() {
    return m_model["detail"]["streetAddress"].asString();
}

void LiveEvent::setDetailStreetAddress(const std::string& streetAddress) {
    m_model["detail"]["streetAddress"] = streetAddress;
}

std::string LiveEvent::detailType() {
    return m_model["detail"]["type"].asString();
}

void LiveEvent::setDetailType(const std::string& type) {
    m_model["detail"]["type"] = type;
}

int LiveEvent::year() {
    return m_model["year"].asInt();
}

void LiveEvent::setYear(int year) {
    m_model["year"] = year;
}

std::string LiveEvent::venueLocation() {
    return m_model["venue"]["location"].asString();
}

void LiveEvent::setVenueLocation(const std::string& location) {
    m_model["venue"]["location"] = location;
}

int LiveEvent::time() {
    return m_model["time"].asInt();
}

void LiveEvent::setTime(int time) {
    m_model["time"] = time;
}

std::string LiveEvent::type() {
    return m_model["type"].asString();
}

void LiveEvent::setType(const std::string& type) {
    m_model["type"] = type;
}

std::string LiveEvent::countdown() {
    return m_model["countdown"].asString();
}

void LiveEvent::setCountdown(const std::string& countdown) {
    m_model["countdown"] = countdown;
}

std::vector<ConnectionDetail> LiveEvent::connectionDetails() {
    std::vector<ConnectionDetail> connectionDetails;
    for (const auto& detail : m_model["connectionDetails"]) {
        ConnectionDetail connectionDetail;
        connectionDetails.push_back(connectionDetail);
    }
    return connectionDetails;
}

void LiveEvent::setConnectionDetails(const std::vector<ConnectionDetail>& connectionDetails) {
    Json::Value details(Json::arrayValue);
    for (const auto& detail : connectionDetails) {
        // Convert ConnectionDetail objects to JSON and add to details
    }
    m_model["connectionDetails"] = details;
}