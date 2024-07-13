#include "qeal.h"
#include "gateway.h"
#include "request.h"
#include "response.h"

#include "segment.h"
#include "m3u8.h"
#include "hls-video.h"
#include "fnv-1a.h"
#include <fstream>
#include "timestamp.h"

#include <map>

QEAL::QEAL()
{
}

void QEAL::report()
{
    Gateway::instance().route("POST", "/api/query-engine/create-playlist",
                              [this](const Request &req, Response &rsp)
                              {
                                  const std::string dumps = "/Users/manishverma/git/duckdb_query_tool";
                                  HLSVideo customPlaylist;
                                  customPlaylist.parse(M3U8_TEMPLATE);

                                  const Json::Value taggingData = req.json();
                                  if (taggingData.isArray())
                                  {
                                      std::map<std::string, HLSVideo> chunkLists;
                                      for (auto &&tag : taggingData)
                                      {
                                          std::string stream = tag["original-stream-name"].asString();
                                          std::string timestampStr = tag["timestamp"].asString();
                                          Timestamp timestamp{timestampStr};

                                          if (chunkLists.find(stream) == chunkLists.end())
                                          {
                                              const std::string llhlsPath = dumps + "/" + stream + "/" + "llhls.m3u8";
                                              std::ifstream llhlsFile(llhlsPath);
                                              std::string llhlsContent((std::istreambuf_iterator<char>(llhlsFile)), std::istreambuf_iterator<char>());

                                              M3U8 llhls;
                                              llhls.parse(llhlsContent);
                                              const std::string chunklistPath = dumps + "/" + stream + "/" + llhls.getVideoList().front().uri;
                                              HLSVideo chunklist;
                                              std::ifstream chunklistFile(chunklistPath);
                                              std::string chunklistContent((std::istreambuf_iterator<char>(chunklistFile)), std::istreambuf_iterator<char>());
                                              chunklist.parse(chunklistContent);
                                              chunkLists[stream] = chunklist;

                                              if (!customPlaylist.doneInit())
                                              {
                                                  customPlaylist.init(stream + "/" + chunkLists[stream].getMapUri(),
                                                                      chunkLists[stream].getMediaSequence(),
                                                                      chunkLists[stream].getTargetDuration());
                                              }
                                          }

                                          for (auto &&seg : chunkLists[stream].getSegments())
                                          {
                                              if (seg.belongs(timestamp))
                                              {
                                                  customPlaylist.addSegment(seg.getProgDateTime(),
                                                                            seg.getDuration(),
                                                                            stream + "/" + seg.getSegUri());
                                              }
                                          }
                                      }
                                  }
                                  else
                                  {
                                  }

                                  const std::string m3u8Content = customPlaylist.serialize();
                                  const std::string playlistName = fnv1a_hash(m3u8Content) + ".m3u8";
                                  const std::string playlistFilePath = dumps + "/" + playlistName;

                                  std::ofstream outFile(playlistFilePath);
                                  outFile << m3u8Content;
                                  outFile.close();

                                  auto strResponse = Gateway::instance().formatResponse({{playlistFilePath}});
                                  rsp.setData(strResponse);
                              });
}

QEAL::~QEAL()
{
}
