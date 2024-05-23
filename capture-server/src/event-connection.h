// connections.h
#ifndef EVENTCONNECTION_H
#define EVENTCONNECTION_H

#include "entity-base.h"

class EventConnection : public EntityBase
{
public:
    EventConnection();
    void report();

    int id() const
    {
        return this->m_model.get<int>("id");
    }

    void setId(int value)
    {
        m_model.set(value, "id");
    }

    int userId() const
    {
        return this->m_model.get<int>("user_id");
    }

    void setUserId(int value)
    {
        m_model.set(value, "user_id");
    }

    std::string networkQuality() const
    {
        return this->m_model.get<std::string>("network_quality");
    }

    void setNetworkQuality(const std::string &value)
    {
        m_model.set(value, "network_quality");
    }

    std::string ipAddress() const
    {
        return this->m_model.get<std::string>("ip_add");
    }

    void setIpAddress(const std::string &value)
    {
        m_model.set(value, "ip_add");
    }

    bool isDisabled() const
    {
        return this->m_model.get<bool>("is_disabled");
    }

    void setIsDisabled(bool value)
    {
        m_model.set(value, "is_disabled");
    }

    std::string type() const
    {
        return this->m_model.get<std::string>("type");
    }

    void setType(const std::string &value)
    {
        m_model.set(value, "type");
    }

    std::string dateTimeConnected() const
    {
        return this->m_model.get<std::string>("dtt_connected");
    }

    void setDateTimeConnected(const std::string &value)
    {
        m_model.set(value, "dtt_connected");
    }

    std::string priority() const
    {
        return this->m_model.get<std::string>("priority");
    }

    void setPriority(const std::string &value)
    {
        m_model.set(value, "priority");
    }

    std::string location() const
    {
        return this->m_model.get<std::string>("location");
    }

    void setLocation(const std::string &value)
    {
        m_model.set(value, "location");
    }

    int eventId() const
    {
        return this->m_model.get<int>("event_id");
    }

    void setEventId(int value)
    {
        m_model.set(value, "event_id");
    }

    void getDetails(const Request &request, Response &response);

    ~EventConnection();
};

#endif // CONNECTION_H