#ifndef PUBLISHER_H
#define PUBLISHER_H

#include <zmq.hpp>
#include <string>

class Publisher {
public:
    Publisher(const std::string& address);
    void publish(const std::string& topic, const std::string& message);

private:
    zmq::context_t m_context;
    zmq::socket_t m_socket;
};

#endif // PUBLISHER_H
