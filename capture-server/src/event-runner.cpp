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

    if (EventRunner::s_deviceCountDirty.get())
    {
        EventRunner::s_deviceCountDirty = false;

        EventDevice eventDevice;
        char query[128] = {'\0'};
        snprintf(query, 128, "event_id=%d", this->m_event.id());
        this->m_activeDevices = eventDevice.find<EventDevice>(query);
    }

    ep.setActiveDevices(this->m_activeDevices);

    std::string previewData = ep.toResponse();
    spdlog::info("Processing runner for event ID: {}", previewData);
    Publisher::instance().publish("event-preview", previewData);
}

void EventRunner::publishLiveData()
{

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
    // le.setSport("Football");
    // le.setLevel("University");
    // le.setProgram("Men");
    // le.setYear(2024);
    // le.setDtEvent("2024-04-15");
    // le.setTime(1402);
    // le.setVenueLocation("Delhi");
    // le.setDetailType("Scheduled Event");
    // le.setDetailStreetAddress("Sector 32");
    // le.setDetailCityAddress("Delhi");
    // le.setTitle("Manchester vs Barcelona");
    // le.setStatus("Upcoming");

    ConnectionDetail connectionDetail;
    connectionDetail.setId(1);
    connectionDetail.setName("Coach S.");
    connectionDetail.setRole("Subscriber");
    connectionDetail.setLocation("Press Box");
    connectionDetail.setDevice("iPad15");
    connectionDetail.setNetwork("Penfield-532");
    connectionDetail.setQuality(QualityEnum::Good);
    connectionDetail.setIpAddress("192.168.1.1");
    connectionDetail.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail.setFilesReceived(10);
    connectionDetail.setRetries(3);

    ConnectionDetail connectionDetail1;
    connectionDetail1.setId(2);
    connectionDetail1.setName("Coach J.");
    connectionDetail1.setRole("Publisher");
    connectionDetail1.setLocation("Sideline");
    connectionDetail1.setDevice("iPad22");
    connectionDetail1.setNetwork("Penfield-532");
    connectionDetail1.setQuality(QualityEnum::Poor);
    connectionDetail1.setIpAddress("192.168.1.2");
    connectionDetail1.setTransmitStatus(TransmitEnum::Receiving);
    connectionDetail1.setFilesReceived(5);
    connectionDetail1.setRetries(2);

    ConnectionDetail connectionDetail2;
    connectionDetail2.setId(3);
    connectionDetail2.setName("Coach M.");
    connectionDetail2.setRole("Subscriber");
    connectionDetail2.setLocation("Press Box");
    connectionDetail2.setDevice("Camcorder");
    connectionDetail2.setNetwork("Penfield-532");
    connectionDetail2.setQuality(QualityEnum::Poor);
    connectionDetail2.setIpAddress("192.168.1.3");
    connectionDetail2.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail2.setFilesReceived(5);
    connectionDetail2.setRetries(2);

    le.setConnectionDetails({connectionDetail, connectionDetail1, connectionDetail2});

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
        //TODO::REPLACE THE BELOW PATH WITH /opt/ovenmediaengine/bin/dumps
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