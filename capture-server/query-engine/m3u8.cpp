#include "m3u8.h"
#include <regex>

void M3U8::parse(const std::string& content) {
    std::regex versionRegex(R"(#EXT-X-VERSION:(\d+))");
    std::regex independentSegmentsRegex(R"(#EXT-X-INDEPENDENT-SEGMENTS)");
    std::regex mediaRegex(R"V0G0N(#EXT-X-MEDIA:TYPE=([^,]+),GROUP-ID="([^"]+)",NAME="([^"]+)",DEFAULT=([^,]+),AUTOSELECT=([^,]+),CHANNELS="([^"]+)",URI="([^"]+)")V0G0N");
    std::regex streamRegex(R"V0G0N(#EXT-X-STREAM-INF:BANDWIDTH=(\d+),RESOLUTION=([^,]+),FRAME-RATE=([\d.]+),CODECS="([^"]+)",AUDIO="([^"]+)"\n([^#\n]+))V0G0N");

    std::smatch match;

    // Parse version
    if (std::regex_search(content, match, versionRegex)) {
        version = match[1];
    }

    // Parse independent segments
    independentSegments = std::regex_search(content, independentSegmentsRegex);

    // Parse media
    auto mediaBegin = std::sregex_iterator(content.begin(), content.end(), mediaRegex);
    auto mediaEnd = std::sregex_iterator();
    for (std::sregex_iterator i = mediaBegin; i != mediaEnd; ++i) {
        std::smatch match = *i;
        Audio media = {
            match[1], match[2], match[3], match[4] == "YES", match[5] == "YES", match[6], match[7]
        };
        audioList.push_back(media);
    }

    // Parse streams
    auto streamBegin = std::sregex_iterator(content.begin(), content.end(), streamRegex);
    auto streamEnd = std::sregex_iterator();
    for (std::sregex_iterator i = streamBegin; i != streamEnd; ++i) {
        std::smatch match = *i;
        Video stream = {
            std::stoi(match[1]), match[2], std::stod(match[3]), match[4], match[5], match[6]
        };
        videoList.push_back(stream);
    }
}
std::string M3U8::getVersion() const
{
    return version;
}

bool M3U8::getIndependentSegments() const
{
    return independentSegments;
}

std::vector<M3U8::Audio> M3U8::getAudioList() const
{
    return audioList;
}

std::vector<M3U8::Video> M3U8::getVideoList() const
{
    return videoList;
}