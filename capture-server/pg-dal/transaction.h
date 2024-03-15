#ifndef TRANSACTION_H
#define TRANSACTION_H
#include <iostream>
#include "pqxx/pqxx"
#include "connection.h"
#include <thread>
#include <unordered_map>
#include <mutex>
#include "spdlog/spdlog.h"
#include "db-exceptions.h"


using uq_ntrs = std::unique_ptr<pqxx::work>;
class Transaction
{
private:
    static std::unordered_map<std::thread::id, std::unique_ptr<pqxx::work>> sm_threadWorks;
    Connection m_conn;
    bool m_committed;
public:
    Transaction(const Connection &conn);
    Transaction(const Transaction &) = delete;
    Transaction &operator=(const Transaction &) = delete;

    void commit();
    static bool inProgress();
    static pqxx::result exec(const std::string &sql);
    
    // pqxx::result exec(const std::string &sql);
    uq_ntrs &create(pqxx::connection *conn);
    void complete();
    bool hasWork();
    void abort();
    ~Transaction();
};


#endif // TRANSACTION_H