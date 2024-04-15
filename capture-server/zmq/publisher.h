#ifndef PUBLISHER_H
#define PUBLISHER_H

#include <zmq.hpp>
#include <string>

class Publisher
{
private:
    Publisher(const std::string &address);
    Publisher(const Publisher &) = delete;
    Publisher &operator=(const Publisher &) = delete;

public:
    static Publisher &instance();
    void publish(const std::string &topic, const std::string &message);
    ~Publisher();

private:
    zmq::context_t m_context;
    zmq::socket_t m_socket;
    static Publisher *mp_instance;
};

#endif // PUBLISHER_H
