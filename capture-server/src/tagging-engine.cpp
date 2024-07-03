#include "tagging-engine.h"
#include "gateway.h"
#include "tag-json.h"

TaggingEngine::TaggingEngine(/* args */)
{
}

TaggingEngine::~TaggingEngine()
{
}

void TaggingEngine::report()
{
    Gateway::instance().route("GET", "/api/tagging-engine/tags", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                const std::string event_id = req.getQueryValue("event-id");
                                TagJson tag{"."};
                                const std::string tags = tag.fetchTagsForEvent(event_id);
                                if (tag.err().empty())
                                  {
                                      Json::Value tagsJson = Json::arrayValue;
                                      Json::Reader().parse(tags, tagsJson);
                                      std::vector<Json::Value> tagColl {tagsJson.begin(), tagsJson.end()};
                                      auto strResponse = Gateway::instance().formatResponse({tagColl});
                                      rsp.setData(strResponse);
                                  }
                                  else
                                  {
                                      Json::Value result = Json::objectValue;
                                      result["err"] = tag.err();
                                      auto strResponse = Gateway::instance().formatResponse({{result}});
                                      rsp.setError(tag.err());
                                  }
                              });
    Gateway::instance().route("POST", "/api/tagging-engine/mark", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {

                                  std::string json_str = req.data();
                                  TagJson tag{"."};
                                  tag.mark(json_str);
                                  if (tag.err().empty())
                                  {
                                      Json::Value result = Json::objectValue;
                                      result["path"] = tag.path();
                                      auto strResponse = Gateway::instance().formatResponse({{result}});
                                      rsp.setData(strResponse);
                                  }
                                  else
                                  {
                                      Json::Value result = Json::objectValue;
                                      result["err"] = tag.err();
                                      auto strResponse = Gateway::instance().formatResponse({{result}});
                                      rsp.setError(tag.err());
                                  }
                              });
}