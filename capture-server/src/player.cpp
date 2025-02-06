#include "player.h"
#include "gateway.h"

Player::Player() : EntityBase("players") { }

void Player::report()
{
    EntityBase::report();

    Gateway::instance().route("GET", "/api/players", // To request LIST
        [this](const Request &req, Response &rsp)
        {
            this->list(req, rsp);
        });

    Gateway::instance().route("GET", "/api/player", // To request SINGLE
        [this](const Request &req, Response &rsp)
        {
            this->find(req, rsp);
        });

    Gateway::instance().route("POST", "/api/player", // To request INSERT
        [this](const Request &req, Response &rsp)
        {
            this->create(req, rsp);
        });

    Gateway::instance().route("PUT", "/api/player", // To request UPDATE
        [this](const Request &req, Response &rsp)
        {
            this->update(req, rsp);
        });

    Gateway::instance().route("DELETE", "/api/player", // To request DELETE
        [this](const Request &req, Response &rsp)
        {
            this->remove(req, rsp);
        });

    // Routes for Video Management
    Gateway::instance().route("POST", "/api/player/video", // To save a video
        [this](const Request &req, Response &rsp)
        {
            this->saveVideo(req, rsp);
        });

    Gateway::instance().route("GET", "/api/player/video", // To fetch a video
        [this](const Request &req, Response &rsp)
        {
            this->getVideo(req, rsp);
        });

    Gateway::instance().route("DELETE", "/api/player/video", // To delete a video
        [this](const Request &req, Response &rsp)
        {
            this->deleteVideo(req, rsp);
        });
}

void Player::saveVideo(const Request &req, Response &rsp)
{
    // Extract video information from the request and save it
    // Example: Save video URL or metadata
    std::string videoUrl = req.get_param("url");

    // Add code to save videoUrl in the player's record in the database

    rsp.set_status(201);
    rsp.set_body("Video saved successfully");
}

void Player::getVideo(const Request &req, Response &rsp)
{
    // Extract video id or player id from the request
    std::string videoId = req.get_param("id");

    // Add code to fetch the video details from the database using videoId

    rsp.set_status(200);
    rsp.set_body("Video details");
}

void Player::deleteVideo(const Request &req, Response &rsp)
{
    // Extract video id from the request
    std::string videoId = req.get_param("id");

    // Add code to delete the video from the player's record in the database

    rsp.set_status(200);
    rsp.set_body("Video deleted successfully");
}

Player::~Player() { }
