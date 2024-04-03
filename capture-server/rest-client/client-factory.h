#ifndef CLIENT_FACTORY_H
#define CLIENT_FACTORY_H

#include "client.h"

namespace Rest
{
    class ClientFactory
    {
    private:
        static ClientFactory *instance;

    public:
        static ClientFactory &getInstance();
        Client create(const std::string &url);
        ~ClientFactory();

    private:
        ClientFactory();
        ClientFactory(const ClientFactory &) = delete;
        ClientFactory &operator=(const ClientFactory &) = delete;
    };
} // namespace rest

#endif // CLIENT_FACTORY_H