#ifndef DATETIMEUTILS_H
#define DATETIMEUTILS_H
#include <ctime>
#include <string>
#include <vector>
#include <cmath>

inline std::string getFormattedDate(time_t rawtime)
{
    struct tm *timeinfo;
    char buffer[80];

    timeinfo = localtime(&rawtime);

    strftime(buffer, 80, "%Y-%b-%d", timeinfo);
    return buffer;
}
inline std::string getSqlDate(time_t rawtime)
{
    struct tm *timeinfo;
    char buffer[80];

    timeinfo = localtime(&rawtime);

    strftime(buffer, 80, "%Y-%m-%d", timeinfo);
    return buffer;
}
inline int getWeekDay(time_t fromRawTime)
{
    struct tm *t = localtime(&fromRawTime);
    return t->tm_wday;
}
inline std::string monthAdd(const std::string &dt, int add)
{
    int month = std::stoi(dt.substr(0, 2));
    month -= 1;
    int year = std::stoi(dt.substr(2, 4));
    year -= 1900;
    struct tm t1
    {
        0, 0, 0, 1, month, year, 0, 0, -1
    };

    t1.tm_mon += add;
    time_t rawtime = mktime(&t1);

    struct tm *timeinfo;
    timeinfo = localtime(&rawtime);
    char buffer[16] = {0};
    snprintf(buffer, 16, "%.2d%d", timeinfo->tm_mon + 1, timeinfo->tm_year + 1900);
    return buffer;
}
inline std::vector<time_t> getDatesForMonth(const std::string &dt, time_t after = 0)
{
    int month = std::stoi(dt.substr(0, 2));
    month -= 1;
    int year = std::stoi(dt.substr(2, 4));
    year -= 1900;
    struct tm t1
    {
        0, 0, 0, 1, month, year, 0, 0, -1
    };
    time_t time = mktime(&t1);
    std::vector<time_t> dates;
    if (after == 0)
    {
        do
        {
            dates.push_back(time);
            t1.tm_mday += 1;
            time = mktime(&t1);
        } while (t1.tm_mon == month);
    }
    else
    {
        do
        {
            if (time >= after)
                dates.push_back(time);
            t1.tm_mday += 1;
            time = mktime(&t1);
        } while (t1.tm_mon == month);
    }
    return dates;
}

inline std::string getFormattedTime(time_t rawtime)
{
    if (rawtime <= 0)
        return "0";
    else
    {
        struct tm *timeinfo;
        char buffer[80];
        timeinfo = localtime(&rawtime);

        strftime(buffer, 80, "%H%M", timeinfo);
        return buffer;
    }
}

inline std::string getFormattedCurrentPayMonth()
{
    time_t rawtime = std::time(0);
    struct tm *timeinfo;
    timeinfo = localtime(&rawtime);
    char buffer[16] = {0};
    snprintf(buffer, 16, "%.2d%d", timeinfo->tm_mon + 1, timeinfo->tm_year + 1900);
    return buffer;
}

inline std::string getFormattedDate(const std::string &dt)
{
    int date = std::stoi(dt.substr(0, 2));
    int month = std::stoi(dt.substr(2, 2));
    int year = std::stoi(dt.substr(4, 4));
    char buffer[16] = {0};
    snprintf(buffer, 16, "%02d-%02d-%04d", date, month + 1, year + 1900);
    return buffer;
}

inline tm getTmFromFile(const std::string &dt)
{
    int date = std::stoi(dt.substr(0, 2));
    int month = std::stoi(dt.substr(2, 2));
    int year = std::stoi(dt.substr(4, 4));
    return tm{0, 0, 0, date, month - 1, year - 1900, 0, 0, -1};
}
inline tm getTmFromSql(const std::string &dt)
{
    int year = std::stoi(dt.substr(0, 4));
    int month = std::stoi(dt.substr(5, 2));
    int date = std::stoi(dt.substr(8, 2));
    return tm{0, 0, 0, date, month - 1, year - 1900, 0, 0, -1};
}

inline int getNumberFromFileTime(const std::string &tm)
{
    int iTm = 0;
    try
    {
        iTm = std::stoi(tm.substr(0, 4));
    }
    catch (const std::exception)
    {
    }
    return iTm;
}

inline time_t getTimeFromFile(const std::string &dt)
{
    tm t1 = getTmFromFile(dt);
    return mktime(&t1);
}
inline time_t getTimeFromSql(const std::string &dt)
{
    tm t1 = getTmFromSql(dt);
    return mktime(&t1);
}

inline tm getTmFromFilter(const std::string &dt)
{
    int month = std::stoi(dt.substr(0, 2));
    int year = std::stoi(dt.substr(2, 4));
    return tm{0, 0, 0, 0, month, year, 0, 0, -1};
}

inline std::string getDateStringToday()
{
    time_t rawtime;
    struct tm *timeinfo;
    char buffer[80];

    time(&rawtime);
    timeinfo = localtime(&rawtime);

    strftime(buffer, sizeof(buffer), "%d-%m-%Y", timeinfo);
    //   strftime(buffer,sizeof(buffer),"%d-%m-%Y %H:%M:%S",timeinfo);
    std::string str(buffer);
    return str;
}

#endif // DATETIMEUTILS_H