# mioal/CMakeLists.txt
cmake_minimum_required(VERSION 3.15)


project(mioal)



# # Set vcpkg toolchain only for this subdirectory
# if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
#     set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
#         CACHE STRING "Vcpkg toolchain file")
# endif()

# # Ensure CMake uses the toolchain file
# include("${CMAKE_TOOLCHAIN_FILE}")

# Add dependencies

# Add your library sources
add_library(mioal minio-bridge.cpp)

# Link the dependencies
target_link_libraries(mioal PUBLIC fmt::fmt miniocpp::miniocpp)
target_include_directories(mioal PUBLIC "./")

