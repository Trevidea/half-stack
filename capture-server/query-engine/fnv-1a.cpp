#include "fnv-1a.h"
#include <sstream>
#include <iomanip>

std::string fnv1a_hash(const std::string &input) {
    const uint32_t FNV_prime = 0x01000193;
    const uint32_t FNV_offset_basis = 0x811C9DC5;
    
    uint32_t hash = FNV_offset_basis;
    for (char c : input) {
        hash ^= static_cast<uint32_t>(c);
        hash *= FNV_prime;
    }
    
    std::stringstream ss;
    ss << std::hex << std::setw(8) << std::setfill('0') << hash;
    return ss.str();
}
