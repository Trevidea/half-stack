#ifndef MODEL_H
#define MODEL_H

#include <iostream>
#include "json/json.h"
#include "spdlog/spdlog.h"

class Model
{
private:
    Json::Value m_result;

public:
    Model() = default;
    Model(const Json::Value &js);

    template<typename T>
    T get(const std::string &field) const;

    // Specialization for Json::Value
    template<>
    Json::Value get<Json::Value>(const std::string &field) const
    {
        return m_result[field];
    }

    template<typename T>
    void set(const std::string &field, T val)
    {
        this->m_result[field] = val;
    }

    void merge(Model &model);
    Json::Value populate(Json::Value &templ) const;
    std::string toString() const
    {
        Json::FastWriter fw;
        return fw.write(this->m_result);
    }

    ~Model();
};

// Template method definition
template<typename T>
T Model::get(const std::string &field) const
{
    return m_result[field].as<T>();
}

#endif // MODEL_H
