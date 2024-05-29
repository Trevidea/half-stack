#include <event-runner.h>
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
#include "event-manager.h"
#include "worker-loop.h"
#include "omal-factory.h"
#include "virtual-host.h"
#include "virtual-app.h"

ThreadSafeBool EventRunner::s_deviceCountDirty{true};

void EventRunner::publishPreviewData()
{
    spdlog::trace("Venue: {}", this->m_event.venueLocation());

    Json::Value model(Json::objectValue); // Create a Json::Value object
    EventPreview ep(model);

    ep.setSport(this->m_event.sport());
    ep.setLevel(this->m_event.level());
    ep.setProgram(this->m_event.program());
    ep.setYear(this->m_event.year());
    ep.setDtEvent(this->m_event.dtEvent());
    ep.setTime(this->m_event.tmEvent());
    ep.setVenueLocation(this->m_event.venueLocation());
    ep.setStreetAddress(this->m_event.streetAddress());
    ep.setCityAddress(this->m_event.cityAddress());
    ep.setTitle(this->m_event.title());
    ep.setStatus(this->m_event.status());
    ep.setEventType(this->m_event.type());

    // if (EventRunner::s_deviceCountDirty.get())
    // {
    //     EventRunner::s_deviceCountDirty = false;

    //     EventDevice eventDevice;
    //     char query[128] = {'\0'};
    //     snprintf(query, 128, "event_id=%d", this->m_event.id());
    //     this->m_activeDevices = eventDevice.find<EventDevice>(query);
    // }
    
    spdlog::trace("Calling EventDevice().activeDevices with event id: {}", this->m_event.id());
    DataSet dataSet = EventDevice().activeDevices(this->m_event.id());
    std::vector<EventDevice> devices;
    auto it = dataSet.iterator();
    while (it.hasNext())
    {
        auto entry = it.next();

        if(!entry.isNull())
        {
            spdlog::trace("Processing entry in preview data: {}", entry.toStyledString());

            EventDevice device;
            device.setDeviceId(it.getValue("device_id").asInt());
            device.setAppName(it.getValue("app_name").asString());
            device.setDirection(it.getValue("direction").asInt());
            device.setLocation(it.getValue("location").asString());
            device.setName(it.getValue("name").asString());
            device.setNetwork(it.getValue("network").asString());
            device.setPin(it.getValue("pin").asString());
            device.setDeviceType(it.getValue("type").asString());

            devices.push_back(device);
        }
    }
    

    ep.setActiveDevices(devices);

    std::string previewData = ep.toResponse();
    spdlog::info("Processing runner for event ID: {}", previewData);
    Publisher::instance().publish("event-preview", previewData);
}

void EventRunner::publishLiveData()
{
    spdlog::trace("Entering publishLiveData()");

    LiveEvent le;

    le.setSport(this->m_event.sport());
    le.setLevel(this->m_event.level());
    le.setProgram(this->m_event.program());
    le.setYear(this->m_event.year());
    le.setDtEvent(this->m_event.dtEvent());
    le.setTime(this->m_event.tmEvent());
    le.setVenueLocation(this->m_event.venueLocation());
    le.setDetailStreetAddress(this->m_event.streetAddress());
    le.setDetailCityAddress(this->m_event.cityAddress());
    le.setTitle(this->m_event.title());
    le.setStatus(this->m_event.status());
    le.setType(this->m_event.type());

    spdlog::trace("Checking if s_deviceCountDirty is true");
    // if (EventRunner::s_deviceCountDirty.get())
    // EventRunner::s_deviceCountDirty = false;
    spdlog::trace("Calling EventDevice().activeDevices with event id: {}", this->m_event.id());
    DataSet activeDevices = EventDevice().activeDevices(this->m_event.id());
    std::vector<ConnectionDetail> connectionDetails;
    auto it = activeDevices.iterator();
    while (it.hasNext())
    {
        auto entry = it.next();

        if (!entry.isNull())
        {
            spdlog::trace("Processing entry in live data: {}", entry.toStyledString());

            std::string dat1 = Json::FastWriter().write(entry);
            ConnectionDetail connectionDetail;
            connectionDetail.setId(it.getValue("id").asInt());
            connectionDetail.setName(it.getValue("name").asString());
            connectionDetail.setRole(it.getValue("role").asString());
            connectionDetail.setLocation(it.getValue("location").asString());
            connectionDetail.setDevice(it.getValue("device").asString());
            connectionDetail.setDeviceType(it.getValue("deviceType").asString());
            connectionDetail.setNetwork(it.getValue("network").asString());
            connectionDetail.setQuality(it.getValue("quality").asString());
            connectionDetail.setIpAddress(it.getValue("ip_add").asString());
            connectionDetail.setTransmitStatus(it.getValue("transmitstatus").asString());
            connectionDetail.setFilesReceived(it.getValue("filesrecieved").asInt());
            connectionDetail.setRetries(it.getValue("retries").asInt());
            connectionDetail.setDirection(it.getValue("direction").asInt());
            connectionDetail.setPin(it.getValue("pin").asString());
            connectionDetail.setAppName(it.getValue("app_name").asString());
            connectionDetail.setDeviceId(it.getValue("device_id").asInt());
            connectionDetails.push_back(connectionDetail);
        }
    }
    le.setConnectionDetails(connectionDetails);

    std::string liveData = le.toResponse();

    Publisher::instance().publish("live-event", liveData);
}

