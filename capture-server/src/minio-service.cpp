#include "minio-service.h"
#include <iostream>

int main() {
    // Replace these with your actual MinIO server details
    std::string endpoint = "http://192.168.1.50:9002";
    std::string accessKey = "minioadmin";
    std::string secretKey = "minioadmin";

    MinioService minioService(endpoint, accessKey, secretKey);

    // Test uploading a file
    std::string bucketName = "test-bucket";
    std::string objectName = "test-file.txt";
    std::string filePath = "/path/to/your/test-file.txt";

    if (minioService.uploadFile(bucketName, objectName, filePath)) {
        std::cout << "File uploaded successfully!" << std::endl;
    } else {
        std::cerr << "File upload failed!" << std::endl;
    }

    // Test browsing files in a bucket
    std::vector<std::string> files = minioService.browseFiles(bucketName);
    if (!files.empty()) {
        std::cout << "Files in bucket '" << bucketName << "':" << std::endl;
        for (const auto &file : files) {
            std::cout << " - " << file << std::endl;
        }
    } else {
        std::cerr << "No files found or failed to list files!" << std::endl;
    }

    return 0;
}
