#ifndef HLSVIDEO_H
#define HLSVIDEO_H

#include <string>
#include <vector>
#include "segment.h"

class HLSVideo
{
public:
    // Constructor
    HLSVideo() = default;

    std::string getVersion() const;
    int getTargetDuration() const;
    int getMediaSequence() const;
    std::string getMapUri() const;
    std::vector<Segment> getSegments() const;

    void setVersion(const std::string &version);
    void setTargetDuration(int targetDuration);
    void setMediaSequence(int mediaSequence);
    void setMapUri(const std::string &mapUri);
    void addSegment(const std::vector<Segment> &segments);
    void addSegment(const Segment &segments);
    void addSegment(const Timestamp &dateTime, double dur, const std::string &uri);

    void parse(const std::string &content);
    std::string serialize() const;

    inline bool doneInit() const { return this->m_init; }
    void init(const std::string &mapUri, int mediaSequence, int targetDuration);

private:
    bool m_init = false;
    std::string version;
    int targetDuration;
    int mediaSequence;
    std::string mapUri;
    std::vector<Segment> segments;
};

#endif // HLSVIDEO_H
