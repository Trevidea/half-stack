// watcher.cpp

#include "watcher.h"

Watcher::Watcher(const std::string& directory, const Callback& callback)
    : m_directory(directory), m_callback(callback), m_running(false) {}

Watcher::~Watcher() {
    stop();
}

void Watcher::start() {
    m_running = true;
    m_thread = std::thread(&Watcher::watchLoop, this);
}

void Watcher::stop() {
    m_running = false;
    if (m_thread.joinable()) {
        m_thread.join();
    }
}

void Watcher::watchLoop() {
    fs::path pathToWatch(m_directory);
    fs::directory_iterator iter(pathToWatch), end;

    std::map<std::string, fs::file_time_type> currentFiles;
    for (; iter != end; ++iter) {
        currentFiles[iter->path().filename().string()] = fs::last_write_time(iter->path());
    }

    while (m_running) {
        for (auto& [filename, lastWriteTime] : currentFiles) {
            if (!fs::exists(pathToWatch / filename)) {
                // File was removed
                m_callback(filename);
                currentFiles.erase(filename);
            } else if (fs::last_write_time(pathToWatch / filename) != lastWriteTime) {
                // File was modified
                m_callback(filename);
                currentFiles[filename] = fs::last_write_time(pathToWatch / filename);
            }
        }

        for (auto& entry : fs::directory_iterator(pathToWatch)) {
            auto filename = entry.path().filename().string();
            if (currentFiles.find(filename) == currentFiles.end()) {
                // New file detected
                m_callback(filename);
                currentFiles[filename] = fs::last_write_time(entry.path());
            }
        }

        std::this_thread::sleep_for(std::chrono::seconds(1)); // Adjust the interval as needed
    }
}
