package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func HealthCheck(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprint(w, "API Is alive and ready")
}

func getQuote(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "get all endpont")
}

func getQuoteById(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "get by id endpoint")
}

func createQuote(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "create endpoint")
}

func updateQuote(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "update endpoint")
}

func deleteQuote(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "delete endpoint")
}


func main()  {
	print("Hello World")
	router := mux.NewRouter()
	router.HandleFunc("/api/quote/", getQuote).Methods("GET")
	router.HandleFunc("/api/quote/{id}", getQuoteById).Methods("GET")
	router.HandleFunc("/api/quote/", createQuote).Methods("POST")
	router.HandleFunc("/api/quote/", updateQuote).Methods("PUT")
	router.HandleFunc("/api/quote/{id}", deleteQuote).Methods("DELETE")
	router.HandleFunc("/", HealthCheck).Methods("GET")


	log.Fatal(http.ListenAndServe(":5000", router))

}
