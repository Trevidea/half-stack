#include "data-set.h"
#include <spdlog/spdlog.h>
#include <json/json.h>

DataSet::DataSet(const Json::Value &jsonData) : json(jsonData) {}

int DataSet::count() const
{
    return json["count"].asInt();
}

DataSet::Iterator::Iterator(const Json::Value &resultData) 
    : result(resultData.isArray() && resultData.size() > 0 && resultData[0].isArray() ? resultData[0] : resultData), index(0) {}

bool DataSet::Iterator::hasNext() const
{
    return index < result.size();
}

Json::Value DataSet::Iterator::next()
{
    if (!hasNext())
    {
        return Json::nullValue;
    }
    return result[static_cast<unsigned int>(index++)];
}

Json::Value DataSet::Iterator::getValue(const std::string &fieldName)
{
    if (index == 0 || index > result.size())
    {
        return Json::nullValue;
    }

    const Json::Value &entry = result[static_cast<unsigned int>(index - 1)];
    for (const auto &obj : entry)
    {
        if (obj["field"].asString() == fieldName)
        {
            return obj["value"];
        }
    }
    // If field not found, return a null value
    return Json::nullValue;
}

DataSet::Iterator DataSet::iterator() const
{
    return Iterator(json["result"]);
}
