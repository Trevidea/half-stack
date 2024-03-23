#include "connection.h"
#include "spdlog/spdlog.h"
#include "db-exceptions.h"
#include "stringutils.h"
#include "spdlog/spdlog.h"
#include "transaction.h"
#include "db-manager.h"

std::unordered_map<std::string, std::tuple<bool, pqxx::connection *>> Connection::m_connPool;

int Connection::m_refId = 0;
Connection::Connection(const std::string &name, bool trx) : m_name{name}, m_trx{trx}
{
    this->m_thisRefId = ++m_refId;
    this->engage();
}

Connection Connection::open(
    const std::string &name,
    const std::string &host,
    const int &port,
    const std::string &dbName,
    const std::string &user,
    const std::string &pwd,
    bool trx)
{
    if (m_connPool.find(name) != m_connPool.end())
        spdlog::error("A db instance with the name '{}' already exists in the connection pool", name);
    else
    {
        try
        {
            char connStr[1024] = {0};
            snprintf(connStr, 1023, "user=%s host=%s port=%d password=%s dbname=%s",
                     user.c_str(),
                     host.c_str(),
                     port,
                     pwd.c_str(),
                     dbName.c_str());
            spdlog::trace("Connection string: {}", connStr);
            m_connPool[name] = std::make_tuple(false, new pqxx::connection(connStr));
            spdlog::trace("Connection opened..{}", name);
        }
        catch (const pqxx::sql_error &e)
        {
            std::cerr << e.query() << "::" << e.sqlstate() << "::" << e.what() << std::endl;
        }
    }
    if (trx)
        return Connection(name, true);
    else
        return Connection(name);
}

void Connection::close()
{
    this->getConn()->close();
    delete this->getConn();
    m_connPool.erase(this->m_name);
    spdlog::trace("Connection closed..{}", this->m_name);
}
Connection Connection::database(const std::string &name, bool trx)
{
    if (m_connPool.find(name) != m_connPool.end())
    {
        spdlog::trace("returning connection..{}", name);
        if (trx)
            return Connection(name, true);
        else
            return Connection(name);
    }
    else
    {
        spdlog::error("A db instance with the name '{}' does not exist in the connection pool", name);
        throw ExNameNotFoundException();
    }
}
void Connection::removeDatabase(const std::string &name)
{
    Connection(name).close();
}

JsonResult Connection::result()
{
    spdlog::trace("Fectching last result from connection");
    return JsonResult(this->m_lastResult);
}
PGResult Connection::data()
{
    return PGResult(this->m_lastResult);
}
SqlError Connection::lastError()
{
    return SqlError();
}

void Connection::execute(const std::string &sql)
{
    if (isSelectQuery(sql))
    {
        executeNonTrx(sql);
    }
    else
    {
        executeTrx(sql);
    }
    spdlog::trace("X>SQL..{}", sql);
}
void Connection::executeNonTrx(const std::string &sql)
{
    try
    {
        std::thread::id t_id = std::this_thread::get_id();
        spdlog::trace("execute_nt..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));
        pqxx::nontransaction work{*this->getConn()};
        this->m_lastResult = work.exec(sql);
        spdlog::trace("complete_nt..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));

        if (DBManager::instance().s_printResults)
            this->printResult();
    }
    catch (const pqxx::sql_error &se)
    {
        this->m_lastError = SqlError(&se);
        spdlog::error("{} for query..{}", se.what(), se.query());
        throw ExSqlExecutionError(se.what());
    }
}
void Connection::executeTrx(const std::string &sql)
{
    try
    {
        std::thread::id t_id = std::this_thread::get_id();
        spdlog::trace("execute_t..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));
        if (Transaction::inProgress())
        {
            this->m_lastResult = Transaction::exec(sql);
            spdlog::trace("complete_trx..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));

            if (DBManager::instance().s_printResults)
                this->printResult();
        }
        else
        {
            pqxx::work work{*this->getConn()};
            this->m_lastResult = work.exec(sql);
            spdlog::trace("complete_trx_commit..name={}, instance={}, threadId={}", this->m_name, this->m_thisRefId, this->index(t_id));

            if (DBManager::instance().s_printResults)
                this->printResult();

            work.commit();
        }
    }
    catch (const pqxx::sql_error &se)
    {
        this->m_lastError = SqlError(&se);
        spdlog::error("{} for query..{}", se.what(), se.query());
        throw ExSqlExecutionError(se.what());
    }
}
bool Connection::isSelectQuery(const std::string &sql)
{
    const std::string trimmed = su_trim(sql);
    return (su_tolower(trimmed.substr(0, 7)) == "select ");
}
Connection::~Connection()
{
    this->disengage();
}