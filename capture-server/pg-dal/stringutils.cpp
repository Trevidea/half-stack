#include "stringutils.h"

std::string su_trim(const std::string &str)
{
    return std::regex_replace(str, std::regex("(^[ ]+)|([ ]+$)"), "");
}

std::string su_tolower(std::string str)
{
    std::transform(str.begin(), str.end(), str.begin(),
                   [](unsigned char c)
                   { return std::tolower(c); });
    return str;
}
