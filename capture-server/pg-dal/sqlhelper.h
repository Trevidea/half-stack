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

    /**
     * \brief Formats a JSON value into a string representation based on its type.
     *
     * This function takes a Json::Value object and formats its value into a string
     * representation according to its type. The supported types are:
     *   - 1: string
     *   - 3: bool
     *   - 4: date
     *   - 5: jsonb
     *   - 0, 2: int, float
     *
     * If the JSON object does not have a "value" field, it returns "NULL".
     *
     * \param json The Json::Value object to format.
     * \return A string representation of the JSON value.
     */

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
            {
                const auto strValue = Json::FastWriter().write(json["value"]);
                value = "'" + strValue + "'";
                break;
            }
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

    /**
     * \brief Builds SQL criteria string based on JSON criteria.
     *
     * This function takes a Json::Value object containing criteria and builds
     * an SQL criteria string based on the criteria specified in the JSON.
     * Each criterion consists of a field, an operator (optional), and a value.
     * If the JSON object does not contain criteria, an empty string is returned.
     *
     * \param json The Json::Value object containing criteria.
     * \return An SQL criteria string built from the JSON criteria.
     */

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

    /**
     * \brief Builds SQL parameter string based on JSON criteria.
     *
     * This function takes a Json::Value object containing criteria and builds
     * an SQL parameter string based on the criteria specified in the JSON.
     * Each parameter consists of a field and a value.
     * If the JSON object does not contain criteria, an empty string is returned.
     *
     * \param json The Json::Value object containing criteria.
     * \return An SQL parameter string built from the JSON criteria.
     */

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
    /**
     * \brief Constructs an SQL INSERT statement with RETURNING clause.
     *
     * This function constructs an SQL INSERT statement for inserting data into a specified table
     * using the provided JSON object. It extracts column names and values from the JSON and
     * constructs the INSERT statement accordingly. The constructed statement includes a RETURNING
     * clause to retrieve the inserted ID.
     *
     * \param json The Json::Value object containing table name and column data.
     * \return An SQL INSERT statement with RETURNING clause.
     */

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

    /**
     * \brief Constructs an SQL UPDATE statement.
     *
     * This function constructs an SQL UPDATE statement for updating data in a specified table
     * using the provided JSON object. It extracts column names and values from the JSON and
     * constructs the SET clause accordingly. Additionally, it includes criteria for updating
     * specific rows if provided in the JSON.
     *
     * \param json The Json::Value object containing table name, column data, and optional criteria.
     * \return An SQL UPDATE statement.
     */

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

    /**
     * \brief Constructs an SQL DELETE statement.
     *
     * This function constructs an SQL DELETE statement for removing data from a specified table
     * based on the provided criteria in the JSON object. The criteria for deletion can be
     * specified in the JSON object.
     *
     * \param json The Json::Value object containing table name and optional criteria.
     * \return An SQL DELETE statement.
     */

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

    /**
     * \brief Constructs an SQL DELETE statement.
     *
     * This function constructs an SQL DELETE statement for removing data from a specified table
     * based on the provided criteria.
     *
     * \param tableName The name of the table from which data will be removed.
     * \param criteria The criteria for deletion in the WHERE clause.
     * \return An SQL DELETE statement.
     */

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

    /**
     * \brief Generates a JSON stub for a given table name.
     *
     * This function generates a JSON stub containing an empty array for columns
     * and an empty array for criteria, with the specified table name.
     *
     * \param tableName The name of the table to include in the JSON stub.
     * \return A JSON stub string.
     */

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

    /**
     * \brief Generates an SQL query to retrieve schema information for a specified table.
     *
     * This function generates an SQL query to retrieve column names and data types
     * from the information schema for the specified table.
     *
     * \param tableName The name of the table for which schema information is to be retrieved.
     * \return An SQL query string.
     */

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

    /**
     * \brief Constructs an SQL SELECT statement.
     *
     * This function constructs an SQL SELECT statement for retrieving data from a specified table
     * based on the provided criteria in the JSON object. If no criteria are provided, it retrieves
     * all records from the table.
     *
     * \param json The Json::Value object containing table name and optional criteria.
     * \return An SQL SELECT statement.
     */

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

    /**
     * \brief Constructs an SQL SELECT statement with function call syntax.
     *
     * This function constructs an SQL SELECT statement to call a function on a specified table
     * based on the provided parameters in the JSON object.
     *
     * \param json The Json::Value object containing table name and parameters for the function call.
     * \return An SQL SELECT statement with function call syntax.
     */

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
