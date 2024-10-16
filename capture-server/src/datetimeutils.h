#ifndef DATETIMEUTILS_H
#define DATETIMEUTILS_H
#include <ctime>
#include <string>
#include <vector>
#include <cmath>
#include <chrono>

struct dtu_date
{
    int year, month, date;
};
struct dtu_time
{
    int hours, minutes, seconds;
};
struct dtu_span
{
    dtu_date dt;
    dtu_time tm;
    int duration;
};
/// @brief formats the given rawtime into a string representing the date
/// @param rawtime 
/// @return string representing the formatted date in the format 'YYY-Mmm-DD'
inline std::string getFormattedDate(time_t rawtime)
{
    struct tm *timeinfo;
    char buffer[80];

    timeinfo = localtime(&rawtime);

    strftime(buffer, 80, "%Y-%b-%d", timeinfo);
    return buffer;
}

/// @brief generates sql format date from rawtime
/// @param rawtime 
/// @return string representing the date in sql format (YYYY-MM-DD)
inline std::string getSqlDate(time_t rawtime)
{
    struct tm *timeinfo;
    char buffer[80];

    timeinfo = localtime(&rawtime);

    strftime(buffer, 80, "%Y-%m-%d", timeinfo);
    return buffer;
}

/// @brief obtains day of the week from the parameter fromRawTime
/// @param fromRawTime 
/// @return integer representing the day of the week 
inline int getWeekDay(time_t fromRawTime)
{
    struct tm *t = localtime(&fromRawTime);
    return t->tm_wday;
}

/// @brief Adds or subtracts months from a date string in 'MMYYYY' format
/// @param dt 
/// @param add 
/// @return string representing the resulting date
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

/// @brief retrieves all the dates for a given month 
/// @param dt 
/// @param after 
/// @return all the dates from the specified month 
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

/// @brief formats the given rawtime in 'HHMM' format
/// @param rawtime 
/// @return string representing the time in "HHMM" format, or "0" if the time is less than or equal to 0
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

/// @brief 
/// @return 
inline std::string getFormattedCurrentPayMonth()
{
    time_t rawtime = std::time(0);
    struct tm *timeinfo;
    timeinfo = localtime(&rawtime);
    char buffer[16] = {0};
    snprintf(buffer, 16, "%.2d%d", timeinfo->tm_mon + 1, timeinfo->tm_year + 1900);
    return buffer;
}

/// @brief 
/// @param dt 
/// @return 
inline std::string getFormattedDate(const std::string &dt)
{
    int date = std::stoi(dt.substr(0, 2));
    int month = std::stoi(dt.substr(2, 2));
    int year = std::stoi(dt.substr(4, 4));
    char buffer[16] = {0};
    snprintf(buffer, 16, "%02d-%02d-%04d", date, month + 1, year + 1900);
    return buffer;
}

/// @brief 
/// @param dt 
/// @return 
inline tm getTmFromFile(const std::string &dt)
{
    int date = std::stoi(dt.substr(0, 2));
    int month = std::stoi(dt.substr(2, 2));
    int year = std::stoi(dt.substr(4, 4));
    return tm{0, 0, 0, date, month - 1, year - 1900, 0, 0, -1};
}

/// @brief 
/// @param dt 
/// @return 
inline tm getTmFromSql(const std::string &dt)
{
    int year = std::stoi(dt.substr(0, 4));
    int month = std::stoi(dt.substr(5, 2));
    int date = std::stoi(dt.substr(8, 2));
    return tm{0, 0, 0, date, month - 1, year - 1900, 0, 0, -1};
}

/// @brief 
/// @param tm 
/// @return 
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

/// @brief 
/// @param dt 
/// @return 
inline time_t getTimeFromFile(const std::string &dt)
{
    tm t1 = getTmFromFile(dt);
    return mktime(&t1);
}

/// @brief 
/// @param dt 
/// @return 
inline time_t getTimeFromSql(const std::string &dt)
{
    tm t1 = getTmFromSql(dt);
    return mktime(&t1);
}

/// @brief 
/// @param date 
/// @return 
inline dtu_date getDTUDateFromSql(const std::string &date)
{
    tm t1 = getTmFromSql(date);
    return {t1.tm_year + 1900, t1.tm_mon + 1, t1.tm_mday};
}

/// @brief 
/// @param tp 
/// @return 
inline std::string getDateStringFromTimePoint(std::chrono::system_clock::time_point &tp)
{
    std::time_t t = std::chrono::system_clock::to_time_t(tp);
    char buf[20] = {'\0'};
    strftime(buf, 20, "%Y-%m-%d %H:%M:%S", localtime(&t));
    return std::string(buf);
}

/// @brief 
/// @param time 
/// @return 
inline dtu_time getDTUTimeFromSql(const int &time)
{
    char arr[5] = {'\0'};
    snprintf(arr, 5, "%04d", time);
    std::string str = arr;
    int hours = std::stoi(str.substr(0, 2));
    int minutes = std::stoi(str.substr(2, 2));
    int seconds = 0;
    return {hours, minutes, seconds};
}

/// @brief 
/// @param dt 
/// @return 
inline tm getTmFromFilter(const std::string &dt)
{
    int month = std::stoi(dt.substr(0, 2));
    int year = std::stoi(dt.substr(2, 4));
    return tm{0, 0, 0, 0, month, year, 0, 0, -1};
}

/// @brief 
/// @return 
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