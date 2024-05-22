#include "model.h"

// Implementation of the constructor
Model::Model(const Json::Value &js) : m_result{js}
{
}

// Implementation of the destructor
Model::~Model()
{
}

// Implementation of the merge function
void Model::merge(Model &model)
{
    for (const auto &id : model.m_result.getMemberNames())
    {
        this->m_result[id] = model.m_result[id];
    }
}

// Implementation of the populate function
Json::Value Model::populate(Json::Value &templ) const
{
    Json::Value arr = Json::arrayValue;
    
    for (const auto &prop : this->m_result.getMemberNames())
    {
        if (prop == "id") continue;
        
        auto obj = std::find_if(templ.begin(), templ.end(), [&prop](Json::Value &obj)
                                { return obj["field"].asString() == prop; });
        if (obj != templ.end())
        {
            Json::Value js(*obj);
            js["value"] = this->m_result[prop];
            arr.append(js);
        }
    }
    return arr;
}
