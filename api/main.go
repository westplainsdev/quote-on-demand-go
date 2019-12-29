package main

import (
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"quotes-on-demand-go/library"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "API is alive and ready")
}

func main() {

	library.LoadData()

	router := mux.NewRouter()
	router.HandleFunc("/quote/", library.GetQuote).Methods("GET")
	router.HandleFunc("/quote/{id}", library.GetQuoteById).Methods("GET")
	router.HandleFunc("/quote/", library.CreateQuote).Methods("POST")
	router.HandleFunc("/quote/", library.UpdateQuote).Methods("PUT")
	router.HandleFunc("/quote/{id}", library.DeleteQuote).Methods("DELETE")
	router.HandleFunc("/", HealthCheck).Methods("GET")

	var port = ":5000"
	print("Listening And Serving on " + port)
	log.Fatal(http.ListenAndServe(port, handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"*"}))(router)))

}
