#include "model.h"

Model::Model(const Json::Value &js) : m_result{js}
{
}

Model::~Model()
{
}
void Model::merge(Model &model)
{
    for (auto const &id : model.m_result.getMemberNames())
    {
        this->m_result[id] = model.m_result[id];
    }
}
Json::Value Model::populate(Json::Value &templ) const
{
    Json::Value arr = Json::arrayValue;
    
    for (auto const &prop : this->m_result.getMemberNames())
    {
        if(prop == "id") continue;
        
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