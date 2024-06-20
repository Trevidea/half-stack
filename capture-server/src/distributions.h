#ifndef DISTRIBUTIONS_H
#define DISTRIBUTIONS_H

#include "entity-base.h"
#include "request.h"
#include "response.h"
#include "json/json.h"

class DistributionList : public EntityBase
{
public:
    DistributionList();
    void report() override;

};

#endif // DISTRIBUTIONS_H
