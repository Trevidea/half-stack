#ifndef MINIO_SERVICE_H
#define MINIO_SERVICE_H

#include <minio.hpp>
#include <string>
#include <vector>

class MinioService {
public:
    MinioService(const std::string &endpoint, const std::string &accessKey, const std::string &secretKey);
    bool uploadFile(const std::string &bucketName, const std::string &objectName, const std::string &filePath);
    std::vector<std::string> browseFiles(const std::string &bucketName);

private:
    minio::s3::Client *client;
};

#endif // MINIO_SERVICE_H
