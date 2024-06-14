#ifndef DISTRIBUTION_LIST_H
#define DISTRIBUTION_LIST_H

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

#endif // DISTRIBUTION_LIST_H
