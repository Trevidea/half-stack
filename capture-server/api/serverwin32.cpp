#include <cpprest/http_listener.h>
#include "gateway.h"
#pragma comment(lib, "cpprest143_2_10d")
using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

#include <iostream>
#include <map>
#include <set>
#include <string>
#include "spdlog/spdlog.h"
#include <locale>
#include <codecvt>

using namespace std;

#define TRACE(msg) cout << msg
#define TRACE_ACTION(a, k, v) cout << a << " (" << k << ", " << v << ")\n"

map<utility::string_t, utility::string_t> dictionary;

void display_json(
    json::value const &jvalue,
    utility::string_t const &prefix)
{
   wcout << prefix << jvalue.serialize() << endl;
}
std::wstring s2ws(const std::string &str)
{
   using convert_typeX = std::codecvt_utf8<wchar_t>;
   std::wstring_convert<convert_typeX, wchar_t> converterX;

   return converterX.from_bytes(str);
}

std::string ws2s(const std::wstring &wstr)
{
   using convert_typeX = std::codecvt_utf8<wchar_t>;
   std::wstring_convert<convert_typeX, wchar_t> converterX;

   return converterX.to_bytes(wstr);
}

void handle_get(http_request request)
{

   TRACE("\nhandle GET\n");

   auto answer = json::value::object();

   auto uri = request.absolute_uri();
   
   answer[L"Absolute URI"] = json::value::string(uri::decode(uri.to_string()));
   auto reponse = Gateway::instance().request("GET", ws2s(uri.path()), ws2s(uri::decode(uri.query())), "");

   auto val = json::value::parse(reponse.data());

   answer[L"Gateway Response"] = val;
   http_response response(status_codes::OK);
   response.headers().add(U("Access-Control-Allow-Origin"), U("*")); 
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
            spdlog::trace("Incoming data..{}", ws2s(jvalue.serialize()));
            display_json(jvalue, L"R: ");
            
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

   display_json(answer, L"S: ");
   http_response response(status_codes::OK);

   response.headers().add(L"Access-Control-Allow-Origin", "*");
   response.headers().add(U("Access-Control-Allow-Methods"), "GET,POST,OPTIONS,DELETE,PUT");
   response.headers().add(U("Access-Control-Allow-Headers"), "Content-Type, x-requested-with");
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
          answer[L"Absolute URI"] = json::value::string(uri.to_string());

          auto result = Gateway::instance().request("POST", ws2s(uri.path()), ws2s(uri.query()), ws2s(jvalue.serialize()));
          auto val = json::value::parse(result.data());

          answer[L"Gateway Response"] = val;
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
          answer[L"Absolute URI"] = json::value::string(uri.to_string());

          auto result = Gateway::instance().request("PUT", ws2s(uri.path()), ws2s(uri.query()), ws2s(jvalue.serialize()));
          auto val = json::value::parse(result.data());

          answer[L"Gateway Response"] = val;
       });
}
void handle_opt(http_request request)
{
   TRACE("\nhandle OPTIONS\n");

   http_response response(status_codes::OK);

   response.headers().add(L"Access-Control-Allow-Origin", "*");
   response.headers().add(U("Access-Control-Allow-Methods"), "GET,POST,OPTIONS,DELETE,PUT");
   response.headers().add(U("Access-Control-Allow-Headers"), "Content-Type, x-requested-with");
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
          answer[L"Absolute URI"] = json::value::string(uri.to_string());

          auto result = Gateway::instance().request("DELETE", ws2s(uri.path()), ws2s(uri.query()), ws2s(jvalue.serialize()));
          auto val = json::value::parse(result.data());

          answer[L"Gateway Response"] = val;
       });
}

int main()
{
   spdlog::trace("Welcome to spdlog version {}.{}.{}  !", SPDLOG_VER_MAJOR, SPDLOG_VER_MINOR, SPDLOG_VER_PATCH);

   Gateway::instance().init();
   try
   {

      web::uri uri{L"http://127.0.0.1:8283"};

      spdlog::trace("URI created for the url");

      http_listener listener(uri);

      listener.support(methods::GET, handle_get);
      listener.support(methods::POST, handle_post);
      listener.support(methods::PUT, handle_put);
      listener.support(methods::DEL, handle_del);
      listener.support(methods::OPTIONS, handle_opt);

      spdlog::trace("Created listener at 0.0.0.0:8283");

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