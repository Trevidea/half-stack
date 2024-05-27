#include "data-set.h"
#include <spdlog/spdlog.h>

DataSet::DataSet(const Json::Value& jsonData) : json(jsonData) {}

int DataSet::count() const {
    return json["count"].asInt();
}

DataSet::Iterator::Iterator(const Json::Value& resultData) : result(resultData) {}

bool DataSet::Iterator::hasNext() const {
    return index < result.size();
}

Json::Value DataSet::Iterator::next()  {
    if (!hasNext()) {
        throw std::out_of_range("Iterator reached the end");
    }
    return result.get(static_cast<unsigned int>(index++), Json::Value::null);
}

std::string DataSet::Iterator::getValue(const std::string& fieldName)  {
    const Json::Value& entry = next();
    return entry[fieldName].asString();
}

DataSet::Iterator DataSet::iterator() const {
    spdlog::trace("DataSet::json: {}", Json::FastWriter().write(json));
    return Iterator(json["result"]);
}
