#ifndef PAST_EVENT_H
#define PAST_EVENT_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"

class PastEvent : public EntityBase
{
public:
    PastEvent();
    void report() override;

};

#endif // PAST_EVENT_H
