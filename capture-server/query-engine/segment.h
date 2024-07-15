#ifndef SEGMENT_H
#define SEGMENT_H

#include <string>
#include "timestamp.h" 

class Segment
{
public:
    Segment(const std::string &dateTime, double dur, const std::string &uri);
    Segment(const Timestamp &dateTime, double dur, const std::string &uri);

    Timestamp getProgDateTime() const;
    double getDuration() const;
    std::string getSegUri() const;

    bool belongs(const Timestamp &ts) const;

private:
    Timestamp progDateTime;
    double duration;
    std::string segUri;
};

#endif // SEGMENT_H
