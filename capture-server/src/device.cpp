// device.cpp
#include "device.h"
#include "gateway.h"

Device::Device() : EntityBase("devices") {}

void Device::report() {
    EntityBase::report();
    Gateway::instance().route("GET", "/api/devices", // To request LIST
                              [this](const Request &req, Response &rsp) {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/device", // To request SINGLE
                              [this](const Request &req, Response &rsp) {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("POST", "/api/device", // To request INSERT
                              [this](const Request &req, Response &rsp) {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/device", // To request UPDATE
                              [this](const Request &req, Response &rsp) {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/device", // To request DELETE
                              [this](const Request &req, Response &rsp) {
                                  this->remove(req, rsp);
                              });
}

Device::~Device() {}

