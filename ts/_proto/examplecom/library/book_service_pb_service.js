// package: examplecom.library
// file: examplecom/library/book_service.proto

var examplecom_library_book_service_pb = require("../../examplecom/library/book_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var BookService = (function () {
  function BookService() {}
  BookService.serviceName = "examplecom.library.BookService";
  return BookService;
}());

BookService.GetTestArray = {
  methodName: "GetTestArray",
  service: BookService,
  requestStream: false,
  responseStream: true,
  requestType: examplecom_library_book_service_pb.GetTestArrayRequest,
  responseType: examplecom_library_book_service_pb.Book
};

exports.BookService = BookService;

function BookServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BookServiceClient.prototype.getTestArray = function getTestArray(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(BookService.GetTestArray, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.BookServiceClient = BookServiceClient;

