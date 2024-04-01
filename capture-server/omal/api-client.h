#ifndef API_CLIENT_H
#define API_CLIENT_H
#include <iostream>
#include <spdlog/spdlog.h>

class ApiClient
{
private:
    std::string m_endpointUrl;
public:
    ApiClient(const char * serverIP, const char* port);

    /// @brief Creates a stream in the specified application with the key provided by the function user
    /// @param app The name of the application within which the stream has to be created
    /// @param key The key to be used to create the stream, that shall be used by the RTMP device
    /// @return returns the stream-key that the device will use
    std::string createStream(const std::string &app, const std::string &key);

    ~ApiClient();
};

#endif // API_CLIENT_H