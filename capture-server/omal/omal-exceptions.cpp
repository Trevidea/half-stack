
#include "omal-exceptions.h"

ExUnautorizedException::ExUnautorizedException(const std::string &user, const std::string &event)
{
    snprintf(this->msg, 128, "The user %s is not authrized to perform this action for the event %s.", user.c_str(), event.c_str());
}
ExUnautorizedException::~ExUnautorizedException()
{
}
ExVHostCreationException::ExVHostCreationException(const std::string &name)
{
    snprintf(this->msg, 128, "Unable to create the virtual-host %s.", name.c_str());
}
ExVHostCreationException::~ExVHostCreationException()
{
}

ExOMResourceAccessException::ExOMResourceAccessException(const std::string &resource)
{
    snprintf(this->msg, 128, "Unable to access Oven Media resource: %s.", resource.c_str());
}
ExOMResourceAccessException::~ExOMResourceAccessException()
{
}
