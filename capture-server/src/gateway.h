#ifndef GATEWAY_H
#define GATEWAY_H

#include <iostream>
#include <functional>
#include "request.h"
#include "response.h"
#include <map>
#include <vector>
#include "handler.h"

class Gateway
{
private:
    Gateway();
    ~Gateway();
    std::string flatten(std::string method, const std::string path);
    std::map<int, Response> m_reg;
    std::map<std::string, std::function<void(const Request &, Response &)>> m_handlers;
    std::vector<Handler *> m_entities;

public:
    static Gateway &
    instance()
    {
        static Gateway s;
        return s;
    } // instance
    Gateway(const Gateway &) = delete;
    Gateway &operator=(const Gateway &) = delete;
    void init();
    Response &request(std::string method, const std::string &path, const std::string &query, const std::string &data);
    void route(const std::string &method, const std::string &path, const std::function<void(const Request &, Response &)> &handler);
    std::string formatResponse(const std::vector<std::map<std::string, std::string>> &data);
    // std::string response();
};

#endif // GATEWAY_H