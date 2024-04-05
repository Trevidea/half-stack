#ifndef SQLHELPER_H
#define SQLHELPER_H
#include <iostream>
#include <string>
#include <vector>
#include <iterator>
#include <fstream>
#include <json/json.h>
#include "stringutils.h"
#include "spdlog/spdlog.h"

class SqlHelper
{
private:
    /************HELPER FUNCTIONS***********/
    static std::string formatValue(const Json::Value &json)
    {
        if (!json["value"])
            return "NULL";
        spdlog::trace("sqlhelper.formatvalue.json..{}", Json::FastWriter().write(json));
        std::string value = "";
        if (json["type"])
        {
            int type = json["type"].asInt();
            switch (type)
            {
            case 1: // string
                value = "'" + json["value"].asString() + "'";
                break;
            case 3: // bool
                value = json["value"].asString();
                break;
            case 4: // date
                value = "'" + json["value"].asString() + "'";
                break;
            case 5: // jsonb
                value = "'" + json["value"].asString() + "'";
                break;
            case 0: // int
            case 2: // float
            default:
                value = json["value"].asString();
                break;
            }
        }
        else
            value = json["value"].asString();
        return value;
    }

    static std::string criteriaBuilder(const Json::Value &json)
    {
        std::string criteria = "";
        auto critJson = json["criteria"];
        if (critJson && critJson.size() > 0)
        {
            std::vector<std::string> arrCrit;
            std::for_each(critJson.begin(), critJson.end(), [&criteria, &arrCrit](Json::Value &val)
                          {
                std::string field = val["field"].asString();
                std::string value = formatValue(val);
                std::string crit = "";
                if(!val.isMember("op"))
                    crit = field + " = " + value; 
                else
                    crit = field + val["op"].asString() + value; 

                arrCrit.push_back(crit); });
            criteria = "WHERE " + su_join(arrCrit, " AND ");
            spdlog::trace("Criteria joined..{}", criteria);
        }
        return criteria;
    }
    static std::string paramsBuilder(const Json::Value &json)
    {
        std::string criteria = "";
        auto critJson = json["criteria"];
        if (critJson && critJson.size() > 0)
        {
            std::vector<std::string> arrCrit;
            std::for_each(critJson.begin(), critJson.end(), [&criteria, &arrCrit](Json::Value &val)
                          {
                std::string field = val["field"].asString();
                std::string value = formatValue(val);
                std::string crit = field + " := " + value; 

                arrCrit.push_back(crit); });
            criteria = su_join(arrCrit, ",");
            spdlog::trace("Criteria joined..{}", criteria);
        }
        return criteria;
    }
    /***************************************/

public:
    static std::string ScriptInsert(const Json::Value &json)
{
    std::string tablename = json["table"].asString();

    // Extract columns and values from JSON
    std::vector<std::string> columns;
    std::vector<std::string> values;
    for (const auto &column : json["columns"])
    {
        columns.push_back(column["field"].asString());
        values.push_back(formatValue(column));
    }

    // Construct the INSERT SQL statement with RETURNING clause to get the inserted ID
    std::string sql_insert = "INSERT INTO " + tablename + " (" + su_join(columns, ", ") + ") VALUES (" + su_join(values, ", ") + ") RETURNING id";

    return sql_insert;
}


    //-----------------------------------------------------------------------------------

    static std::string ScriptUpdate(const Json::Value &json)
    {
        // get table name from jsonString and store in tablename variable
        std::string tablename = json["table"].asString(); //"salaryslipfield";

        std::string sign = " = ";
        std::vector<std::string> pair;
        for (const auto v : json["columns"])
        {
            std::string fmtdValue = formatValue(v);
            pair.push_back(v["field"].asString() + sign + fmtdValue);
        }
        std::string updation = su_join(pair, ", ");

        std::string sql_update = "UPDATE #tablename# SET #updation# #criteria#";
        size_t idx = 0;

        //----------------------------------------------
        idx = sql_update.find("#tablename#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Can't Find." << std::endl;
        }
        else
        {
            sql_update.replace(idx, 11, tablename);
        }

        //-----------------------------------------------
        idx = sql_update.find("#updation#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Error" << std::endl;
        }
        else
        {
            sql_update.replace(idx, 10, updation);
        }

        std::string criteria = criteriaBuilder(json);

        idx = sql_update.find("#criteria#", 0);
        sql_update.replace(idx, 10, criteria);
        return sql_update;
    }

