#include "log-handler.h"
#include "gateway.h"
#include "spdlog/spdlog.h"
#include <fstream>
#include <iostream>
#include <string>

LogHandler::LogHandler() : EntityBase("loghandler") { }

void LogHandler::report() {
    EntityBase::report();

    Gateway::instance().route("POST", "/api/event-log", 
                              [this](const Request &req, Response &rsp) {
                                  this->saveLog(req, rsp);
                              });
}

void LogHandler::saveLog(const Request &req, Response &rsp) {
    spdlog::trace("Received log data: {}", req.data());

    try {
        Json::Value logData;
        Json::Reader reader;
        if (!reader.parse(req.data(), logData)) {
            rsp.setData("Invalid JSON");
            rsp.setStatus(400); // Bad Request
            spdlog::error("Failed to parse JSON: {}", req.data());
            return;
        }

        std::string eventId = logData["event_id"].asString();
        std::string timestamp = logData["timestamp"].asString();
        std::string logLevel = logData["log_level"].asString();
        std::string message = logData["message"].asString();
        std::string context = logData["context"].toStyledString();

        // Save the log data to a file (or database)
        std::string logFilePath = "/Users/shreyapathak20/git/event_log.txt"; // Update this path as needed
        std::ofstream logFile(logFilePath, std::ios_base::app);
        if (logFile.is_open()) {
            logFile << "[" << timestamp << "] "
                    << "[" << eventId << "] "
                    << "[" << logLevel << "] "
                    << message << " "
                    << context << "\n";
            logFile.close();
            rsp.setData("Log saved successfully");
            rsp.setStatus(200); // OK
            spdlog::trace("Log saved successfully: {}", req.data());
        } else {
            rsp.setData("Failed to open log file");
            rsp.setStatus(500); // Internal Server Error
            spdlog::error("Failed to open log file for writing");
        }
    } catch (const std::exception &e) {
        spdlog::error("Failed to save log: {}", e.what());
        rsp.setData("Internal Server Error");
        rsp.setStatus(500); // Internal Server Error
    }
}
