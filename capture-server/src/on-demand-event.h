#ifndef ON_DEMAND_EVENT_H
#define ON_DEMAND_EVENT_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"
#include "event.h"   // Include Event header for using Event class
#include "gateway.h" // Include Gateway header for using Gateway class
#include "event.h"
#include "user-profile.h"

class OnDemandEvent : public EntityBase
{
public:
    OnDemandEvent();
    void report() override;

    // Getter properties
    Event &event()
    {
        if(m_event.notSet())
            this->m_event = EntityBase::byId<Event>(m_model.get<int>("event_id"));
        return this->m_event;
    }
    UserProfile &owner()
    {
        if(m_userProfile.notSet())
            this->m_userProfile = EntityBase::byId<UserProfile>(m_model.get<int>("owner_id"));
        return this->m_userProfile;
    }
    
private:
    Event m_event;
    UserProfile m_userProfile;
};

#endif // ON_DEMAND_EVENT_H