EventRunner::EventRunner(const Event &&event)
    : mp_eventPreviewPublisher{new WorkerLoop(2, std::bind(&EventRunner::publishPreviewData, this))},
      mp_liveEventPublisher{new WorkerLoop(2, std::bind(&EventRunner::publishLiveData, this))},
      m_start{event.getDTUDate().year, event.getDTUDate().month, event.getDTUDate().date, event.getDTUTime().hours, event.getDTUTime().minutes, event.getDTUTime().seconds, std::bind(&EventRunner::eventStarted, this)},
      m_end{m_start, event.duration(), std::bind(&EventRunner::eventEnded, this)},
      m_event{event}
{
    this->mp_eventPreviewPublisher->start();
    this->m_event.updateStatus(Event::EVENT_STATUS::ON_GOING);
}
void EventRunner::stop()
{
    if (!this->m_stopped)
    {
        this->m_stopped = true;
        this->m_start.abort();
        this->m_end.abort();
        this->mp_eventPreviewPublisher->stop();
        this->mp_liveEventPublisher->stop();
    }
}

void EventRunner::eventStarted()
{
    this->m_eventStarted = true;

    spdlog::trace("Event state set to started");

    this->mp_eventPreviewPublisher->stop();

    spdlog::trace("Event preview publisher stopped");

    spdlog::trace("Event started..");
    Publisher::instance().publish("event-terminal", "{'terminal':'start'}");
    this->mp_liveEventPublisher->start();
    spdlog::trace("Live event publisher started");
    for (auto &&eventDevice : this->m_activeDevices)
    {
        std::string appName = eventDevice.appName();
        std::string streamName = eventDevice.streamName();
        std::string streamId = eventDevice.streamId();
        // TODO::REPLACE THE BELOW PATH WITH /opt/ovenmediaengine/bin/dumps
        std::string outPath = "/opt/ovenmediaengine/bin/dumps/" + streamName;

        spdlog::trace("Processing event device with appName: {}, streamName: {}, streamId: {}, outPath: {}",
                      appName, streamName, streamId, outPath);

        auto &vh = OMALFactory::getInstance().create("spip");
        Json::Value result = Json::objectValue;

        spdlog::trace("Creating app with appName: {}", appName);
        auto va = vh.createApp(appName, result);

        spdlog::trace("Starting dump with streamName: {}, streamId: {}, outPath: {}", streamName, streamId, outPath);
        va.startDump(streamName, streamId, outPath, result);
    }
    spdlog::trace("Exited eventStarted function");
}

void EventRunner::eventEnded()
{
    for (auto &&eventDevice : this->m_activeDevices)
    {
        std::string appName = eventDevice.appName();
        std::string streamName = eventDevice.streamName();
        std::string streamId = eventDevice.streamId();
        std::string outPath = "/opt/ovenmediaengine/bin/dumps/" + streamName;
        auto &vh = OMALFactory::getInstance().create("spip");
        Json::Value result = Json::objectValue;
        auto va = vh.createApp(appName, result);
        va.stopDump(streamName, streamId, result);
    }
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    Publisher::instance().publish("event-terminal", "{'terminal':'stop'}");
    this->m_event.updateStatus(Event::EVENT_STATUS::PAST);
}

EventRunner::~EventRunner()
{
    this->stop();
}