#ifndef CLIENT_H
#define CLIENT_H

#include <cpprest/http_client.h>
#include <iostream>
#include <mutex> // For std::mutex

using namespace utility;                    // Common utilities like string conversions
using namespace web;                        // Common features like URIs
using namespace web::http;                  // Common HTTP functionality
using namespace web::http::client;          // HTTP client features

namespace Rest
{
    class ClientFactory;
} // namespace Rest

class Client
{
private:
    http_client client;
    std::mutex mutex;
    Client(const std::string &url);

public:
    friend class Rest::ClientFactory;

public:
    void get(std::function<void(const std::string &)> &&success, std::function<void(const std::string &)> &&failure, int timeout = 10);
    int get(std::string &success, std::string &failure, int timeout = 10);
    int get(std::string &success, std::string &failure, std::string username, std::string password, int timeout = 10);
    int post(const std::string &data, std::string &success, std::string &failure, std::string username, std::string password, int timeout = 10);
    int put(const std::string &data, std::string &success, std::string &failure, std::string username, std::string password, int timeout = 10);
    int del(const std::string &data, std::string &success, std::string &failure, std::string username, std::string password, int timeout = 10);
    void wait();
};

#endif // CLIENT_H