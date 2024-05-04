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
        m_model.set("id", value);
    }

    int userId() const
    {
        return this->m_model.get<int>("user_id");
    }

    void setUserId(int value)
    {
        m_model.set("user_id", value);
    }

    std::string networkQuality() const
    {
        return this->m_model.get<std::string>("network_quality");
    }

    void setNetworkQuality(const std::string &value)
    {
        m_model.set("network_quality", value);
    }

    std::string ipAddress() const
    {
        return this->m_model.get<std::string>("ip_add");
    }

    void setIpAddress(const std::string &value)
    {
        m_model.set("ip_add", value);
    }

    bool isDisabled() const
    {
        return this->m_model.get<bool>("is_disabled");
    }

    void setIsDisabled(bool value)
    {
        m_model.set("is_disabled", value);
    }

    std::string type() const
    {
        return this->m_model.get<std::string>("type");
    }

    void setType(const std::string &value)
    {
        m_model.set("type", value);
    }

    std::string dateTimeConnected() const
    {
        return this->m_model.get<std::string>("dtt_connected");
    }

    void setDateTimeConnected(const std::string &value)
    {
        m_model.set("dtt_connected", value);
    }

    std::string priority() const
    {
        return this->m_model.get<std::string>("priority");
    }

    void setPriority(const std::string &value)
    {
        m_model.set("priority", value);
    }

    std::string location() const
    {
        return this->m_model.get<std::string>("location");
    }

    void setLocation(const std::string &value)
    {
        m_model.set("location", value);
    }

    int eventId() const
    {
        return this->m_model.get<int>("event_id");
    }

    void setEventId(int value)
    {
        m_model.set("event_id", value);
    }

    void getDetails(const Request &request, Response &response);

    ~EventConnection();
};

#endif // CONNECTION_H