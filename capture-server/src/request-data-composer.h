#ifndef REQUESTDATACOMPOSER_H
#define REQUESTDATACOMPOSER_H
#include <iostream>
#include "json/json.h"

class RequestDataComposer
{
    Json::Value m_rawData;
    class KeyValueComposer
    {
        RequestDataComposer &m_requestDataComposer;
        KeyValueComposer(RequestDataComposer &rdc) : {m_requestDataComposer = rdc}
        {
        }
        Json::Value compose()
        {
        }
    };

private:
public:
    RequestDataComposer();

    ~RequestDataComposer();
};

#endif // REQUESTDATACOMPOSER_H
RequestDataComposer::RequestDataComposer()
{
}

RequestDataComposer::~RequestDataComposer()
{
}