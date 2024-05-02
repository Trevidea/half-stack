#ifndef RESPONSE_H
#define RESPONSE_H

#include <iostream>

class Response {
private:
    static int s_count;
    int m_id = 0;
    std::string m_data;
    bool m_hasError = false;
    std::string m_errorMessage;
    int m_statusCode = 200; // Default status code is 200 OK

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
        m_statusCode = 400; // Setting default error status code to 400 Bad Request
    }

    std::string getErrorMessage() const {
        return m_errorMessage;
    }

    void setStatus(int statusCode) {
        m_statusCode = statusCode;
    }

    int getStatusCode() const {
        return m_statusCode;
    }

    ~Response();
};

#endif // RESPONSE_H
