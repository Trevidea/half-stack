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

    Gateway::instance().route("POST", "/api/tagging-engine/query", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  Json::Value data = req.json();
                                  std::string query = "json_extract(data, '$.data[*].baller') = 'Bumrah'"; // Change this query as needed

                                  TagJson tag{"."};
                                  std::vector<std::string> results = tag.query_json_data("10", query);

                                //   if (tag.err().empty())
                                //   {
                                //       Json::Value tagsJson = Json::arrayValue;
                                //       Json::Reader().parse(tags, tagsJson);
                                //       std::vector<Json::Value> tagColl{tagsJson.begin(), tagsJson.end()};
                                //       auto strResponse = Gateway::instance().formatResponse({tagColl});
                                //       rsp.setData(strResponse);
                                //   }
                                //   else
                                //   {
                                //       Json::Value result = Json::objectValue;
                                //       result["err"] = tag.err();
                                //       auto strResponse = Gateway::instance().formatResponse({{result}});
                                //       rsp.setError(tag.err());
                                //   }
                              });
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
                                      std::vector<Json::Value> tagColl{tagsJson.begin(), tagsJson.end()};
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
    Gateway::instance().route("PUT", "/api/tagging-engine/mark", // Ensure the correct endpoint is handled
                              [this](const Request &req, Response &rsp)
                              {
                                  std::string data = req.data();
                                  std::string ts = req.getQueryValue("ts");
                                  std::string event_id = req.getQueryValue("event_id");

                                  TagJson tag{"."};
                                  tag.update(event_id, ts, data);
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