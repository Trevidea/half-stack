#include "connection-detail.h"

ConnectionDetail::ConnectionDetail() {}

int ConnectionDetail::id() { return m_model["id"].asInt(); }
void ConnectionDetail::setId(int id) { m_model["id"] = id; }
std::string ConnectionDetail::name() { return m_model["name"].asString(); }
void ConnectionDetail::setName(const std::string &name) { m_model["name"] = name; }
std::string ConnectionDetail::role() { return m_model["role"].asString(); }
void ConnectionDetail::setRole(const std::string &role) { m_model["role"] = role; }
std::string ConnectionDetail::location() { return m_model["location"].asString(); }
void ConnectionDetail::setLocation(const std::string &location) { m_model["location"] = location; }
std::string ConnectionDetail::device() { return m_model["device"].asString(); }
void ConnectionDetail::setDevice(const std::string &device) { m_model["device"] = device; }
std::string ConnectionDetail::deviceType() { return m_model["devicetype"].asString(); }
void ConnectionDetail::setDeviceType(const std::string &device) { m_model["devicetype"] = device; }
std::string ConnectionDetail::network() { return m_model["network"].asString(); }
void ConnectionDetail::setNetwork(const std::string &network) { m_model["network"] = network; }
std::string ConnectionDetail::quality() { return m_model["quality"].asString(); }
void ConnectionDetail::setQuality(const std::string &quality) { m_model["quality"] = quality; }
std::string ConnectionDetail::ipAddress() { return m_model["ipaddress"].asString(); }
void ConnectionDetail::setIpAddress(const std::string &ipAddress) { m_model["ipaddress"] = ipAddress; }
std::string ConnectionDetail::transmitStatus() { return m_model["transmitStatus"].asString(); }
void ConnectionDetail::setTransmitStatus(const std::string &transmitStatus) { m_model["transmitStatus"] = transmitStatus; }
int ConnectionDetail::filesReceived() { return m_model["filesReceived"].asInt(); }
void ConnectionDetail::setFilesReceived(int filesReceived) { m_model["filesReceived"] = filesReceived; }
int ConnectionDetail::retries() { return m_model["retries"].asInt(); }
void ConnectionDetail::setRetries(int retries) { m_model["retries"] = retries; }

int ConnectionDetail::direction() { return m_model["direction"].asInt(); }
void ConnectionDetail::setDirection(int direction) { m_model["direction"] = direction; }

std::string ConnectionDetail::pin() { return m_model["pin"].asString(); }
void ConnectionDetail::setPin(const std::string &pin) { m_model["pin"] = pin; }

int ConnectionDetail::deviceId() { return m_model["device_id"].asInt(); }
void ConnectionDetail::setDeviceId(int deviceId) { m_model["device_id"] = deviceId; }

std::string ConnectionDetail::appName() { return m_model["app_name"].asString(); }
void ConnectionDetail::setAppName(const std::string &appName) { m_model["app_name"] = appName; }

int ConnectionDetail::eventId() { return m_model["event_id"].asInt(); }
void ConnectionDetail::setEventId(int eventId) { m_model["event_id"] = eventId; }

std::string ConnectionDetail::streamName() { return m_model["stream_name"].asString(); }
void ConnectionDetail::setStreamName(const std::string &streamName) { m_model["stream_name"] = streamName; }