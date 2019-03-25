// package: examplecom.library
// file: examplecom/library/book_service.proto

import * as examplecom_library_book_service_pb from "../../examplecom/library/book_service_pb";
export class BookService {
  static serviceName = "examplecom.library.BookService";
}
export namespace BookService {
  export class GetTestArray {
    static readonly methodName = "GetTestArray";
    static readonly service = BookService;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = examplecom_library_book_service_pb.GetTestArrayRequest;
    static readonly responseType = examplecom_library_book_service_pb.Book;
  }
}
