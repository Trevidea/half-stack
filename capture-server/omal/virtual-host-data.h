#ifndef VIRTUAL_HOST_DATA_H
#define VIRTUAL_HOST_DATA_H



#include <iostream>
#include <vector>

namespace omal
{
    struct tls
    {
        std::string certPath;
        std::string chainCertPath;
        std::string keyPath;
    };
    struct host
    {
        std::vector<std::string> names;
        tls tls;
    };
    struct enables
    {
        std::vector<std::string> providers;
        std::vector<std::string> publishers;
    };
    struct signedPolicy
    {
        enables enables;
        std::string policyQueryKeyName;
        std::string secretKey;
        std::string signatureQueryKeyName;
    };
    struct admissionWebhooks
    {
        std::string controlServerUrl;
        enables enables;
        std::string secretKey;
        std::string timeout;
    };
    struct vhost
    {
        std::string name;
        host host;
        signedPolicy signedPolicy;
        admissionWebhooks admissionWebhooks;
    };

};
#endif //VIRTUAL_HOST_DATA_H