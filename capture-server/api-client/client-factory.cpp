#include "client-factory.h"

ClientFactory* ClientFactory::instance = nullptr;

ClientFactory& ClientFactory::getInstance() {
    if (!instance) {
        instance = new ClientFactory();
    }
    return *instance;
}

Client ClientFactory::getClient(const std::string& url) {
    return Client(url);
}

ClientFactory::~ClientFactory() {
    delete instance;
}

ClientFactory::ClientFactory() {}
