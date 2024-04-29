#ifndef RESPONSE_H
#define RESPONSE_H

#include <iostream>

class Response {
private:
    static int s_count;
    int m_id = 0;
    std::string m_data;
    bool m_hasError = false; // Declare m_hasError here
    std::string m_errorMessage;

public:
    Response();

    std::string data();
    void setData(const std::string &d);

    inline int id() {
        return this->m_id;
    }

    void complete();

    bool hasError() const {
        return m_hasError;
    }

    void setError(const std::string &errorMessage) {
        m_hasError = true;
        m_errorMessage = errorMessage;
    }

    std::string getErrorMessage() const {
        return m_errorMessage;
    }

    ~Response();
};

#endif // RESPONSE_H
