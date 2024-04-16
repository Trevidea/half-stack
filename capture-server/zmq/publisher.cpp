#include "publisher.h"

Publisher *Publisher::mp_instance = nullptr;
std::mutex Publisher::instance_creation_mutex;

Publisher &Publisher::instance()
{
    if (!mp_instance)
    {
        instance_creation_mutex.lock();
        {
            mp_instance = new Publisher("tcp://127.0.0.1:4001");
        }
        instance_creation_mutex.unlock();
    }
    return *mp_instance;
}
Publisher::Publisher(const std::string &address) : m_context(1), m_socket(m_context, ZMQ_PUB)
{
    m_socket.bind(address);
}

void Publisher::publish(const std::string &topic, const std::string &message)
{
    zmq::message_t topic_msg(topic.size());
    memcpy(topic_msg.data(), topic.data(), topic.size());
    m_socket.send(topic_msg, ZMQ_SNDMORE);

    zmq::message_t message_msg(message.size());
    memcpy(message_msg.data(), message.data(), message.size());
    m_socket.send(message_msg);
}
Publisher::~Publisher()
{
    this->m_socket.close();
    this->m_context.close();
    delete mp_instance;
}