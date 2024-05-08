#include <iostream>
#include <string>
#include <regex>
#include <nlohmann/json.hpp>

int main()
{
	std::ios_base::sync_with_stdio(false);

	nlohmann::json logArray;
	std::string lineInput;
	// std::regex logPattern(R"(\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] \[([a-z]+)\]((?:.|\n(?!\[\d{4}-\d{2}-\d{2}))+))");
	std::regex logPattern(R"(\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] \[(\d+)\] \[([a-z]+)\] \[(\d+)\]((?:.|\n(?!\[\d{4}-\d{2}-\d{2}))+))");


	while (std::getline(std::cin, lineInput))
	{
		auto begin = std::sregex_iterator(lineInput.begin(), lineInput.end(), logPattern);
		auto end = std::sregex_iterator();

		for (std::sregex_iterator i = begin; i != end; ++i)
		{
			std::smatch match = *i;
			nlohmann::json logEntry = {
				{"timestamp", match[1].str()},
				{"lapse", match[2].str()},
				{"level", match[3].str()},
				{"tid", match[4].str()},
				{"message", match[5].str()}};

			// Print each log entry as JSON to std::cout and flush the buffer
			std::cout << logEntry.dump() << std::endl; // std::endl flushes the output buffer
		}
	}

	return 0;
}

// int main()
// {
// 	std::string lineInput;
// 	// std::cout << "<html><body>" << std::endl;
// 	while (std::getline(std::cin, lineInput))
// 	{
// 		// std::cout << lineInput << "<br>" << std::endl;

// 		std::regex logPattern(R"(\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] \[([a-z]+)\]((?:.|\n(?!\[\d{4}-\d{2}-\d{2}))+))");

// 		auto begin = std::sregex_iterator(lineInput.begin(), lineInput.end(), logPattern);
// 		auto end = std::sregex_iterator();

// 		for (std::sregex_iterator i = begin; i != end; ++i)
// 		{
// 			std::smatch match = *i;
// 			std::string timestamp = match[1].str();
// 			std::string type = match[2].str();
// 			std::string data = match[3].str();

// 			std::cout << "Timestamp: " << timestamp << std::endl;
// 			std::cout << "Log Type: " << type << std::endl;
// 			std::cout << "Log Data: " << data << std::endl;
// 			std::cout << "--------------------------" << std::endl;
// 		}

// 	}
// 	// std::cout << "</body></html>" << std::endl;
// 	return 0;
// };
