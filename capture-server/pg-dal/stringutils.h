#ifndef STRINGUTILS_H
#define STRINGUTILS_H
#include <iostream>
#include <string>
#include <regex>
#include <algorithm>
#include <cctype>
#include <sstream>

std::string su_trim(const std::string &str);

std::string su_tolower(std::string str);

template <typename Range, typename Value = typename Range::value_type>
std::string su_join(Range const &elements, const char *const delimiter)
{
    std::ostringstream os;
    auto b = begin(elements), e = end(elements);

    if (b != e)
    {
        std::copy(b, prev(e), std::ostream_iterator<Value>(os, delimiter));
        b = prev(e);
    }
    if (b != e)
    {
        os << *b;
    }

    return os.str();
}
template <typename Input, typename Output, typename Value = typename Output::value_type>
void su_split(char delimiter, Output &output, Input const &input)
{
    using namespace std;
    for (auto cur = begin(input), beg = cur;; ++cur)
    {
        if (cur == end(input) || *cur == delimiter || !*cur)
        {
            output.insert(output.end(), Value(beg, cur));
            if (cur == end(input) || !*cur)
                break;
            else
                beg = next(cur);
        }
    }
}

template <typename T>
std::string su_roundOff(const T& var, const char* in_format)
{
    char str[40] = {'\0'};
    sprintf(str, in_format, var);
    return str; 
}
 
#endif // STRINGUTILS_H