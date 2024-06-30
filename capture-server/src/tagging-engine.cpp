#include "tagging-engine.h"
#include "gateway.h"
#include "json-driver.h"

TaggingEngine::TaggingEngine(/* args */)
{
}

TaggingEngine::~TaggingEngine()
{
}
void TaggingEngine::report()
{
    Gateway::instance().route("GET", "/api/tagging-engine", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                JsonDriver jd;
                              });
}