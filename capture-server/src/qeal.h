#ifndef QEAL_H
#define QEAL_H
#include "handler.h"

class QEAL : public Handler
{
private:
public:
    QEAL();
    void report() override;
    ~QEAL();
};

const std::string M3U8_TEMPLATE = R"V0G0N(
#EXTM3U
#EXT-X-VERSION:6
#EXT-X-TARGETDURATION:0
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-MAP:URI=""
#EXT-X-ENDLIST
)V0G0N";

#endif // QEAL_H