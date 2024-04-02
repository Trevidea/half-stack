#include "client.h"
#include "spdlog/spdlog.h"
#include <functional>

Client::Client(const std::string &url) : client(url) {}

void Client::get(std::function<void(const std::string &)> &&success, std::function<void(const std::string &)> &&failure, int timeout)
{
    spdlog::trace("Get called..");
    std::lock_guard<std::mutex> lock(mutex);
    http_request request(methods::GET);
    client.request(request)
        .then([&failure](http_response response)
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure(err);
                throw std::runtime_error("HTTP request failed"); 
            } })
        .then([&success](utility::string_t body)
              { success(body); })
        .wait();
}
