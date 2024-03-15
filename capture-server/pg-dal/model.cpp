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
    
    for (auto const &id : this->m_result.getMemberNames())
    {
        if(id == "id") continue;
        
        auto obj = std::find_if(templ.begin(), templ.end(), [&id](Json::Value &obj)
                                { return obj["field"].asString() == id; });
        if (obj != templ.end())
        {
            Json::Value js(*obj);
            js["value"] = this->m_result[id];
            arr.append(js);
        }
    }
    return arr;

}