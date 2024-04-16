#include <cpprest/http_listener.h>
#include "gateway.h"
#include "on-demand-event.h"
#include "network-quality-assessment.h"
#pragma comment(lib, "cpprest143_2_10")
using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

#include <iostream>
#include <map>
#include <set>
#include <string>
#include "spdlog/spdlog.h"

using namespace std;

#define TRACE(msg) cout << msg
#define TRACE_ACTION(a, k, v) cout << a << " (" << k << ", " << v << ")\n"

map<utility::string_t, utility::string_t> dictionary;

void display_json(
    json::value const &jvalue,
    utility::string_t const &prefix)
{
   cout << prefix << jvalue.serialize() << endl;
}

void handle_network_quality_assessment(http_request request)
{
    // Perform network quality assessment here
    std::vector<NetworkQualityAssessmentResult> results = NetworkQualityAssessment::assess();

    // Construct a JSON array to hold the assessment results
    json::value response_json = json::value::array();
    for (const auto& result : results) {
        json::value result_json;
        result_json[U("latency")] = json::value::number(result.latency);
        result_json[U("jitter")] = json::value::number(result.jitter);
        result_json[U("packetLoss")] = json::value::number(result.packetLoss);
        result_json[U("bandwidth")] = json::value::number(result.bandwidth);
        result_json[U("quality")] = json::value::string(utility::conversions::to_string_t(result.quality));
        response_json.as_array()[response_json.as_array().size()] = result_json;
    }

    // Send the JSON array response
    http_response response(status_codes::OK);
    response.headers().add(U("Content-Type"), U("application/json"));
    response.set_body(response_json);
    request.reply(response);
}

void handle_get(http_request request)
{

   TRACE("\nhandle GET\n");

   auto answer = json::value::object();

   auto uri = request.absolute_uri();
   
   answer["Absolute URI"] = json::value::string(uri.to_string());
   auto reponse = Gateway::instance().request("GET", uri.path(), uri::decode(uri.query()), "");
   spdlog::trace("response received {}", reponse.data());
   try
   {
      /* code */
      auto val = json::value::parse(reponse.data());

   answer["Gateway Response"] = val;

   }
   catch(const std::exception& e)
   {
         std::cerr << e.what() << '\n';
   }
   
   

   http_response response(status_codes::OK);
   response.headers().add(U("Access-Control-Allow-Origin"), U("http://localhost:4200"));
   response.headers().add(U("Access-Control-Allow-Methods"), U("GET,POST,OPTIONS,DELETE,PUT"));
   response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type, x-requested-with"));
   spdlog::debug("Setting body in response...");
   response.set_body(answer);
   request.reply(response); // reply is done here
}

void handle_request(
    http_request request,
    function<void(json::value const &, json::value &)> action)
{
   auto answer = json::value::object();

   request
       .extract_json()
       .then([&answer, &action](pplx::task<json::value> task)
             {
         try
         {
            auto const & jvalue = task.get();

            spdlog::trace("Incoming data..{}", jvalue.serialize());
            display_json(jvalue, "R: ");

            if (!jvalue.is_null())
            {
               action(jvalue, answer);
            }
         }
         catch (http_exception const & e)
         {
            cout << e.what() << endl;
         } })
       .wait();

   display_json(answer, "S: ");

   http_response response(status_codes::OK);

   response.headers().add(U("Access-Control-Allow-Origin"), U("http://localhost:4200"));
   response.headers().add(U("Access-Control-Allow-Methods"), U("GET,POST,OPTIONS,DELETE,PUT"));
   response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type, x-requested-with"));
   response.set_body(answer);
   request.reply(response); // reply is done here
}

void handle_post(http_request request)
{
   TRACE("\nhandle POST\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          auto uri = request.absolute_uri();

         answer["Absolute URI"] = json::value::string(uri.to_string());
         auto result = Gateway::instance().request("POST", uri.path(), uri.query(), jvalue.serialize());

          auto val = json::value::parse(result.data());

         answer["Gateway Response"] = val;
       });
}

void handle_put(http_request request)
{
   TRACE("\nhandle PUT\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          auto uri = request.absolute_uri();

          answer["Absolute URI"] = json::value::string(uri.to_string());
          auto result = Gateway::instance().request("PUT", uri.path(), uri.query(), jvalue.serialize());

          auto val = json::value::parse(result.data());

         answer["Gateway Response"] = val;
       });
}
void handle_opt(http_request request)
{
   TRACE("\nhandle OPTIONS\n");
   spdlog::trace("Received options request from..{}", request.absolute_uri().to_string());
   http_response response(status_codes::OK);
   for (auto &&header : request.headers())
   {
      spdlog::trace("header::{}={}", header.first, header.second);
   }
   
   
   response.headers().add(U("Access-Control-Allow-Origin"), U("http://localhost:4200"));
   response.headers().add(U("Access-Control-Allow-Methods"), U("GET,POST,OPTIONS,DELETE,PUT"));
   response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type, x-requested-with, Authorization"));
   request.reply(response); // reply is done here
}
void handle_del(http_request request)
{
   TRACE("\nhandle DEL\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          auto uri = request.absolute_uri();

          answer["Absolute URI"] = json::value::string(uri.to_string());
          auto result = Gateway::instance().request("DELETE", uri.path(), uri.query(), jvalue.serialize());

          auto val = json::value::parse(result.data());

          answer["Gateway Response"] = val;
       });
}

int main()
{
   spdlog::set_level(spdlog::level::trace); // Set global log level to debug
   spdlog::trace("Welcome to spdlog version {}.{}.{}  !", SPDLOG_VER_MAJOR, SPDLOG_VER_MINOR, SPDLOG_VER_PATCH);
   Gateway::instance().init();
   try
   {
      web::uri uri{"http://0.0.0.0:1437"};

      spdlog::trace("URI created for the url");

      http_listener listener(uri);

      listener.support(methods::GET, handle_get);
      listener.support(methods::POST, handle_post);
      listener.support(methods::PUT, handle_put);
      listener.support(methods::DEL, handle_del);
      listener.support(methods::OPTIONS, handle_opt);

      // Bind the network quality assessment route
      listener.support(methods::GET, handle_network_quality_assessment);

      // Initialize an instance of OnDemandEvent
        OnDemandEvent onDemandEvent;
        // Setup routes for handling on-demand event-related requests
        onDemandEvent.report();

      spdlog::trace("Created listener at 0.0.0.0:1437");

      listener
          .open()
          .then([&listener]()
                { TRACE("\nstarting to listen\n"); })
          .wait();

      while (true)
         ;
   }
   catch (exception const &e)
   {
      spdlog::error("Error opening the listener..{}", e.what());
      cout << "ERROR:" << e.what() << endl;
   }

   return 0;
}
