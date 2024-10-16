#ifndef DATASET_H
#define DATASET_H

#include <string>
#include <json/json.h>

class DataSet {
public:
    DataSet(const Json::Value& jsonData);

    int count() const;

    class Iterator {
    public:
        Iterator(const Json::Value& resultData);

        bool hasNext() const;


        class Entry {
            public:
                Entry(const Json::Value& entr);
                Json::Value getValue(const std::string& fieldName) ;
                inline bool empty() const { return entry.isNull(); }
            private:
                const Json::Value entry;
            
        };
        Entry next() ;
    private:
        const Json::Value result;
        size_t index = 0;
    };

    Iterator iterator() const;

private:
    const Json::Value json;
};

#endif // DATASET_H
