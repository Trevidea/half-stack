#ifndef FILESYSUTILS_H
#define FILESYSUTILS_H
#include <vector>
#include <string>

bool createDir(const std::string &dir);

int getFiles(const std::string &rootDir, const std::string &filter, std::vector<std::string> &files);

#endif // FILESYSUTILS_H