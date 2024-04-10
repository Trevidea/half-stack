// preview_service.h

#ifndef PREVIEW_SERVICE_H
#define PREVIEW_SERVICE_H

#include "response.h" // Include Response header

class PreviewService {
public:
    PreviewService();
    void generatePreviewJSON(Response &response);
};

#endif // PREVIEW_SERVICE_H
