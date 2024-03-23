#include "event.h"
#include "gateway.h"
#include "json/json.h"
#include "client-factory.h"
#include "sqlhelper.h"

Event::Event() : EntityBase("event") {}

void Event::report()
{
    EntityBase::report();
    // Route definitions
    Gateway::instance().route("GET", "/api/event/upcoming", [this](const Request &req, Response &rsp)
                              { this->listUpcoming(req, rsp); });

    // Gateway::instance().route("GET", "api/event/ongoing", [this](const Request req, Response &rsp)
    //                           { this->listOngoing(req, rsp); });

    // Gateway::instance().route("GET", "api/event/past", [this](const Request req, Response &rsp)
    //                           { this->listPast(req, rsp); });

    // Route definition for the sync function
    Gateway::instance().route("GET", "/api/event/sync", [this](const Request &req, Response &rsp)
                              { this->sync(req, rsp); });
}

void Event::listUpcoming(const Request &req, Response &rsp)
{
    // Set the response body with the JSON data
    rsp.setData(R"V0G0N(" {
        "Absolute URI" : "/api/event/template",
             "Gateway Response" : [
               {
                    "sport": "Football",
                    "level": "Professional",
                    "program": "Championship",
                    "year": 2024,
                    "dttEvent": "2024-03-19T18:00:00Z",
                    "venue": {
                        "location": "Cityville Stadium"
                    },
                    "onPremise": true,
                    "detail": {
                        "streetAddress": "123 Main St",
                        "cityAddress": "Cityville",
                        "type": "Scheduled Event"
                    },
                    "title": "Championship Final",
                    "status": "Upcoming"
                }
            ]
        } ")V0G0N");
    // Set appropriate headers and status code
    rsp.complete();
}

// void Event::listOngoing(const Request &req, Response &rsp)
// {
//     rsp.complete();
// }

// void Event::listPast(const Request &req, Response &rsp)
// {
//     rsp.complete();
// }

void Event::sync(const Request &req, Response &rsp)
{
    ClientFactory &factory = ClientFactory::getInstance();

    // Client client = factory.create("https://jsonplaceholder.typicode.com/todos/1");
    Client client = factory.create("http://drake.in:1337/api/events");
    client.get([this, &rsp](const std::string &data)
               {
                /*A.***Event data from the Full Stack - STRAPI****/
                   spdlog::trace("success..{}", data);
                   Json::Reader reader;
                   Json::Value dataJson;
                   reader.parse(data, dataJson);
                /***********************************************/

                /*B.********This is the template that has all the fields we need to save for a record*********/
                   Json::Value jsEntityTemplate = this->schemaJson();
                   Json::FastWriter fw;
                   auto x = fw.write(jsEntityTemplate);
                   spdlog::trace("Insert Json..{}", x);
                /*******************************************************************************************/


                /*C.****This is the JSON stub to be used for creating the SQL*****/
                   Json::Value jsSQLInput;
                   const auto &sqlInput = SqlHelper::JsonStub("event");
                   spdlog::trace("sqlInput: {}", sqlInput);
                   auto stub = reader.parse(sqlInput, jsSQLInput);

                /*
                We need to populate C. 
                B has all the fields that will go into the Columns array in C. 
                And A has all the data that we will set for the columns in B.
                Run a loop on B, get values for the fields in B from data in A, create a Json::Value and add to C.
                */
                Json::Value &columns = jsSQLInput["columns"];
                for (auto &&col : jsEntityTemplate)
                {
                    columns.append(Json::objectValue);
                    Json::Value &column = columns[columns.size() - 1];
                    const auto &field = col[0]["field"].asString();
                    spdlog::trace("Field name..{}", field);
                    column["field"] = field;
                    Json::Value &attributes = dataJson["attributes"];
                    spdlog::trace("Field value..{}", attributes[field].asString());
                    column["value"] = attributes[field];
                }

                /***************************************************************/

                   
                   const auto sql = SqlHelper::ScriptInsert(jsSQLInput);
                   spdlog::trace("Insert script..{}", sql);

                //    auto jsResult = this->executeSqlJson(sql);
                //    rsp.setData(jsResult);
                   },
               [](const std::string &s)
               {
                   spdlog::trace("failure..{}", s);
               });

    rsp.setData("Sync operation completed successfully.");
    rsp.complete();
}