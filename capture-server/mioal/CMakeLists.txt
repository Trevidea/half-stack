# mioal/CMakeLists.txt
cmake_minimum_required(VERSION 3.15)


project(mioal)

# if(APPLE)
#     set(fmt_DIR "$ENV{VCPKG_ROOT}/packages/fmt_arm64-osx/share/fmt")
#     set(miniocpp_DIR "$ENV{VCPKG_ROOT}/packages/minio-cpp_arm64-osx/share/miniocpp")
#     set(unofficial-curlpp_DIR "$ENV{VCPKG_ROOT}/packages/curlpp_arm64-osx/share/unofficial-curlpp")
#     set(unofficial-inih_DIR "$ENV{VCPKG_ROOT}/packages/inih_arm64-osx/share/unofficial-inih")
#     set(nlohmann_json_DIR "$ENV{VCPKG_ROOT}/packages/nlohmann-json_arm64-osx/share/nlohmann_json")
# elseif()
    
# endif()
set(fmt_DIR "$ENV{VCPKG_ROOT}/packages/fmt_x64-linux/share/fmt")
set(miniocpp_DIR "$ENV{VCPKG_ROOT}/packages/minio-cpp_x64-linux/share/miniocpp")
set(unofficial-curlpp_DIR "$ENV{VCPKG_ROOT}/packages/curlpp_x64-linux/share/unofficial-curlpp")
set(unofficial-inih_DIR "$ENV{VCPKG_ROOT}/packages/inih_x64-linux/share/unofficial-inih")
set(nlohmann_json_DIR "$ENV{VCPKG_ROOT}/packages/nlohmann-json_x64-linux/share/nlohmann_json")

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

