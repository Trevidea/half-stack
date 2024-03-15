#ifndef DBMANAGER_H
#define DBMANAGER_H
#include <iostream>
#include "connection.h"
#include "db-exceptions.h"
#include "transaction.h"

class DBManager
{
private:
    DBManager();
    ~DBManager();
    std::vector<std::string> m_connectionPool = {"first", "second", "third", "fourth"};

public:
    bool s_printResults = false;
    static DBManager &
    instance()
    {
        static DBManager s;
        return s;
    } // instance
    DBManager(const DBManager &) = delete;
    DBManager &operator=(const DBManager &) = delete;

    Connection getConnection(bool trx = false);
    Transaction createTransaction();
    const char *getEnv(const char *tag, const char *def = nullptr) noexcept
    {
        const char *ret = std::getenv(tag);
        return ret ? ret : def;
    }
};

#endif // DBMANAGER_H