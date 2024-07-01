#ifndef TAGGING_DATA_H
#define TAGGING_DATA_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"

class TaggingData : public EntityBase
{
public:
    TaggingData();
    void report() override;

private:
    void tag(const Request &req, Response &rsp); // New function for tagging
    void query(const Request &req, Response &rsp);
};

#endif // TAGGING_DATA_H
