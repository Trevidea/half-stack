#ifndef VIRTUALHOST_H
#define VIRTUALHOST_H

#include <string>
#include "virtual-host-conf.h"
#include "output-profile.h"
#include <map>
#include "watcher.h"
#include "network-quality-assessment.h"
#include <json/json.h>
#include "virtual-app.h"

class OMALFactory;

class VirtualHost
{
public:
    const char *DUMPS_BASE_LOCATION = "/tmp/ovenmediaengine/vod_dumps";
    // const char *DUMPS_BASE_LOCATION = "/usr/share/ovenmediaengine/conf/html";
    friend class OMALFactory;

    std::map<std::string, std::string> getVODDumps();

    Json::Value deepFindOrCreate();
    VirtualApp createApp(const std::string &app, Json::Value &result, bool findOnly = false);

    // Destructor declaration
    ~VirtualHost();

private:
    VirtualHost(const std::string &name, const omal::vhost &vhost);
    int deepFind(const std::string &name);
    int deepCreate(const std::string &name, char *msg = nullptr);
    inline std::string recipeVHost(const std::string &name) const
    {
        std::string recipe = R"V0G0N(
             [
                {
                    "name": "<<vhost>>",
                    "host": {
                        "names": [
                            "drake.in"
                        ],
                        "tls": {
                            "certPath": "/opt/ovenmediaengine/bin/origin_conf/cert.pem",
                            "chainCertPath": "/opt/ovenmediaengine/bin/origin_conf/chain.pem",
                            "keyPath": "/opt/ovenmediaengine/bin/origin_conf/privkey.pem"
                        }
                    },
                    "admissionWebhooks": {
                        "controlServerUrl": "https://5448ac20-91d3-4d4f-ac16-66ed79090dff.mock.pstmn.io/api/control-server",
                        "enables": {
                            "providers": "rtmp,webrtc,srt",
                            "publishers": "webrtc,llhls"
                        },
                        "timeout": 3000
                    }
                }
            ]
            )V0G0N";
        std::string param1 = "<<vhost>>";
        size_t pos = recipe.find(param1);
        recipe.replace(pos, param1.size(), name);
        return recipe;
    }

private:
    std::string m_name;
    omal::vhost m_vhost;
    std::string m_dumpsBaseLocation;
};

#endif // VIRTUALHOST_H
