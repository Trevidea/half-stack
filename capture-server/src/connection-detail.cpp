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
std::string ConnectionDetail::network() { return m_model["network"].asString(); }
void ConnectionDetail::setNetwork(const std::string &network) { m_model["network"] = network; }
QualityEnum ConnectionDetail::quality() { return static_cast<QualityEnum>(m_model["quality"].asInt()); }
void ConnectionDetail::setQuality(QualityEnum quality) { m_model["quality"] = static_cast<int>(quality); }
std::string ConnectionDetail::ipAddress() { return m_model["ipAddress"].asString(); }
void ConnectionDetail::setIpAddress(const std::string &ipAddress) { m_model["ipAddress"] = ipAddress; }
TransmitEnum ConnectionDetail::transmitStatus() { return static_cast<TransmitEnum>(m_model["transmitStatus"].asInt()); }
void ConnectionDetail::setTransmitStatus(TransmitEnum transmitStatus) { m_model["transmitStatus"] = static_cast<int>(transmitStatus); }
int ConnectionDetail::filesReceived() { return m_model["filesReceived"].asInt(); }
void ConnectionDetail::setFilesReceived(int filesReceived) { m_model["filesReceived"] = filesReceived; }
int ConnectionDetail::retries() { return m_model["retries"].asInt(); }
void ConnectionDetail::setRetries(int retries) { m_model["retries"] = retries; }
