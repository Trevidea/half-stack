// preview_service.cpp

#include "preview_service.h"

void PreviewService::generatePreviewJSON(Response &response)
{
    // Generate JSON data
    std::string jsonData = "{";
    jsonData += "\"Name\": \"Coach S.\",";
    jsonData += "\"Location\": \"Press Box\",";
    jsonData += "\"Device ID\": \"ipad15\",";
    jsonData += "\"Device type\": \"ipad\",";
    jsonData += "\"Network\": \"Penfield-524\"";
    jsonData += "}";

    std::string jsonData1 = "{";
    jsonData1 += "\"Name\": \"Coach M.\",";
    jsonData1 += "\"Location\": \"Field\",";
    jsonData1 += "\"Device ID\": \"iphone12\",";
    jsonData1 += "\"Device type\": \"iphone\",";
    jsonData1 += "\"Network\": \"Penfield-524\"";
    jsonData1 += "}";

    std::string jsonData2 = "{";
    jsonData2 += "\"Name\": \"Coach J.\",";
    jsonData2 += "\"Location\": \"Locker Room\",";
    jsonData2 += "\"Device ID\": \"android25\",";
    jsonData2 += "\"Device type\": \"android\",";
    jsonData2 += "\"Network\": \"Penfield-524\"";
    jsonData2 += "}";

    std::string jsonData3 = "{";
    jsonData3 += "\"Name\": \"Coach R.\",";
    jsonData3 += "\"Location\": \"Sidelines\",";
    jsonData3 += "\"Device ID\": \"ipad20\",";
    jsonData3 += "\"Device type\": \"ipad\",";
    jsonData3 += "\"Network\": \"Penfield-524\"";
    jsonData3 += "}";

    std::string jsonData4 = "{";
    jsonData4 += "\"Name\": \"Coach P.\",";
    jsonData4 += "\"Location\": \"Bench\",";
    jsonData4 += "\"Device ID\": \"iphoneXS\",";
    jsonData4 += "\"Device type\": \"iphone\",";
    jsonData4 += "\"Network\": \"Penfield-524\"";
    jsonData4 += "}";

    // Set JSON data to the Response object
    response.setData(jsonData);

    // Notify subscribers that the work has been completed
    response.complete();
}
