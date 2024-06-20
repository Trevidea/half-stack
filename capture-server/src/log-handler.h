#ifndef LOG_HANDLER_H
#define LOG_HANDLER_H

#include "entity-base.h"
#include "json/json.h"

class LogHandler : public EntityBase {
public:
    LogHandler();
    void report() override;

private:
    void saveLog(const Request &req, Response &rsp);
};

#endif // LOG_HANDLER_H
