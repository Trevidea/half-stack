#include <event-runner.h>
#include <spdlog/spdlog.h>
#include "publisher.h"
#include "event-preview.h"
#include "live-event.h"
#include "gateway.h"
std::string EventRunner::getEventPreviewData()
{
    EventPreview ep;

    ep.setCityAddress("Ludhiana");
    ep.setDtEvent("2024-05-01");
    ep.activeDevices().push_back(Device());
    {
        auto &device = ep.activeDevices().back();
        device.setDeviceId("1");
        device.setDeviceType("iPad");
        device.setLocation("North-End");
    }
    ep.setDetailType("ondemand");
    ep.setStreetAddress("Indoor Stadium, Pakhowal road");
    ep.setDtEvent("2024-04-15");
    ep.setEventType("ondemand");
    ep.setLevel("University");
    ep.setProgram("Men");
    ep.setSport("Football");
    ep.setStatus("Upcoming");
    ep.setTime(1830);
    ep.setTitle("Mumbai Indians vs Kolkatta Knightriders");
    ep.setVenueLocation("Ludhiana");
    ep.setYear(2024);

    return ep.toResponse();
}
std::string EventRunner::getLiveEventData()
{      
    LiveEvent le;
    le.setSport("Football");
    le.setLevel("University");
    le.setProgram("Men");
    le.setYear(2024);
    le.setDtEvent("2024-04-15");
    le.setTime(1402);
    le.setVenueLocation("Delhi");
    le.setDetailType("Scheduled Event");
    le.setDetailStreetAddress("Sector 32");
    le.setDetailCityAddress("Delhi");
    le.setTitle("Manchester vs Barcelona");
    le.setStatus("Upcoming");       

    ConnectionDetail connectionDetail;
    connectionDetail.setId(1);
    connectionDetail.setName("Device1");
    connectionDetail.setRole("Transmitter");
    connectionDetail.setLocation("North End");
    connectionDetail.setDevice("iPad");
    connectionDetail.setNetwork("WiFi");
    connectionDetail.setQuality(QualityEnum::Good);
    connectionDetail.setIpAddress("192.168.1.1");
    connectionDetail.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail.setFilesReceived(10);
    connectionDetail.setRetries(3);

    ConnectionDetail connectionDetail1;
    connectionDetail1.setId(2);
    connectionDetail1.setName("Device2");
    connectionDetail1.setRole("Receiver");
    connectionDetail1.setLocation("South End");
    connectionDetail1.setDevice("iPhone");
    connectionDetail1.setNetwork("Mobile Data");
    connectionDetail1.setQuality(QualityEnum::Average);
    connectionDetail1.setIpAddress("192.168.1.2");
    connectionDetail1.setTransmitStatus(TransmitEnum::Receiving);
    connectionDetail1.setFilesReceived(5);
    connectionDetail1.setRetries(2);

    ConnectionDetail connectionDetail2;
    connectionDetail2.setId(3);
    connectionDetail2.setName("Device3");
    connectionDetail2.setRole("Transmitter");
    connectionDetail2.setLocation("East End");
    connectionDetail2.setDevice("MacBook");
    connectionDetail2.setNetwork("WiFi");
    connectionDetail2.setQuality(QualityEnum::Poor);
    connectionDetail2.setIpAddress("192.168.1.3");
    connectionDetail2.setTransmitStatus(TransmitEnum::Streaming);
    connectionDetail1.setFilesReceived(5);
    connectionDetail1.setRetries(2);

    le.setConnectionDetails({connectionDetail});

    return le.toResponse();
}
EventRunner::EventRunner(const int year, const int month, const int day, const int hour, const int min, const int sec, const int duration) : mp_eventPreviewPublisher{new WorkerLoop(2, [this]()
                                                                                                                                                                                     { Publisher::instance().publish("event-preview", this->getEventPreviewData()); })},
                                                                                                                                             mp_liveEventPublisher{new WorkerLoop(2, [this]()
                                                                                                                                                                                  { Publisher::instance().publish("live-event", this->getLiveEventData()); })},
                                                                                                                                             m_start{year, month, day, hour, min, sec, std::bind(&EventRunner::eventStarted, this)},
                                                                                                                                             m_end{m_start, duration, std::bind(&EventRunner::eventEnded, this)}
{     
    this->mp_eventPreviewPublisher->start();
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
    this->mp_eventPreviewPublisher->stop();
    spdlog::trace("Event started..");
    Publisher::instance().publish("event-terminal", "{'terminal':'start'}");
    this->mp_liveEventPublisher->start();
}
void EventRunner::eventEnded()
{
    this->mp_liveEventPublisher->stop();
    spdlog::trace("Event ended..");
    Publisher::instance().publish("event-terminal", "{'terminal':'stop'}");
}

EventRunner::~EventRunner()
{
    this->stop();
}