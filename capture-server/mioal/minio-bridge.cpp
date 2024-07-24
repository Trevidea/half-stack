#include "minio-bridge.h"
#include <fmt/core.h>
#include <miniocpp/client.h>
#include <fstream>
#include <filesystem>
#include <sstream>

namespace fs = std::filesystem;

std::vector<std::string> MinioBridge::list_files(const std::string &directory)
{
    std::vector<std::string> files;
    for (const auto &entry : fs::directory_iterator(directory))
    {
        if (entry.is_regular_file() && entry.path().extension() == ".json")
        {
            files.push_back(entry.path().string());
        }
    }
    return files;
}
void MinioBridge::save(const std::string &file, const std::string &name, const std::string &bucket)
{
    fmt::print("Using drake server to test minio!\n");

    minio::s3::BaseUrl base_url("192.168.1.50:9001");
    base_url.https = false;
    minio::creds::StaticProvider provider(
        "NJJYo9iHu301tp3vzESm", "pM1KWq8q3RfNTefz2Swia2aMy6x6mKylKdv4bAQs");
    minio::s3::Client client(base_url, &provider);
    client.Debug(true);
    std::string bucket_name = bucket;
    bool exist;
    {
        minio::s3::BucketExistsArgs args;
        args.bucket = bucket_name;

        minio::s3::BucketExistsResponse resp = client.BucketExists(args);
        if (!resp)
        {
            std::cout << "unable to do bucket existence check; " << resp.Error()
                      << std::endl;
        }

        exist = resp.exist;
    }
    if (!exist)
    {
        minio::s3::MakeBucketArgs args;
        args.bucket = bucket_name;

        minio::s3::MakeBucketResponse resp = client.MakeBucket(args);
        if (!resp)
        {
            std::cout << "unable to create bucket; " << resp.Error() << std::endl;
        }
    }

    minio::s3::UploadObjectArgs args;
    args.bucket = bucket_name;
    args.object = name;
    args.filename = file;
    minio::s3::UploadObjectResponse resp = client.UploadObject(args);
    if (!resp)
    {
        std::cout << "unable to upload object; " << resp.Error() << std::endl;
    }

    std::cout << file << " is successfully uploaded as "
              << "object '"
              << name
              << "' to bucket 'asiatrip'."
              << std::endl;
}
void MinioBridge::upload(const std::string &event_id)
{
    const std::string bucket = fmt::format("event-{}", event_id);
    fs::path dir_path = fs::path(this->m_basePath) / event_id;
    std::vector<std::string> json_files = list_files(dir_path);
    for (auto &&file : json_files)
    {
        fs::path filePath = file;
        this->save(filePath, filePath.filename(), bucket);
    }
    this->m_path = fmt::format("http://192.168.1.50:9002/{}", bucket);
}
MinioBridge::MinioBridge(const std::string &basePath) : m_basePath(basePath)
{
}

MinioBridge::~MinioBridge()
{
}