#include "metatype.h"
#include "gateway.h"

MetaType::MetaType(): EntityBase("meta_type")
{
}

void MetaType::report()
{
    EntityBase::report();
    Gateway::instance().route("GET", "/api/meta-types", // To request LIST
                              [this](const Request &req, Response &rsp)
                              {
                                  this->list(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/meta-type", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->find(req, rsp);
                              });
    Gateway::instance().route("GET", "/api/meta-type-list", // To request SINGLE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->view(req, rsp, "Meta_Type_list");
                              });
    Gateway::instance().route("POST", "/api/meta-type", // To request INSERT
                              [this](const Request &req, Response &rsp)
                              {
                                  this->create(req, rsp);
                              });
    Gateway::instance().route("PUT", "/api/meta-type", // To request UPDATE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->update(req, rsp);
                              });
    Gateway::instance().route("DELETE", "/api/meta-type", // To request DELETE
                              [this](const Request &req, Response &rsp)
                              {
                                  this->remove(req, rsp);
                              });
}

MetaType::~MetaType()
{
}