#include "Publisher.h"

Publisher::Publisher(const std::string& address) : m_context(1), m_socket(m_context, ZMQ_PUB) {
    m_socket.bind(address);
}

void Publisher::publish(const std::string& topic, const std::string& message) {
    zmq::message_t topic_msg(topic.size());
    memcpy(topic_msg.data(), topic.data(), topic.size());
    m_socket.send(topic_msg, ZMQ_SNDMORE);

    zmq::message_t message_msg(message.size());
    memcpy(message_msg.data(), message.data(), message.size());
    m_socket.send(message_msg);
}