    //-----------------------------------------------------------------------------------

    static std::string ScriptRemove(const Json::Value &json)
    {
        std::string tablename = json["table"].asString();

        std::string sql_delete = "DELETE FROM #tablename# #criteria#";

        size_t idx = 0;

        idx = sql_delete.find("#tablename#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Error" << std::endl;
        }
        else
        {
            sql_delete.replace(idx, 11, tablename);
        }

        std::string criteria = criteriaBuilder(json);

        idx = sql_delete.find("#criteria#", 0);
        sql_delete.replace(idx, 10, criteria);
        return sql_delete;
    }
    static std::string ScriptRemove(const std::string &tableName, const std::string &criteria)
    {

        std::string sql_delete = "DELETE FROM #tablename# WHERE #criteria#";

        size_t idx = 0;

        idx = sql_delete.find("#tablename#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Error" << std::endl;
        }
        else
        {
            sql_delete.replace(idx, 11, tableName);
        }


        idx = sql_delete.find("#criteria#", 0);
        sql_delete.replace(idx, 10, criteria);
        return sql_delete;
    }

    //-----------------------------------------------------------------------------------
    static std::string JsonStub(const std::string &tableName)
    {
        char js[1024] = {0};
        const char *fmt = R"(
                        {
                            "table":"%s",
                            "columns":[],
                            "criteria": []
                        })";
        snprintf(js, 1024, fmt, tableName.c_str());
        return js;
    }
    static std::string SchemaSql(const std::string &tableName)
    {
        char sql[1024] = {0};
        const char *fmt = R"(SELECT 
                            column_name, 
                            data_type 
                        FROM 
                            information_schema.columns
                        WHERE 
                            table_name = '%s';)";
        snprintf(sql, 1024, fmt, tableName.c_str());
        return sql;
    }
    //-----------------------------------------------------------------------------------

    static std::string ScriptSelect(const Json::Value &json)
    {
        std::string tablename = json["table"].asString();

        std::string sql_select = "SELECT * FROM #tablename# #criteria#";
        size_t idx = 0;

        idx = sql_select.find("#tablename#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Error" << std::endl;
        }
        else
        {
            sql_select.replace(idx, 11, tablename);
        }

        std::string criteria = criteriaBuilder(json);

        idx = sql_select.find("#criteria#", 0);
        sql_select.replace(idx, 10, criteria);
        return sql_select;
    }

    //-----------------------------------------------------------------------------------

    static std::string ScriptFunction(const Json::Value &json)
    {
        std::string tablename = json["table"].asString();

        std::string sql_select = "SELECT * FROM #tablename#(#params#)";
        size_t idx = 0;

        idx = sql_select.find("#tablename#", 0);
        if (idx == std::string::npos)
        {
            std::cout << "Error" << std::endl;
        }
        else
        {
            sql_select.replace(idx, 11, tablename);
        }

        std::string params = paramsBuilder(json);

        idx = sql_select.find("#params#", 0);
        sql_select.replace(idx, 8, params);
        return sql_select;
    }
};

// // Define the executeAndReturnId function
// int executeAndReturnId(const std::string &sql) {
//     // Implement the logic to execute the SQL query and return the inserted ID
//     // For demonstration purposes, let's just print the SQL query
//     std::cout << "Executing SQL query: " << sql << std::endl;
    
//     // Placeholder value for the inserted ID
//     int insertedId = 12345; // Replace with your actual implementation to retrieve the inserted ID
    
//     return insertedId;
// }

// Declaration of ownerId function (assuming it returns an integer)
int ownerId();

#endif // SQLHELPER_H
