#include "timestamp.h"

Timestamp::Timestamp(const std::string &timestampStr)
{
    std::regex timestampRegex(R"((\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})([+-])(\d{2}):(\d{2}))");
    std::smatch match;

    if (std::regex_match(timestampStr, match, timestampRegex))
    {
        year = std::stoi(match[1]);
        month = std::stoi(match[2]);
        day = std::stoi(match[3]);
        hour = std::stoi(match[4]);
        minute = std::stoi(match[5]);
        second = std::stoi(match[6]);
        millisecond = std::stoi(match[7]);

        int timezoneSign = (match[8] == "+") ? 1 : -1;
        int timezoneHours = std::stoi(match[9]);
        int timezoneMinutes = std::stoi(match[10]);
        timezoneOffset = timezoneSign * (timezoneHours * 60 + timezoneMinutes);

        epochMillis = toEpochMillis();
    }
    else
    {
        throw std::invalid_argument("Invalid timestamp format");
    }
}
Timestamp::Timestamp(long long epochMillis)
{
    setFromEpochMillis(epochMillis);
}

void Timestamp::setFromEpochMillis(long long epochMillis)
{
    this->epochMillis = epochMillis;

    time_t timeSinceEpoch = epochMillis / 1000;
    int remainingMillis = epochMillis % 1000;

    std::tm *tm = std::gmtime(&timeSinceEpoch);

    year = tm->tm_year + 1900;
    month = tm->tm_mon + 1;
    day = tm->tm_mday;
    hour = tm->tm_hour;
    minute = tm->tm_min;
    second = tm->tm_sec;
    millisecond = remainingMillis;
    timezoneOffset = 0; // assuming UTC
}
int Timestamp::getYear() const { return year; }
int Timestamp::getMonth() const { return month; }
int Timestamp::getDay() const { return day; }
int Timestamp::getHour() const { return hour; }
int Timestamp::getMinute() const { return minute; }
int Timestamp::getSecond() const { return second; }
int Timestamp::getMillisecond() const { return millisecond; }
int Timestamp::getTimezoneOffset() const { return timezoneOffset; }
long long Timestamp::getEpochMillis() const { return epochMillis; }

void Timestamp::print() const
{
    std::cout << "Timestamp: " << toString() << std::endl;
}

std::string Timestamp::toString() const
{
    std::ostringstream oss;
    oss << std::setw(4) << std::setfill('0') << year << "-"
        << std::setw(2) << std::setfill('0') << month << "-"
        << std::setw(2) << std::setfill('0') << day << "T"
        << std::setw(2) << std::setfill('0') << hour << ":"
        << std::setw(2) << std::setfill('0') << minute << ":"
        << std::setw(2) << std::setfill('0') << second << "."
        << std::setw(3) << std::setfill('0') << millisecond
        << (timezoneOffset >= 0 ? "+" : "-")
        << std::setw(2) << std::setfill('0') << std::abs(timezoneOffset / 60) << ":"
        << std::setw(2) << std::setfill('0') << std::abs(timezoneOffset % 60);
    return oss.str();
}

long long Timestamp::toEpochMillis() const
{
    std::tm tm = {};
    tm.tm_year = year - 1900;
    tm.tm_mon = month - 1;
    tm.tm_mday = day;
    tm.tm_hour = hour;
    tm.tm_min = minute;
    tm.tm_sec = second;
    tm.tm_isdst = -1; // Not considering daylight saving time

    time_t timeSinceEpoch = std::mktime(&tm);

    timeSinceEpoch -= timezoneOffset * 60;

    return static_cast<long long>(timeSinceEpoch) * 1000 + millisecond;
}
Timestamp Timestamp::operator+(double millis) const
{
    auto totalMillis = this->epochMillis + millis;
    return Timestamp(totalMillis);
}