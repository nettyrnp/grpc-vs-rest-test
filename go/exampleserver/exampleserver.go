package main

import (
	"bytes"
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"

	"strings"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	library "github.com/nettyrnp/grpc-vs-rest-test/go/_proto/examplecom/library"
)

var (
	enableTls       = flag.Bool("enable_tls", false, "Use TLS - required for HTTP2.")
	tlsCertFilePath = flag.String("tls_cert_file", "../misc/localhost.crt", "Path to the CRT/PEM file.")
	tlsKeyFilePath  = flag.String("tls_key_file", "../misc/localhost.key", "Path to the private key file.")
)

func main() {
	flag.Parse()

	port := 9090
	if *enableTls {
		port = 9091
	}

	grpcServer := grpc.NewServer()
	library.RegisterBookServiceServer(grpcServer, &bookService{})
	grpclog.SetLogger(log.New(os.Stdout, "exampleserver: ", log.LstdFlags))

	wrappedServer := grpcweb.WrapServer(grpcServer)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	grpclog.Printf("Starting server. http port: %d, with TLS: %v", port, *enableTls)

	if *enableTls {
		if err := httpServer.ListenAndServeTLS(*tlsCertFilePath, *tlsKeyFilePath); err != nil {
			grpclog.Fatalf("failed starting http2 server: %v", err)
		}
	} else {
		if err := httpServer.ListenAndServe(); err != nil {
			grpclog.Fatalf("failed starting http server: %v", err)
		}
	}
}

type bookService struct{}

func (s *bookService) GetTestArray(bookQuery *library.GetTestArrayRequest, stream library.BookService_GetTestArrayServer) error {
	stream.SendHeader(metadata.Pairs("Pre-Response-Metadata", "Is-sent-as-headers-stream"))

	// send elements
	var i int64
	for i = 0; i < bookQuery.Size; i++ {
		book := &library.Book{
			Isbn: i + 1,
			//Isbn:                 randInt64(),
			Title:  randStr(20),
			Author: randStr(8),
		}
		stream.Send(book)
	}
	stream.SetTrailer(metadata.Pairs("Post-Response-Metadata", "Is-sent-as-trailers-stream"))
	return nil
}

func randInt64() int64 {
	return rand.Int63()
}

func randStr(size int) string {
	letters := "abcdefghABCDEFGH0123456789"
	arr := strings.Split(letters, "")
	buf := bytes.Buffer{}
	for i := 0; i < size; i++ {
		id := rand.Intn(len(arr))
		buf.WriteString(arr[id])
	}
	return buf.String()
}
