#ifndef CLIENT_H
#define CLIENT_H

#include <cpprest/http_client.h>
#include <iostream>
#include <mutex> // For std::mutex

using namespace web;
using namespace web::http;
using namespace web::http::client;

namespace Rest
{
    class ClientFactory;
} // namespace Rest



class Client {
private:
    http_client client;
    std::mutex mutex;
    Client(const std::string& url);
public:
    friend class Rest::ClientFactory;
public:
    void get(std::function<void(const std::string&)> &&success, std::function<void(const std::string&)> &&failure, int timeout = 10);
    void wait();
};



#endif //CLIENT_H