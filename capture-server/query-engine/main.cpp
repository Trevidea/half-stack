#include "duckdb.hpp"
#include <iostream>
#include <filesystem>
#include <vector>
#include "m3u8.h"
#include <fstream>
#include "hls-video.h"

namespace fs = std::filesystem;
void query_json_files(const std::vector<std::string>& json_files) {
    duckdb::DuckDB db(nullptr);
    duckdb::Connection con(db);

    for (const auto& file : json_files) {
        // Drop the temporary table if it exists
        auto result = con.Query("DROP TABLE IF EXISTS temp_table;");
        if (result->HasError()) {
            std::cerr << "Error dropping temp table: " << result->GetError() << std::endl;
            continue;
        }

        // Create the temporary table
        std::string create_table_query = "CREATE TEMP TABLE temp_table AS SELECT * FROM read_json_auto('" + file + "');";
        result = con.Query(create_table_query);

        if (result->HasError()) {
            std::cerr << "Error creating temp table for file " << file << ": " << result->GetError() << std::endl;
            continue;
        }

        // Query to find baller 'Jadeja'
        std::string query = R"(
        SELECT *
        FROM temp_table, 
             UNNEST(json_extract(temp_table.data, '$[*]')) AS element,
             UNNEST(json_extract(element, '$.data[*]')) AS subelement
        WHERE json_extract(subelement, '$.tag')::VARCHAR = 'baller' 
          AND json_extract(subelement, '$.value')::VARCHAR = 'Jadeja';
        )";

        result = con.Query(query);

        if (result->HasError()) {
            std::cerr << "Error querying JSON data in file " << file << ": " << result->GetError() << std::endl;
            continue;
        }

        if (result->RowCount() > 0) {
            std::cout << "File " << file << " contains baller 'Jadeja'." << std::endl;
        } else {
            std::cout << "File " << file << " does not contain baller 'Jadeja'." << std::endl;
        }
    }
}
int main1() {
    std::vector<std::string> json_files;
    std::string directory = "/Users/manishverma/git/duckdb_query_tool/10";

    for (const auto& entry : fs::directory_iterator(directory)) {
        if (entry.path().extension() == ".json") {
            json_files.push_back(entry.path().string());
        }
    }

    query_json_files(json_files);

    return 0;
}

int main2()
{
    std::ifstream file("sample.m3u8");
    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());

    M3U8 m3u8File;
    m3u8File.parse(content);

    // Output parsed data
    std::cout << "Version: " << m3u8File.getVersion() << std::endl;
    std::cout << "Independent Segments: " << m3u8File.getIndependentSegments() << std::endl;
    for (const auto& media : m3u8File.getAudioList()) {
        std::cout << "Media: " << media.type << ", " << media.groupId << ", " << media.name << ", " 
                  << (media.isDefault ? "YES" : "NO") << ", " << (media.autoSelect ? "YES" : "NO") 
                  << ", " << media.channels << ", " << media.uri << std::endl;
    }
    for (const auto& stream : m3u8File.getVideoList()) {
        std::cout << "Stream: " << stream.bandwidth << ", " << stream.resolution << ", " << stream.frameRate 
                  << ", " << stream.codecs << ", " << stream.audio << ", " << stream.uri << std::endl;
    }

    return 0;
}
int main(){
    std::ifstream file("chunklist_video.m3u8");
    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());

    HLSVideo hlsVideo;
    hlsVideo.parse(content);

    // Output parsed data
    std::cout << "Version: " << hlsVideo.getVersion() << std::endl;
    std::cout << "Target Duration: " << hlsVideo.getTargetDuration() << std::endl;
    std::cout << "Media Sequence: " << hlsVideo.getMediaSequence() << std::endl;
    std::cout << "Map URI: " << hlsVideo.getMapUri() << std::endl;

    for (const auto& segment : hlsVideo.getSegments()) {
        std::cout << "Segment: " << segment.getProgDateTime().toString() << ", " << segment.getDuration() << ", " << segment.getSegUri() << std::endl;
    }

    Timestamp ts("2023-11-02T08:02:07.539+00:00");
    std::cout << hlsVideo.getSegments().front().belongs(ts) << std::endl;
    std::string m3u8Content = hlsVideo.serialize();

    // Write to file
    std::ofstream outFile("output.m3u8");
    outFile << m3u8Content;
    outFile.close();

    return 0;
}