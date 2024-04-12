// preview_service.cpp

#include "preview_service.h"

void PreviewService::generatePreviewJSON(Response &response) {
    // Generate JSON data
    std::string jsonData = "{";
    jsonData += "\"Name\": \"Coach S.\",";
    jsonData += "\"Location\": \"Press Box\",";
    jsonData += "\"Device ID\": \"ipad15\",";
    jsonData += "\"Device type\": \"ipad\",";
    jsonData += "\"Network\": \"Penfield-524\"";
    jsonData += "}";

    // Set JSON data to the Response object
    response.setData(jsonData);

    // Notify subscribers that the work has been completed
    response.complete();
}
