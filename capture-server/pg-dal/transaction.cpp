#include "transaction.h"
#include "spdlog/spdlog.h"

std::unordered_map<std::thread::id, std::unique_ptr<pqxx::work>> Transaction::sm_threadWorks;
Transaction::Transaction(const Connection &conn) : m_conn{conn}, m_committed{false}
{
    spdlog::trace("New transaction created with connection..{}", conn.name());
}

void Transaction::commit()
{
    this->complete();
    this->m_committed = true;
}

bool Transaction::inProgress()
{
    static std::mutex hasWork_mutex;
    std::lock_guard<std::mutex> lock(hasWork_mutex);
    const std::thread::id t_id = std::this_thread::get_id();
    auto iter = sm_threadWorks.find(t_id);

    return (iter != sm_threadWorks.end());
}


// pqxx::result Transaction::exec(const std::string &sql)
// {
//    return this->exec(sql);
// }

pqxx::result Transaction::exec(const std::string &sql)
{
    static std::mutex work_mutex;
    std::lock_guard<std::mutex> lock(work_mutex);
    const std::thread::id t_id = std::this_thread::get_id();

    auto iter = sm_threadWorks.find(t_id);

    if (iter != sm_threadWorks.end())
    {
        auto &&w = iter->second;
        spdlog::trace("Transaction added for sql..{}", sql);
        return w->exec(sql);
    }
    throw ExWorkNotAvailableError();
}

void Transaction::complete()
{
    static std::mutex work_mutex;
    std::lock_guard<std::mutex> lock(work_mutex);
    const std::thread::id t_id = std::this_thread::get_id();

    auto iter = sm_threadWorks.find(t_id);

    if (iter != sm_threadWorks.end())
    {
        sm_threadWorks[t_id]->commit();
        sm_threadWorks[t_id].reset(nullptr);
    }
}
uq_ntrs &Transaction::create(pqxx::connection *conn)
{

    static std::mutex work_mutex;
    std::lock_guard<std::mutex> lock(work_mutex);
    const std::thread::id t_id = std::this_thread::get_id();

    auto iter = sm_threadWorks.find(t_id);

    if (iter == sm_threadWorks.end())
    {
        std::cout << "adding transaction for thread id " << t_id << std::endl;
        try
        {
            std::cout << "connection::" << conn << std::endl;
            return sm_threadWorks[t_id] = uq_ntrs(new pqxx::work{*conn});
        }
        catch (const pqxx::usage_error &se)
        {
            spdlog::error("Error caught here..{}", se.what());
            throw ExWorkConnectionError(se.what());
        }
    }
    return iter->second;
}
bool Transaction::hasWork()
{
    static std::mutex hasWork_mutex;
    std::lock_guard<std::mutex> lock(hasWork_mutex);
    const std::thread::id t_id = std::this_thread::get_id();
    auto iter = sm_threadWorks.find(t_id);

    return (iter != sm_threadWorks.end());
}
void Transaction::abort()
{

    static std::mutex abort_mutex;
    std::lock_guard<std::mutex> lock(abort_mutex);
    const std::thread::id t_id = std::this_thread::get_id();

    auto iter = sm_threadWorks.find(t_id);

    if (iter != sm_threadWorks.end())
    {
        sm_threadWorks[t_id]->abort();
        sm_threadWorks[t_id].reset(nullptr);
    }
}
Transaction::~Transaction()
{
    spdlog::trace("Transaction destroyed for connection..{}", this->m_conn.name());
    if (!this->m_committed && this->hasWork())
    {
        this->abort();
    }
}