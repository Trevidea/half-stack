#ifndef EVENTMANAGER_H
#define EVENTMANAGER_H

#include <iostream>
#include "entity-base.h"
#include "event-runner.h"
#include <chrono>
#include "datetimeutils.h"
#include <map>
#include <ctime>
#include "event.h"


class EventManager : public EntityBase
{
public:
    void report() override;
    EventManager();
    ~EventManager();

public:
    void openPreview(const Request &req, Response &rsp);
    void closePreview(const Request &req, Response &rsp);

    std::string getEventPreviewData(const int eventId);
    std::string getLiveEventData(const int eventId);
    
private:
    void closeAllPreviews(const Request &req, Response &rsp);
    void publishPreviewData();
    void publishLiveData();
private:
    std::map<int, EventRunner *> m_runners;
};

#endif // EVENTMANAGER_H
