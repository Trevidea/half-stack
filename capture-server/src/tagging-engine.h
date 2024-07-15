#ifndef TAGGING_ENGINE_H
#define TAGGING_ENGINE_H
#include "handler.h"


class TaggingEngine: public Handler
{
private:
    /* data */
public:
    TaggingEngine(/* args */);
    void report() override;
    ~TaggingEngine();   
};




#endif //TAGGING_ENGINE_H