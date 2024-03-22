#include "client.h"

class ClientFactory {
private:
    static ClientFactory* instance;

public:
    static ClientFactory& getInstance();
    Client getClient(const std::string& url);
    ~ClientFactory();

private:
    ClientFactory();
    ClientFactory(const ClientFactory&) = delete;
    ClientFactory& operator=(const ClientFactory&) = delete;
};