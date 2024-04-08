#include "jsonresult.h"
#include <iostream>
#include <pqxx/field.hxx>
#include <vector>

JsonResult::JsonResult(const pqxx::result &result) : m_result{result}
{
}

JsonResult::~JsonResult()
{
}

void JsonResult::setValue(Json::Value &json, const pqxx::field &field)
{
    Json::Value obj = Json::objectValue;
    obj["field"] = field.name();

    switch (field.type())
    {
    case 20:
    case 23: // bigint
        obj["value"] = field.is_null() ? Json::nullValue : field.as<int>();
        obj["type"] = 0;
        break;
    case 19:
    case 25:
    case 114:
    case 1043: // var char
        if (field.is_null())
            obj["value"] = Json::nullValue;
        else
            obj["value"] = field.as<std::string>();

        obj["type"] = 1;
        break;
    case 700:  // real
    case 1700: // double
        obj["value"] = field.is_null() ? Json::nullValue : field.as<float>();
        obj["type"] = 2;
        break;
    case 16: // bool
        obj["value"] = field.is_null() ? Json::nullValue : field.as<bool>();
        obj["type"] = 3;
        break;
    case 1114:
    case 1082: // date
        if (field.is_null())
            obj["value"] = Json::nullValue;
        else
            obj["value"] = field.as<std::string>();
        obj["type"] = 4;
        break;
    case 3802: // jsonb
        if (field.is_null())
            obj["value"] = Json::nullValue;
        else
        {
            const auto &strVal = field.as<std::string>();
            Json::Value jsVal;
            Json::Reader reader;
            reader.parse(strVal, jsVal);
            obj["value"] = jsVal;
        }
        obj["type"] = 5;
        break;

    default:
        std::cout << field.name() << "::" << field.type() << std::endl;
        break;
    }

    spdlog::trace("Field name: {}, Field type: {}, Json Value: {}", field.name(), field.type(), Json::FastWriter().write(obj));
    json.append(std::move(obj));
}
void JsonResult::setRoot(const pqxx::result &sqlResult, Json::Value &jsonRoot)
{
    std::vector<Json::Value> results;
    for (pqxx::result::const_iterator c = sqlResult.begin(); c != sqlResult.end(); ++c) // ROWS
    {
        results.push_back(Json::arrayValue);
        Json::Value &row = results.back();
        for (pqxx::const_row_iterator r = c.begin(); r != c.end(); ++r) // COLUMNS
        {
            this->setValue(row, r);
        }
    }
    this->m_root["count"] = static_cast<int>(results.size());
    this->m_root["result"] = Json::Value{Json::arrayValue};
    std::for_each(results.begin(), results.end(), [this](Json::Value &val)
                  { this->m_root["result"].append(val); });
}
