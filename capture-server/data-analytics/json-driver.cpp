#include "json-driver.h"
#include "duckdb.hpp"
#include <iostream>

using namespace duckdb;



JsonDriver::JsonDriver(/* args */)
{
    {
      try
      {
         // Initialize DuckDB
         duckdb::DuckDB db(nullptr); // Using an in-memory database
         duckdb::Connection con(db);

         // Load the JSON extension
         con.Query("LOAD 'json';");

         // Create a table and insert data
         con.Query("CREATE TABLE people (name VARCHAR, age INTEGER, city VARCHAR);");
         con.Query("INSERT INTO people VALUES ('John Doe', 30, 'New York');");
         con.Query("INSERT INTO people VALUES ('Jane Smith', 25, 'Los Angeles');");

         // Write the table to a JSON file
         con.Query("COPY people TO 'people.json' (FORMAT JSON);");
         std::cout << "Data written to people.json" << std::endl;

         // Create a new table to read the JSON data into
         con.Query("CREATE TABLE people_from_json (name VARCHAR, age INTEGER, city VARCHAR);");

         // Read the JSON file into the new table
         con.Query("COPY people_from_json FROM 'people.json' (FORMAT JSON);");
         std::cout << "Data read from people.json" << std::endl;

         // Query the data to verify it was read correctly
         auto result = con.Query("SELECT * FROM people_from_json;");
         result->Print();
      }
      catch (std::exception &ex)
      {
         std::cerr << "Error: " << ex.what() << std::endl;
      }
   }
}

JsonDriver::~JsonDriver()
{
}