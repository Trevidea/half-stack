// watcher.h

#ifndef WATCHER_H
#define WATCHER_H

#include <filesystem>
#include <functional>
#include <map>
#include <thread>

namespace fs = std::filesystem;

class Watcher {
public:
    using Callback = std::function<void(const std::string&)>;

    Watcher(const std::string& directory, const Callback& callback);
    ~Watcher();

    void start();
    void stop();

private:
    void watchLoop();

    std::string m_directory;
    Callback m_callback;
    bool m_running;
    std::thread m_thread;
};

#endif // WATCHER_H
