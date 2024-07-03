#ifndef TAG_JSON_H
#define TAG_JSON_H

#include "duckdb.hpp"
#include <vector>

class TagJson
{
private:
    std::vector<std::string> list_files(const std::string& directory);
    std::string read_file(const std::string& file_path);

    void save(duckdb::Connection &conn, const std::string &json_str, const std::string &base_path);
    std::string m_basePath;
    std::string m_path;
    std::string m_err;

public:
    TagJson(const std::string &basePath);

    void mark(const std::string &tag);
    const std::string &path() const
    {
        return this->m_path;
    }

    const std::string &err() const
    {
        return this->m_err;
    }
    std::string fetchTagsForEvent(const std::string& event_id_directory);
    ~TagJson();
};

#endif // TAG_JSON_H