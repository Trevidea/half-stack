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
        //"INSERT INTO salaryslipfield (key, field) VALUES('Basic', 'basic_pay')"
        // get table name from jsonString and store in tablename variable
        std::string tablename = json["table"].asString(); //"salaryslipfield";
        // creating vector for fields
        std::vector<std::string> fields;
        for (const auto v : json["columns"])
        {
            fields.push_back(v["field"].asString());
        }
        std::string fiel = su_join(fields, ", ");
        // std::cout <<fiel <<std::endl;

        // creating vector for values
        std::vector<std::string> values;
        for (const auto v : json["columns"])
        {
            std::string fmtdValue = formatValue(v);
            values.push_back(fmtdValue);
        }

        std::string val = su_join(values, ", ");
        // std::cout<<val<<endl;

        // get field names csv from jsonString and store in fieldnames_csv variable
        std::string fieldnames_csv = fiel;
        // get field values from jsonString and store in values_csv variable
        std::string values_csv = val;

        std::string sql_insert = "INSERT INTO #tablename# (#fieldnames_csv#) VALUES(#values_csv#)";
        size_t idx = 0;

        // use string manipulation (find & replace) to replace placeholders with the values in actual variables
        idx = sql_insert.find("#tablename#", 0);
        if (idx == std::string::npos)
            std::cout << "completely unexpected" << std::endl;
        else
        {
            sql_insert.replace(idx, 11, tablename);
        }

        //---------------------------------------------------
        idx = sql_insert.find("#fieldnames_csv#", 0);
        if (idx == std::string::npos)
            std::cout << "completely unexpected" << std::endl;
        else
        {
            sql_insert.replace(idx, 16, fieldnames_csv);
        }
        //---------------------------------------------------
        idx = sql_insert.find("#values_csv#", 0);
        if (idx == std::string::npos)
            std::cout << "completely unexpected" << std::endl;
        else
        {
            sql_insert.replace(idx, 12, values_csv);
        }

        return sql_insert; // SAMPLE::::"INSERT INTO salaryslipfield (key, field) VALUES('Basic', 'basic_pay')";
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
#endif // SQLHELPER_H
