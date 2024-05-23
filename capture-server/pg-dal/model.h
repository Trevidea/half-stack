#ifndef MODEL_H
#define MODEL_H
#include <iostream>
#include "json/json.h"
#include "spdlog/spdlog.h"
#include "stringutils.h"

class Model
{
private:
    Json::Value m_result;

public:
    Model() = default;
    Model(const Json::Value &js);

    template <typename T>
    T get(const std::string &field) const
    {
        return m_result[field].as<T>();
    }

    template <typename T, typename... Args>
    T get(const std::string &field, Args... args) const
    {
        return Model(m_result[field]).get<T>(args...);
    }

    template <typename T>
    void set(T val, const std::string &&field)
    {
        this->m_result[field] = val;
    }
    template <typename T, typename... Args>
    void set(T val, const std::string &&field, Args... args)
    {
        Json::Value obj = Json::objectValue;
        this->m_result[field] = obj;
        Model(this->m_result[field]).set(args..., val);
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

#endif // MODEL_H