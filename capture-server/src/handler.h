#ifndef HANDLER_H
#define HANDLER_H
#include <iostream>


class Handler
{
private:


public:
    Handler();

    virtual void report() = 0;
    ~Handler();
};


#endif // HANDLER_H