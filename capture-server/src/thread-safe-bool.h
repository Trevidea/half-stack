#ifndef THREADSAFEBOOL_H
#define THREADSAFEBOOL_H

#include <mutex>

class ThreadSafeBool
{
private:
    bool value;
    mutable std::mutex mtx; 

public:
    ThreadSafeBool(bool initialValue = false) : value(initialValue) {}

    bool get() const
    {
        std::lock_guard<std::mutex> lock(mtx);
        return value;
    }

    void set(bool newValue)
    {
        std::lock_guard<std::mutex> lock(mtx);
        value = newValue;
    }
    ThreadSafeBool& operator=(bool newValue)
    {
        set(newValue); 
        return *this;
    }
};

#endif // THREADSAFEBOOL_H
