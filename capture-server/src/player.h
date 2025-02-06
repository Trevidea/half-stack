#ifndef PLAYER_H
#define PLAYER_H

#include "entity-base.h"
#include <string>

class Player : public EntityBase
{
public:
    Player();
    void report();

    // Video management methods
    void saveVideo(const Request &req, Response &rsp);
    void getVideo(const Request &req, Response &rsp);
    void deleteVideo(const Request &req, Response &rsp);

    ~Player();
};

#endif // PLAYER_H
