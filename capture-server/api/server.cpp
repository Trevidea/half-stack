#include <cpprest/http_listener.h>
#include "gateway.h"
#include "on-demand-event.h"
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

void configure_response_headers(web::http::http_response &response)
{
   response.headers().add(U("Access-Control-Allow-Origin"), U("*"));
   response.headers().add(U("Access-Control-Allow-Methods"), U("GET,POST,OPTIONS,DELETE,PUT"));
   response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type, x-requested-with, Authorization"));
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

            // if (!jvalue.is_null())//Don't check for POSTED data
            {
               action(jvalue, answer);
            }
         }
         catch (http_exception const & e)
         {
            cout << e.what() << endl;
         } })
       .wait();

   http_response response(status_codes::OK);

   configure_response_headers(response);

   response.set_body(answer);
   request.reply(response);
}

void handle(web::json::value &answer, const std::string &method, const web::uri &uri, const std::string &data = "")
{
   auto jsObject = json::value::object();
   auto result = Gateway::instance().request(method, uri.path(), uri::decode(uri.query()), data);
   auto val = json::value::parse(result.data());
   answer = std::move(val);
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

   configure_response_headers(response);

   request.reply(response);
}

void handle_get(http_request request)
{
   TRACE("\nhandle GET\n");
   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          handle(answer, "GET", request.absolute_uri());
       });
}

void handle_post(http_request request)
{
   TRACE("\nhandle POST\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          handle(answer, "POST", request.absolute_uri(), jvalue.serialize());
       });
}

void handle_put(http_request request)
{
   TRACE("\nhandle PUT\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          handle(answer, "PUT", request.absolute_uri(), jvalue.serialize());
       });
}
void handle_del(http_request request)
{
   TRACE("\nhandle DEL\n");

   handle_request(
       request,
       [&request](json::value const &jvalue, json::value &answer)
       {
          handle(answer, "DELETE", request.absolute_uri(), jvalue.serialize());
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
