#include "minio-bridge.h"
#include <fmt/core.h>
#include <miniocpp/client.h>

MinioBridge::MinioBridge()
{

    fmt::print("Using play.min.io to test minio!\n");

    minio::s3::BaseUrl base_url("play.min.io");
    minio::creds::StaticProvider provider(
        "Q3AM3UQ867SPQQA43P2F", "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG");
    minio::s3::Client client(base_url, &provider);
    std::string bucket_name = "ludhianatrip";
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
    args.object = "asiaphotos-2015.zip";
    args.filename = "/Users/manishverma/Desktop/asiaphotos.zip";
    minio::s3::UploadObjectResponse resp = client.UploadObject(args);
    if (!resp)
    {
        std::cout << "unable to upload object; " << resp.Error() << std::endl;
    }

    std::cout << "'/home/user/Photos/asiaphotos.zip' is successfully uploaded as "
              << "object 'asiaphotos-2015.zip' to bucket 'asiatrip'."
              << std::endl;
}

MinioBridge::~MinioBridge()
{
}