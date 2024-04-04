#ifndef ON_DEMAND_EVENT_H
#define ON_DEMAND_EVENT_H

#include "entity-base.h"
#include "gateway.h"
#include "json/json.h"
#include "event.h"

class OnDemandEvent : public EntityBase {
public:
    OnDemandEvent();

    void report();

    // Setter methods for event_id and owner_id
    void setEventId(int eventId) { this->event_id = eventId; }
    void setOwnerId(int ownerId) { this->owner_id = ownerId; }

private:
    void list(const Request &request, Response &response);
    Json::Value create(const Request &request, Response &response); // Update return type
    void remove(const Request &request, Response &response);

    // Properties
    int event_id;
    int owner_id;
};

#endif // ON_DEMAND_EVENT_H
