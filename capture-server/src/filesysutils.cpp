#include "filesysutils.h"
#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <cstring>
#include <stdlib.h>
#include <filesystem>
#include <iostream>
#include "spdlog/spdlog.h"
#ifdef _WIN32
    #include <conio.h>
#else
    #include <dirent.h>
    #include <unistd.h>
#endif

bool createDir(const std::string &dir)
{
// #ifdef _WIN32
//     auto check = _mkdir(dir.c_str());
// #else
//     auto check = mkdir(dir.c_str(), S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
// #endif
//     return check;
    return std::filesystem::create_directory(dir);
}

int getFiles(const std::string &rootDir, const std::string &filter, std::vector<std::string> &files)
{
#ifdef _WIN32
    for (const auto &dirEntry : std::filesystem::directory_iterator(rootDir))
    {
        std::cout << dirEntry << dirEntry.is_regular_file() << dirEntry.is_directory() << std::endl;
        if (dirEntry.is_regular_file())
        {
            std::string fname = dirEntry.path().filename().generic_string();
            if (fname.find(filter.c_str(), 2, 6) != std::string::npos)
            {
                files.push_back(dirEntry.path().generic_string());
            }
        }
    }
#else
    DIR *dir;
    struct dirent *ent;
    if ((dir = opendir(rootDir.c_str())) != NULL)
    {
        /* print all the files and directories within directory */
        while ((ent = readdir(dir)) != NULL)
        {
            auto same = strcmp(ent->d_name, ".") - strcmp(ent->d_name, "..");

            if (!same)
            {
                std::string fname = ent->d_name;
                if (fname.find(filter.c_str(), 2, 6) != std::string::npos)
                {
                    files.push_back(ent->d_name);
                }
            }
        }
        closedir(dir);
    }
    else
    {
        /* could not open directory */
        perror("could not open directory");
        return EXIT_FAILURE;
    }
#endif
    return EXIT_SUCCESS;
}
