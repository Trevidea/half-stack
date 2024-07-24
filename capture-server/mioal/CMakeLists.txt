# mioal/CMakeLists.txt
cmake_minimum_required(VERSION 3.15)


project(mioal)

if(APPLE)
    set(fmt_DIR "$ENV{VCPKG_ROOT}/installed/arm64-osx/share/fmt")
    set(miniocpp_DIR "$ENV{VCPKG_ROOT}/installed/arm64-osx/share/miniocpp")
    set(unofficial-curlpp_DIR "$ENV{VCPKG_ROOT}/installed/arm64-osx/share/unofficial-curlpp")
    set(unofficial-inih_DIR "$ENV{VCPKG_ROOT}/installed/arm64-osx/share/unofficial-inih")
    set(nlohmann_json_DIR "$ENV{VCPKG_ROOT}/installed/arm64-osx/share/nlohmann_json")
elseif(WIN32)
    set(fmt_DIR "$ENV{VCPKG_ROOT}/installed/x64-windows/share/fmt")
    set(miniocpp_DIR "$ENV{VCPKG_ROOT}/installed/x64-windows/share/miniocpp")
    set(unofficial-curlpp_DIR "$ENV{VCPKG_ROOT}/installed/x64-windows/share/unofficial-curlpp")
    set(unofficial-inih_DIR "$ENV{VCPKG_ROOT}/installed/x64-windows/share/unofficial-inih")
    set(nlohmann_json_DIR "$ENV{VCPKG_ROOT}/installed/x64-windows/share/nlohmann_json")
endif()

# # Set vcpkg toolchain only for this subdirectory
# if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
#     set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
#         CACHE STRING "Vcpkg toolchain file")
# endif()

# # Ensure CMake uses the toolchain file
# include("${CMAKE_TOOLCHAIN_FILE}")

# Add dependencies
find_package(fmt REQUIRED)
find_package(miniocpp REQUIRED)

# Add your library sources
add_library(mioal minio-bridge.cpp)

# Link the dependencies
target_link_libraries(mioal PRIVATE fmt::fmt miniocpp::miniocpp)
target_include_directories(mioal PUBLIC "./")

