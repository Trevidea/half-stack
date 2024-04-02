#ifndef CLIENT_H
#define CLIENT_H

#include <cpprest/http_client.h>
#include <iostream>
#include <mutex> // For std::mutex

using namespace web;
using namespace web::http;
using namespace web::http::client;

class Client {
private:
    http_client client;
    std::mutex mutex;

public:
    Client(const std::string& url);
    void get(std::function<void(const std::string&)> &&success, std::function<void(const std::string&)> &&failure, int timeout = 10);
};



#endif //CLIENT_H