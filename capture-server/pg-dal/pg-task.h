#ifndef PGTASK_H
#define PGTASK_H
#include <iostream>
#include <thread>
#include <unordered_map>
#include <mutex>
#include "spdlog/spdlog.h"
#include "pqxx/pqxx"
#include "db-exceptions.h"

class PgTask
{
private:
public:
    PgTask() = default;
    pqxx::result exec(const std::string &sql);
    uq_ntrs &create(pqxx::connection *conn);
    void complete();
    bool hasWork();
    void abort();
    ~PgTask();
};

#endif // PGTASK_H