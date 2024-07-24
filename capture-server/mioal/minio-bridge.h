#ifndef MINIO_BRIDGE_H
#define MINIO_BRIDGE_H
#include <iostream>
#include <vector>

class MinioBridge
{
private:
    std::vector<std::string> list_files(const std::string &directory);
    void save(const std::string &file, const std::string &name, const std::string &bucket);
    std::string m_basePath;
    std::string m_path;
    std::string m_err;

public:
    MinioBridge(const std::string &basePath);
    void upload(const std::string &event_id);
    const std::string &path() const
    {
        return this->m_path;
    }

    const std::string &err() const
    {
        return this->m_err;
    }

    ~MinioBridge();
};

#endif // MINIO_BRIDGE_H
