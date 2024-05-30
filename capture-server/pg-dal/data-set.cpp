#include "data-set.h"
#include <spdlog/spdlog.h>

DataSet::DataSet(const Json::Value &jsonData) : json(jsonData) {}

int DataSet::count() const
{
    return json["count"].asInt();
}

DataSet::Iterator::Iterator(const Json::Value &resultData) : result(resultData), index{0} {}
DataSet::Iterator::Entry::Entry(const Json::Value &entr) : entry(entr) {}

bool DataSet::Iterator::hasNext() const
{
    return index < result.size();
}

DataSet::Iterator::Entry DataSet::Iterator::next()
{
    if (!hasNext())
    {
        return std::move(Entry(Json::nullValue));
    }
    std::string dat1 = Json::FastWriter().write(result);
    return std::move(Entry(result.get(static_cast<unsigned int>(index++), Json::Value::null)));
}

Json::Value DataSet::Iterator::Entry::getValue(const std::string &fieldName)
{
    for (const auto &obj : entry)
    {
        if (obj["field"].asString() == fieldName)
        {
            return obj["value"];
        }
    }
    return Json::nullValue;
}

DataSet::Iterator DataSet::iterator() const
{
    return Iterator(json["result"]);
}
