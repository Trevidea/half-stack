#include "data-set.h"
#include <spdlog/spdlog.h>

DataSet::DataSet(const Json::Value &jsonData) : json(jsonData) {}

int DataSet::count() const
{
    return json["count"].asInt();
}

DataSet::Iterator::Iterator(const Json::Value &resultData) : result(resultData) {}

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
    std::string dat1 = Json::FastWriter().write(result);
    return result.get(static_cast<unsigned int>(index++), Json::Value::null);
}

Json::Value DataSet::Iterator::getValue(const std::string &fieldName)
{
    const Json::Value &entry = result.get(static_cast<unsigned int>(index), Json::Value::null);
    if (entry.isNull())
        return Json::nullValue;
    for (const auto &obj : entry)
    {
        if (obj["field"].asString() == fieldName)
        {
            return obj["value"];
        }
    }
    // If field not found, return an empty string
    return Json::nullValue;
}

DataSet::Iterator DataSet::iterator() const
{
    return Iterator(json["result"]);
}
