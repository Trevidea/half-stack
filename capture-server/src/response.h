#ifndef RESPONSE_H
#define RESPONSE_H
#include <iostream>


class Response
{
private:
    static int s_count;
    int m_id = 0;
    std::string m_data;
    
public:
    Response();

    std::string data();
    void setData(const std::string &d);

    inline int id()
    {
        return this->m_id;
    }

    void complete();

    ~Response();
};


#endif // RESPONSE_H