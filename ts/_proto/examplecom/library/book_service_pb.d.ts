// package: examplecom.library
// file: examplecom/library/book_service.proto

import * as jspb from "google-protobuf";

export class Book extends jspb.Message {
  getIsbn(): number;
  setIsbn(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getAuthor(): string;
  setAuthor(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Book.AsObject;
  static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Book;
  static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
  export type AsObject = {
    isbn: number,
    title: string,
    author: string,
  }
}

export class GetTestArrayRequest extends jspb.Message {
  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTestArrayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTestArrayRequest): GetTestArrayRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTestArrayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTestArrayRequest;
  static deserializeBinaryFromReader(message: GetTestArrayRequest, reader: jspb.BinaryReader): GetTestArrayRequest;
}

export namespace GetTestArrayRequest {
  export type AsObject = {
    size: number,
  }
}

