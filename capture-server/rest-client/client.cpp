#include "client.h"
#include "spdlog/spdlog.h"
#include <functional>
#include <cpprest/uri.h>           // For utility::conversions
#include <cpprest/asyncrt_utils.h> // For conversions and to_string_t

Client::Client(const std::string &url) : client(url) {}

void Client::get(std::function<void(const std::string &)> &&success, std::function<void(const std::string &)> &&failure, int timeout)
{
    std::lock_guard<std::mutex> lock(mutex);
    http_request request(methods::GET);
    client.request(request)
        .then([&failure](http_response response) -> pplx::task<utility::string_t>
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure(err);
                return pplx::task<utility::string_t>();
            } })
        .then([&success](utility::string_t body)
              { success(body); });
}
int Client::get(std::string &success, std::string &failure, int timeout)
{
    int result = -1;
    std::lock_guard<std::mutex> lock(mutex);

    http_request request(methods::GET);
    client.request(request)
        .then([&failure](http_response response)
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure = err;
                throw std::runtime_error("HTTP request failed"); 
            } })
        .then([&success, &result](utility::string_t body)
              { 
                result = 0; 
                success = body; })
        .wait();
    return result;
}
int Client::get(std::string &success, std::string &failure, std::string username, std::string password, int timeout)
{
    int result = -1;
    std::lock_guard<std::mutex> lock(mutex);

    std::string credentials = username + ":" + password;
    std::string credentials_encoded = utility::conversions::to_base64({credentials.begin(), credentials.end()});

    http_request request(methods::GET);
    request.headers().add(U("Authorization"), U("Basic ") + utility::conversions::to_string_t(credentials_encoded));

    client.request(request)
        .then([&failure](http_response response)
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure = err;
                throw std::runtime_error("HTTP request failed"); 
            } })
        .then([&success, &result](utility::string_t body)
              { 
                result = 0; 
                success = body; })
        .wait();
    return result;
}
int Client::post(const std::string &data, std::string &success, std::string &failure, std::string username, std::string password, int timeout)
{
    int result = -1;
    std::lock_guard<std::mutex> lock(mutex);

    std::string credentials = username + ":" + password;
    std::string credentials_encoded = utility::conversions::to_base64({credentials.begin(), credentials.end()});

    http_request request(methods::POST);
    request.headers().add(U("Authorization"), U("Basic ") + utility::conversions::to_string_t(credentials_encoded));
    request.headers().set_content_type(U("application/json"));
    json::value postData = json::value::parse(data);
    request.set_body(postData);

    client.request(request)
        .then([&failure](http_response response)
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure = err;
                throw std::runtime_error("HTTP request failed"); 
            } })
        .then([&success, &result](utility::string_t body)
              { 
                result = 0; 
                success = body; })
        .wait();
    return result;
}

int Client::del(const std::string &data, std::string &success, std::string &failure, std::string username, std::string password, int timeout)
{
    int result = -1;
    std::lock_guard<std::mutex> lock(mutex);

    std::string credentials = username + ":" + password;
    std::string credentials_encoded = utility::conversions::to_base64({credentials.begin(), credentials.end()});

    http_request request(methods::DEL);
    request.headers().add(U("Authorization"), U("Basic ") + utility::conversions::to_string_t(credentials_encoded));
    request.headers().set_content_type(U("application/json"));
    json::value postData = json::value::parse(data);
    request.set_body(postData);

    client.request(request)
        .then([&failure](http_response response)
              {
            if (response.status_code() == status_codes::OK) {
                return response.extract_string();
            } else {
                const std::string err = "HTTP request failed";
                failure = err;
                throw std::runtime_error("HTTP request failed"); 
            } })
        .then([&success, &result](utility::string_t body)
              { 
                result = 0; 
                success = body; })
        .wait();
    return result;
}
void Client::wait()
{
    spdlog::trace("wait called in rest client");
}