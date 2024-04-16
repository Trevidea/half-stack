#ifndef NETWORK_QUALITY_ASSESSMENT_H
#define NETWORK_QUALITY_ASSESSMENT_H

#include <string>
#include <vector>
#include <cstdlib>

// Define a structure to hold network quality assessment results
struct NetworkQualityAssessmentResult {
    double latency;     // Latency in milliseconds
    double jitter;      // Jitter in milliseconds
    double packetLoss;  // Packet loss percentage
    double bandwidth;   // Bandwidth in Mbps
    std::string quality; // Quality: "good" or "poor"
};

class NetworkQualityAssessment {
public:
    // Function to perform network quality assessment
    static std::vector<NetworkQualityAssessmentResult> assess() {
        // Array of hardcoded network quality assessment values
        std::vector<NetworkQualityAssessmentResult> results;

        for (int i = 0; i < 5; ++i) {
            NetworkQualityAssessmentResult result;
            // Hardcoded network quality assessment values with slight variation
            result.latency = 20.0 + rand() % 10;            // 20-30 ms
            result.jitter = 5.0 + (rand() % 5) / 10.0;      // 5-6 ms
            result.packetLoss = 0.05 + (rand() % 6) / 100.0; // 0.05-0.1 (5-10%)
            result.bandwidth = 90.0 + rand() % 20;          // 90-110 Mbps
            
            // Simulate qualitative assessment based on thresholds
            if (i < 2 || (result.latency > 50.0 || result.jitter > 10.0 || result.packetLoss > 0.1 || result.bandwidth < 50.0)) {
                result.quality = "poor";
            } else {
                result.quality = "good";
            }

            results.push_back(result);
        }

        return results;
    }
};

#endif // NETWORK_QUALITY_ASSESSMENT_H
