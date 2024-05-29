#include "data-set.h"
#include <spdlog/spdlog.h>

DataSet::DataSet(const Json::Value &jsonData) : json(jsonData) {}

int DataSet::count() const
{
    return json["count"].asInt();
}

DataSet::Iterator::Iterator(const Json::Value &resultData) : result(resultData), index(0) {}

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

Json::Value DataSet::Iterator::getValue(const std::string &fieldName) const
{
    if (index == 0 || index > result.size())
    {
        return Json::nullValue;
    }
    const Json::Value &entry = result[static_cast<unsigned int>(index - 1)];
    if (entry.isObject() && entry.isMember(fieldName))
    {
        return entry[fieldName];
    }
    return Json::nullValue;
}

DataSet::Iterator DataSet::iterator() const
{
    return Iterator(json["result"]);
}