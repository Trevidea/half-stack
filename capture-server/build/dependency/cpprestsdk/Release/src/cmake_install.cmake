# Install script for directory: /Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Debug")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/Library/Developer/CommandLineTools/usr/bin/objdump")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/pplx" TYPE FILE FILES "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/threadpool.h")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cpprest" TYPE FILE FILES
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/astreambuf.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/asyncrt_utils.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/base_uri.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/containerstream.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/filestream.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/http_client.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/http_compression.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/http_headers.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/http_listener.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/http_msg.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/interopstream.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/json.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/oauth1.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/oauth2.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/producerconsumerstream.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/rawptrstream.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/streams.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/uri.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/uri_builder.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/version.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/ws_client.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/ws_msg.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/pplx" TYPE FILE FILES
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplx.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxcancellation_token.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxconv.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxinterface.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxlinux.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxtasks.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/pplx/pplxwin.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cpprest/details" TYPE FILE FILES
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/SafeInt3.hpp"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/basic_types.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/cpprest_compat.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/fileio.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/http_constants.dat"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/http_helpers.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/http_server.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/http_server_api.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/nosal.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/resource.h"
    "/Users/manishverma/git/half-stack/capture-server/dependency/cpprestsdk/Release/src/../include/cpprest/details/web_utilities.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE SHARED_LIBRARY FILES "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/Binaries/libcpprest.2.10.dylib")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.2.10.dylib" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.2.10.dylib")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "/Library/Developer/CommandLineTools/usr/bin/strip" -x "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.2.10.dylib")
    endif()
  endif()
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE SHARED_LIBRARY FILES "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/Binaries/libcpprest.dylib")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.dylib" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.dylib")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "/Library/Developer/CommandLineTools/usr/bin/strip" -x "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libcpprest.dylib")
    endif()
  endif()
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk" TYPE FILE FILES
    "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/src/cpprestsdk-config.cmake"
    "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/src/cpprestsdk-config-version.cmake"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk/cpprestsdk-targets.cmake")
    file(DIFFERENT _cmake_export_file_changed FILES
         "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk/cpprestsdk-targets.cmake"
         "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/src/CMakeFiles/Export/0f425fe7e2467babc1de94b92f87002d/cpprestsdk-targets.cmake")
    if(_cmake_export_file_changed)
      file(GLOB _cmake_old_config_files "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk/cpprestsdk-targets-*.cmake")
      if(_cmake_old_config_files)
        string(REPLACE ";" ", " _cmake_old_config_files_text "${_cmake_old_config_files}")
        message(STATUS "Old export file \"$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk/cpprestsdk-targets.cmake\" will be replaced.  Removing files [${_cmake_old_config_files_text}].")
        unset(_cmake_old_config_files_text)
        file(REMOVE ${_cmake_old_config_files})
      endif()
      unset(_cmake_old_config_files)
    endif()
    unset(_cmake_export_file_changed)
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk" TYPE FILE FILES "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/src/CMakeFiles/Export/0f425fe7e2467babc1de94b92f87002d/cpprestsdk-targets.cmake")
  if(CMAKE_INSTALL_CONFIG_NAME MATCHES "^([Dd][Ee][Bb][Uu][Gg])$")
    file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/cpprestsdk" TYPE FILE FILES "/Users/manishverma/git/half-stack/capture-server/build/dependency/cpprestsdk/Release/src/CMakeFiles/Export/0f425fe7e2467babc1de94b92f87002d/cpprestsdk-targets-debug.cmake")
  endif()
endif()

