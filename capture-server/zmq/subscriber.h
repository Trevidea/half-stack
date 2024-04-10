#ifndef SUBSCRIBER_H
#define SUBSCRIBER_H

#include <zmq.hpp>
#include <string>

class Subscriber {
public:
    Subscriber(const std::string& address);
    void subscribe(const std::string& topic);
    std::string receive();

private:
    zmq::context_t m_context;
    zmq::socket_t m_socket;
};

#endif // SUBSCRIBER_H
