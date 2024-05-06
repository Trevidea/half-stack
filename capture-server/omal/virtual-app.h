#ifndef VIRTUALAPP_H
#define VIRTUALAPP_H

#include <string>
#include "virtual-host-conf.h"
#include "output-profile.h"
#include <map>
#include "watcher.h"
#include "network-quality-assessment.h"
#include <json/json.h>

class VirtualHost;

class VirtualApp
{
public:
    Json::Value deepFindOrCreate();
    friend class VirtualHost;
    // Destructor declaration
    ~VirtualApp();

private:
    VirtualApp(const std::string &name, const std::string &vhost);
    int deepFind(const std::string &name);
    int deepCreate(const std::string &name, char *msg = nullptr);
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
