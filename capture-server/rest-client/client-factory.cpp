#include "client-factory.h"

Rest::ClientFactory* Rest::ClientFactory::instance = nullptr;

Rest::ClientFactory& Rest::ClientFactory::getInstance() {
    if (!instance) {
        instance = new ClientFactory();
    }
    return *instance;
}

Client Rest::ClientFactory::create(const std::string& url) {
    return Client(url);
}

Rest::ClientFactory::~ClientFactory() {
    delete instance;
}

Rest::ClientFactory::ClientFactory() {}
