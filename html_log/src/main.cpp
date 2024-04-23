#include <iostream>


int main()
{
	std::string lineInput;
	std::cout << "<html><body>" << std::endl;
	while (std::getline(std::cin,lineInput)) {
  		std::cout <<lineInput << "<br>" << std::endl;
	}
	std::cout << "</body></html>" << std::endl;
	return 0;
};
