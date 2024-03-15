#ifndef CONNECTIONPOOL_H
#define CONNECTIONPOOL_H
#include <iostream>
#include <unordered_map>
#include <pqxx/pqxx>
#include "jsonresult.h"
#include "sqlerror.h"
#include <tuple>
#include "pgresult.h"
#include <thread>
#include <mutex>

class Connection
{

private:
    static std::unordered_map<std::string, std::tuple<bool, pqxx::connection *>> m_connPool;

    static int m_refId;
    int m_thisRefId = 0;
    std::string m_name;
    JsonResult m_result;
    SqlError m_lastError;
    bool m_trx;
    Connection(const std::string &name, bool trx = false);

    pqxx::connection *mp_conn = nullptr;
    pqxx::result m_lastResult;

    void close();
    void executeNonTrx(const std::string &sql);
    void executeTrx(const std::string &sql);
    inline pqxx::connection *getConn()
    {
        auto &db = this->m_connPool[this->m_name];
        return std::get<1>(db);
    }
    void printResult()
    {
        spdlog::trace("Printing Sql Execution..");
        for (pqxx::result::const_iterator c = this->m_lastResult.begin(); c != this->m_lastResult.end(); ++c) // ROWS
        {
            std::string row;
            for (pqxx::const_row_iterator r = c.begin(); r != c.end(); ++r) // COLUMNS
            {
                row.append(r.name());
                row.append("::");
                row.append(r.is_null()?"Null":r.as<std::string>());
                row.append("\t");
            }
            row.append("\n");
            spdlog::trace(row);
        }
    }
    std::size_t index(const std::thread::id id)
    {
        static std::size_t nextindex = 0;
        static std::mutex my_mutex;
        static std::unordered_map<std::thread::id, std::size_t> ids;
        std::lock_guard<std::mutex> lock(my_mutex);
        auto iter = ids.find(id);
        if (iter == ids.end())
            return ids[id] = nextindex++;
        return iter->second;
    }

    inline void engage()
    {
        if (!m_trx)
        {
            auto &db = this->m_connPool[this->m_name];
            std::get<0>(db) = false;
            spdlog::trace("Connection engaged..{}::{}", this->m_name, this->m_thisRefId);
        }
    }

    inline void disengage()
    {
        if (!m_trx)
        {
            spdlog::trace("Destroying connection {}", this->m_name);
            auto &db = this->m_connPool[this->m_name];
            std::get<0>(db) = true;
            std::thread::id t_id = std::this_thread::get_id();
            spdlog::trace("set_free..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));
        }
    }

public:
    static Connection open(
        const std::string &name,
        const std::string &host,
        const int &port,
        const std::string &dbName,
        const std::string &user,
        const std::string &pwd,
        bool trx = false);
    static void removeDatabase(const std::string &name);
    static Connection database(const std::string &name, bool trx = false);
    JsonResult result();
    PGResult data();
    SqlError lastError();
    void execute(const std::string &sql);
    static bool isSelectQuery(const std::string &sql);
    static bool has(const std::string &name)
    {
        return (m_connPool.find(name) != m_connPool.end());
    }
    static bool free(const std::string &name)
    {
        auto &db = m_connPool[name];
        return std::get<0>(db);
    }
    inline std::string name() const
    {
        return this->m_name;
    }
    static Connection _trx()
    {
        return Connection("trx_task", true);
    }
    ~Connection();
};

#endif // CONNECTIONPOOL_H