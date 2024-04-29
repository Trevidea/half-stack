// preview_service.cpp

#include "preview_service.h"

void PreviewService::generatePreviewJSON(Response &response)
{
    // Generate JSON data
    std::string jsonData = "{";
    jsonData += "\"Name\": \"Coach S.\",";
    jsonData += "\"Location\": \"Press Box\",";
    jsonData += "\"EventDevice ID\": \"ipad15\",";
    jsonData += "\"EventDevice type\": \"ipad\",";
    jsonData += "\"Network\": \"Penfield-524\"";
    jsonData += "}";

    std::string jsonData1 = "{";
    jsonData1 += "\"Name\": \"Coach M.\",";
    jsonData1 += "\"Location\": \"Field\",";
    jsonData1 += "\"EventDevice ID\": \"iphone12\",";
    jsonData1 += "\"EventDevice type\": \"iphone\",";
    jsonData1 += "\"Network\": \"Penfield-524\"";
    jsonData1 += "}";

    std::string jsonData2 = "{";
    jsonData2 += "\"Name\": \"Coach J.\",";
    jsonData2 += "\"Location\": \"Locker Room\",";
    jsonData2 += "\"EventDevice ID\": \"android25\",";
    jsonData2 += "\"EventDevice type\": \"android\",";
    jsonData2 += "\"Network\": \"Penfield-524\"";
    jsonData2 += "}";

    std::string jsonData3 = "{";
    jsonData3 += "\"Name\": \"Coach R.\",";
    jsonData3 += "\"Location\": \"Sidelines\",";
    jsonData3 += "\"EventDevice ID\": \"ipad20\",";
    jsonData3 += "\"EventDevice type\": \"ipad\",";
    jsonData3 += "\"Network\": \"Penfield-524\"";
    jsonData3 += "}";

    std::string jsonData4 = "{";
    jsonData4 += "\"Name\": \"Coach P.\",";
    jsonData4 += "\"Location\": \"Bench\",";
    jsonData4 += "\"EventDevice ID\": \"iphoneXS\",";
    jsonData4 += "\"EventDevice type\": \"iphone\",";
    jsonData4 += "\"Network\": \"Penfield-524\"";
    jsonData4 += "}";

    // Set JSON data to the Response object
    response.setData(jsonData);

    // Notify subscribers that the work has been completed
    response.complete();
}
