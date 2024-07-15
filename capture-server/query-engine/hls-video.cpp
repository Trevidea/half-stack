#include "hls-video.h"
#include <regex>
#include <sstream>

std::string HLSVideo::getVersion() const { return version; }
int HLSVideo::getTargetDuration() const { return targetDuration; }
int HLSVideo::getMediaSequence() const { return mediaSequence; }
std::string HLSVideo::getMapUri() const { return mapUri; }
std::vector<Segment> HLSVideo::getSegments() const { return segments; }

void HLSVideo::setVersion(const std::string &version) { this->version = version; }
void HLSVideo::setTargetDuration(int targetDuration) { this->targetDuration = targetDuration; }
void HLSVideo::setMediaSequence(int mediaSequence) { this->mediaSequence = mediaSequence; }
void HLSVideo::setMapUri(const std::string &mapUri) { this->mapUri = mapUri; }

void HLSVideo::addSegment(const std::vector<Segment> &segments)
{
    this->segments.insert(this->segments.end(), segments.begin(), segments.end());
}
void HLSVideo::addSegment(const Segment &segment)
{
    this->segments.push_back(segment);
}
void HLSVideo::addSegment(const Timestamp &dateTime, double dur, const std::string &uri)
{
    this->segments.push_back(Segment{dateTime, dur, uri});
}

void HLSVideo::init(const std::string &mapUri, int mediaSequence, int targetDuration)
{
    this->mapUri = mapUri;
    this->mediaSequence = mediaSequence;
    this->targetDuration = targetDuration;
    this->m_init = true;
}
void HLSVideo::parse(const std::string &content)
{
    std::regex versionRegex(R"(#EXT-X-VERSION:(\d+))");
    std::regex targetDurationRegex(R"(#EXT-X-TARGETDURATION:(\d+))");
    std::regex mediaSequenceRegex(R"(#EXT-X-MEDIA-SEQUENCE:(\d+))");
    std::regex mapUriRegex(R"(#EXT-X-MAP:URI="([^"]+))");
    std::regex segmentRegex(R"(#EXT-X-PROGRAM-DATE-TIME:([\d\-T:.+]+)\s+#EXTINF:([\d.]+),\s+([^\s#]+))");

    std::smatch match;

    // Parse version
    if (std::regex_search(content, match, versionRegex))
    {
        version = match[1];
    }

    // Parse target duration
    if (std::regex_search(content, match, targetDurationRegex))
    {
        targetDuration = std::stoi(match[1]);
    }

    // Parse media sequence
    if (std::regex_search(content, match, mediaSequenceRegex))
    {
        mediaSequence = std::stoi(match[1]);
    }

    // Parse map URI
    if (std::regex_search(content, match, mapUriRegex))
    {
        mapUri = match[1];
    }

    // Parse segments
    auto segmentBegin = std::sregex_iterator(content.begin(), content.end(), segmentRegex);
    auto segmentEnd = std::sregex_iterator();
    for (std::sregex_iterator i = segmentBegin; i != segmentEnd; ++i)
    {
        std::smatch match = *i;
        std::string dateTime = match[1];
        double duration = std::stod(match[2]);
        std::string segUri = match[3];

        segments.emplace_back(dateTime, duration, segUri);
    }
}

std::string HLSVideo::serialize() const
{
    std::stringstream ss;

    // Add the header
    ss << "#EXTM3U\n";
    ss << "#EXT-X-VERSION:" << version << "\n";
    ss << "#EXT-X-TARGETDURATION:" << targetDuration << "\n";
    ss << "#EXT-X-MEDIA-SEQUENCE:" << mediaSequence << "\n";
    ss << "#EXT-X-MAP:URI=\"" << mapUri << "\"\n";

    // Add each segment
    for (const auto &segment : segments)
    {
        ss << "#EXT-X-PROGRAM-DATE-TIME:" << segment.getProgDateTime().toString() << "\n";
        ss << "#EXTINF:" << segment.getDuration() << ",\n";
        ss << segment.getSegUri() << "\n";
    }

    // Add the endlist marker
    ss << "#EXT-X-ENDLIST\n";

    return ss.str();
}
