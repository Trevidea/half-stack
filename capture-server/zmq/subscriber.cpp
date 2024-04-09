#include "Subscriber.h"

Subscriber::Subscriber(const std::string& address) : m_context(1), m_socket(m_context, ZMQ_SUB) {
    m_socket.connect(address);
}

void Subscriber::subscribe(const std::string& topic) {
    m_socket.setsockopt(ZMQ_SUBSCRIBE, topic.c_str(), topic.size());
}

std::string Subscriber::receive() {
    zmq::message_t topic_msg;
    m_socket.recv(&topic_msg);

    zmq::message_t message_msg;
    m_socket.recv(&message_msg);

    return std::string(static_cast<char*>(message_msg.data()), message_msg.size());
}
