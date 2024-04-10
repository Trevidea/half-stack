#ifndef ON_DEMAND_EVENT_H
#define ON_DEMAND_EVENT_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"
#include "event.h" // Include Event header for using Event class
#include "gateway.h" // Include Gateway header for using Gateway class

class OnDemandEvent : public EntityBase
{
public:
    OnDemandEvent(); // Constructor

    // Report function
    void report();

    // Function to handle listing on-demand events
    // void list(const Request &request, Response &rsp);

    // Function to handle creating on-demand events
    void create(const Request &request, Response &response);

    // Function to handle removing on-demand events
    void remove(const Request &request, Response &rsp);
};

#endif // ON_DEMAND_EVENT_H
