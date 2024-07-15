#include "segment.h"

Segment::Segment(const std::string &dateTime, double dur, const std::string &uri)
    : progDateTime(dateTime), duration(dur), segUri(uri) {}
Segment::Segment(const Timestamp &dateTime, double dur, const std::string &uri)
    : progDateTime(dateTime), duration(dur), segUri(uri) {}

Timestamp Segment::getProgDateTime() const { return progDateTime; }
double Segment::getDuration() const { return duration; }
std::string Segment::getSegUri() const { return segUri; }

bool Segment::belongs(const Timestamp &ts) const
{
    Timestamp end = progDateTime + static_cast<long long>(duration * 1000);
    return ts.getEpochMillis() <= end.getEpochMillis() && ts.getEpochMillis() >= progDateTime.getEpochMillis();
}
