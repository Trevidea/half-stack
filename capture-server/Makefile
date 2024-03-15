all: prepare target

depends:
	cd ./build && cmake .. --graphviz=graph.dot && dot -Tpng graph.dot -o deps.png

prepare:
	rm -rf ./build && mkdir ./build

target:
	cd ./build && cmake -G Ninja .. -DCMAKE_BUILD_TYPE=Debug &&	cmake --build .

engine:
	cd ./build && cmake --build . --target pg-dal

api: engine hr
	cd ./build && cmake --build . --target payroll-server

hr:
	cd ./build && cmake --build . --target hr-manager

test: engine
	cd ./build && cmake --build . --target unit-tests
