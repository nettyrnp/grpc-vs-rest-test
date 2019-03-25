# grpc-vs-rest-test

Сommunication throughput test for various configurations of an application having backend and frontend: 
gRPC-websocket vs gRPC-REST vs JSON-REST


## Running with HTTP/1.1

### Install
```
npm install
```
The `postinstall` sub-command will run `npm run get_go_deps` to install Golang dependencies. [dep](https://github.com/golang/dep) is used for go dependency management.

### Start
```
npm start
```
This will start the Golang server and Webpack dev server

### Visit the page in browser 
```
http://localhost:8081
```
