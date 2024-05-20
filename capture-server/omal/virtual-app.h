#ifndef VIRTUALAPP_H
#define VIRTUALAPP_H

#include <string>
#include "virtual-host-conf.h"
#include "output-profile.h"
#include <map>
#include "watcher.h"
#include "network-quality-assessment.h"
#include <json/json.h>
#include  <vector>

class VirtualHost;

class VirtualApp
{
public:
    Json::Value deepFindOrCreate();
    friend class VirtualHost;
    // Destructor declaration
    ~VirtualApp();
    std::vector<std::string> getStreamsList();
    Json::Value getStreamInfo(const std::string &streamKey);
    void startDump(const std::string &streamName, const std::string &streamId, const std::string &outPath, Json::Value &result);
    void stopDump(const std::string &streamName, const std::string &streamId, Json::Value &result);
    static std::vector<std::string> getAll(const std::string &vhost);

private:
    VirtualApp(const std::string &name, const std::string &vhost);
    int deepFind(const std::string &name);
    int deepCreate(const std::string &name, char *msg = nullptr);

    inline std::string recipeStartDump(const std::string &stream, const std::string &dump_id, const std::string &out_path) const
    {
        std::string recipe = R"V0G0N(
            {
                "outputStreamName": "<<stream>>",
                "id": "<<dump_id>>",
                "outputPath": "<<out_path>>",
            }
    
            )V0G0N";
        std::string param1 = "<<stream>>";
        size_t pos1 = recipe.find(param1);
        recipe.replace(pos1, param1.size(), stream);

        std::string param2 = "<<dump_id>>";
        size_t pos2 = recipe.find(param2);
        recipe.replace(pos2, param2.size(), dump_id);

        std::string param3 = "<<out_path>>";
        size_t pos3 = recipe.find(param3);
        recipe.replace(pos3, param3.size(), out_path);

        return recipe;
    }
    inline std::string recipeStopDump(const std::string &stream, const std::string &dump_id) const
    {
        std::string recipe = R"V0G0N(
            {
            "outputStreamName": "<<stream>>",
            "id": "<<dump_id>>"
            }
    
            )V0G0N";
        std::string param1 = "<<stream>>";
        size_t pos1 = recipe.find(param1);
        recipe.replace(pos1, param1.size(), stream);

        std::string param2 = "<<dump_id>>";
        size_t pos2 = recipe.find(param2);
        recipe.replace(pos2, param2.size(), dump_id);

        return recipe;
    }
    inline std::string recipeVApp(const std::string &name) const
    {
        std::string recipe = R"V0G0N(
            [
                {
                    "name": "<<app>>",
                    "type": "live",
                    "outputProfiles": {
                        "outputProfile": [
                            {
                                "name": "default",
                                "outputStreamName": "${OriginStreamName}",
                                "encodes": {
                                    "audios": [
                                        {
                                            "name": "opus",
                                            "codec": "opus",
                                            "samplerate": 48000,
                                            "bitrate": 128000,
                                            "channel": 2,
                                            "bypassIfMatch": {
                                                "codec": "eq"
                                            }
                                        },
                                        {
                                            "name": "aac",
                                            "codec": "aac",
                                            "samplerate": 48000,
                                            "bitrate": 128000,
                                            "channel": 2,
                                            "bypassIfMatch": {
                                                "codec": "eq"
                                            }
                                        }
                                    ],
                                    "videos": [
                                        {
                                            "name": "bypass_video",
                                            "bypass": true
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "providers": {
                        "ovt": {},
                        "rtmp": {},
                        "rtspPull": {},
                        "srt": {},
                        "webrtc": {}
                    },
                    "publishers": {
                        "llhls": {},
                        "rtmpPush":{}
                    }
                }
            ]
    
            )V0G0N";
        std::string param1 = "<<app>>";
        size_t pos = recipe.find(param1);
        recipe.replace(pos, param1.size(), name);
        return recipe;
    }

private:
    std::string m_name, m_vhost;
};

#endif // VIRTUALAPP_H
