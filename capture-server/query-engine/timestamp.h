#ifndef TIMESTAMP_H
#define TIMESTAMP_H

#include <string>
#include <stdexcept>
#include <iomanip>
#include <regex>
#include <sstream>
#include <ctime>
#include <cmath>
#include <iostream>

class Timestamp
{
public:
    Timestamp(const std::string &timestampStr);
    Timestamp(long long epochMillis);

    int getYear() const;
    int getMonth() const;
    int getDay() const;
    int getHour() const;
    int getMinute() const;
    int getSecond() const;
    int getMillisecond() const;
    int getTimezoneOffset() const;
    long long getEpochMillis() const;

    void print() const;

    std::string toString() const;
    Timestamp operator+(double millis) const;
private:
    int year;
    int month;
    int day;
    int hour;
    int minute;
    int second;
    int millisecond;
    int timezoneOffset; // in minutes
    long long epochMillis;

    long long toEpochMillis() const;
    void setFromEpochMillis(long long epochMillis);
};

#endif // TIMESTAMP_H
