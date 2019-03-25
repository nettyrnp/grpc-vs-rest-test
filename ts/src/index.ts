import {grpc} from "@improbable-eng/grpc-web";
import {BookService} from "../_proto/examplecom/library/book_service_pb_service";
import {GetTestArrayRequest, Book} from "../_proto/examplecom/library/book_service_pb";

declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:9091" : "http://localhost:9090";

function getTestArray() {
  const getTestArrayRequest = new GetTestArrayRequest();
  var start = new Date().getTime();
  getTestArrayRequest.setSize(300000);
  const client = grpc.client(BookService.GetTestArray, {
    host: host,
  });
  client.onHeaders((headers: grpc.Metadata) => {
    console.log("getTestArray.onHeaders", headers);
  });
  client.onMessage((message: Book) => {
    var i = message.getIsbn()
    if (i%10000===0) {
      var timeTaken = (new Date().getTime() - start)/1000
      // console.log(">> i:", i, " [", timeTaken, "s]");
      console.log(">> rate:", (i/timeTaken), "messages/s");
    }
  });
  client.onEnd((code: grpc.Code, msg: string, trailers: grpc.Metadata) => {
    console.log("getTestArray.onEnd", code, msg, trailers);
  });
  client.start();
  client.send(getTestArrayRequest);
}

getTestArray();


