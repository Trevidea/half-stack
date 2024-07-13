#ifndef M3U8_H
#define M3U8_H

#include <string>
#include <vector>

class M3U8
{
public:
    struct Audio
    {
        std::string type;
        std::string groupId;
        std::string name;
        bool isDefault;
        bool autoSelect;
        std::string channels;
        std::string uri;
    };

    struct Video
    {
        int bandwidth;
        std::string resolution;
        double frameRate;
        std::string codecs;
        std::string audio;
        std::string uri;
    };

    std::string getVersion() const;
    bool getIndependentSegments() const;
    std::vector<Audio> getAudioList() const;
    std::vector<Video> getVideoList() const;

    void parse(const std::string &content);

private:
    std::string version;
    bool independentSegments;
    std::vector<Audio> audioList;
    std::vector<Video> videoList;
};

#endif // M3U8_H