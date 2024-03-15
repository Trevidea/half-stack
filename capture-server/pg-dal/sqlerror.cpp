#include "sqlerror.h"

SqlError::SqlError(const std::exception *e):mp_e{e}
{
}

SqlError::~SqlError()
{
}