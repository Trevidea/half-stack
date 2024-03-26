#include "db-manager.h"
#include "spdlog/spdlog.h"
#include <mutex>

DBManager::DBManager()
{
}

Connection DBManager::getConnection(bool trx)
{
    // If a transaction is in progress, proivide the transaction connection
    // It could be derived from the original connection but the one that does not close when destroyed

    if(Transaction::inProgress())
    {
        return Connection::_trx();
    }
    spdlog::trace("Trying to get an open and free connection!");

    static std::mutex my_mutex;
    std::lock_guard<std::mutex> lock(my_mutex);

    for (auto &&c : this->m_connectionPool)
    {
        spdlog::trace("Trying to get an open and free connection! Testing..{}", c);
        if (Connection::has(c) && Connection::free(c))
        {
            spdlog::trace("Connection {} found free", c);
            return Connection::database(c, trx);
        }
        else
        {
            spdlog::trace("{} connection NOT free or available", c);
        }
    }
    spdlog::warn("No connection found open and free!");
    for (auto &&c : this->m_connectionPool)
    {
        if (!Connection::has(c))
        {
            auto server = this->getEnv("PG_SRV", "drake.in");
            auto db = this->getEnv("PG_DBS", "half-stack");
            auto usr = this->getEnv("PG_USR", "postgres");
            auto pwd = this->getEnv("PG_PWD", "btc.008");
            return Connection::open(c, server, 5432, db, usr, pwd, trx);
        }
    }
    spdlog::error("No more connections available in the connection pool.");
    throw ExConnectionPoolChokedException();
}

Transaction DBManager::createTransaction()
{
    return Transaction(DBManager::instance().getConnection(true));
}

DBManager::~DBManager()
{
}
