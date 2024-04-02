#include "api-client.h"

ApiClient::ApiClient(const char * serverIP, const char* port)
{
    char endpointUrl[128] = {'\0'};
    snprintf(endpointUrl, 128, "http://%s:%s/v1", serverIP, port);
    this->m_endpointUrl = endpointUrl;
}

std::string ApiClient::createStream(const std::string &app, const std::string &key)
{

}

ApiClient::~ApiClient()
{
}