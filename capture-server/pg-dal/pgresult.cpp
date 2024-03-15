#include "pgresult.h"
#include "spdlog/spdlog.h"

PGResult::PGResult(const pqxx::result &sqlResult) : m_result{sqlResult}
{
    spdlog::trace("created pgresult..");
    for (pqxx::result::const_iterator c = sqlResult.begin(); c != sqlResult.end(); ++c) // ROWS
    {
        Json::Value jsModel = Json::objectValue;
        for (pqxx::const_row_iterator r = c.begin(); r != c.end(); ++r) // COLUMNS
        {
            this->setValue(jsModel, r);
        }

        this->m_models.push_back(Model(jsModel));
    }
}
void PGResult::setValue(Json::Value &obj, const pqxx::field &field)
{    
    switch (field.type())
    {
    case 20:
    case 23: // biginth
        obj[field.name()] = field.is_null() ? Json::nullValue : field.as<int>();
        // obj["type"] = 0;
        break;
    case 19:
    case 25:
    case 114:
    case 1043:  // var char
        if(field.is_null())
            obj[field.name()] =  Json::nullValue;
        else 
            obj[field.name()] =  field.as<std::string>();
        // obj["type"] = 1;
        break;
    case 700:  // real
    case 1700: // double
        obj[field.name()] = field.is_null() ? Json::nullValue : field.as<float>();
        // obj["type"] = 2;
        break;
    case 16: // bool
        obj[field.name()] = field.is_null() ? Json::nullValue : field.as<bool>();
        // obj["type"] = 3;
        break;
    case 1082: // date
        if(field.is_null())
            obj[field.name()] =  Json::nullValue;
        else 
            obj[field.name()] =  field.as<std::string>();
        // obj["type"] = 4;
        break;

    default:
        std::cout << field.name() << "::" << field.type() << std::endl;
        break;
    }
}
PGResult::~PGResult()
{
    spdlog::trace("destroyed pgresult..");
}