// device.h
#ifndef DEVICE_H
#define DEVICE_H

#include "entity-base.h"

class Device : public EntityBase {
public:
    Device();
    void report();
    
    std::string type() const {
        return this->m_model.get<std::string>("type");
    }

    void setType(const std::string &value) {
        m_model.set("type", value);
    }

    std::string name() const {
        return this->m_model.get<std::string>("name");
    }

    void setName(const std::string &value) {
        m_model.set("name", value);
    }

    std::string code() const {
        return this->m_model.get<std::string>("code");
    }

    void setCode(const std::string &value) {
        m_model.set("code", value);
    }

    ~Device();
};

#endif // DEVICE_H
