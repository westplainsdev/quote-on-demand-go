package library

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"strconv"
)

// this is our data structure
type Quote struct {
	Id     int    `json:"id"`
	Author string `json:"author"`
	Text   string `json:"text"`
}

// our collection for the filled Quotes
var data []Quote

// this is a private function to this file because it is not Capitalized
func findHighestId() int {
	maxId := data[0].Id
	for _, v := range data {
		if v.Id > maxId {
			maxId = v.Id
		}
	}
	return maxId
}

// load the JSON data file for usage.
func LoadData() {
	var content, err = ioutil.ReadFile("data.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	json.Unmarshal(content, &data)
}

// the following are the actual CRUD endpoint functions
func GetQuote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func GetQuoteById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Gets params using Mux
	requestId, _ := strconv.Atoi(params["id"])
	// Loop through collection of quotes and find one with the id from the params
	for _, item := range data {
		if item.Id == requestId {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Quote{})
}

func CreateQuote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	quote := Quote{}
	_ = json.NewDecoder(r.Body).Decode(&quote)
	quote.Id = findHighestId() + 1

	data = append(data, quote)
	json.NewEncoder(w).Encode(quote)
}

func UpdateQuote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	quote := Quote{}
	_ = json.NewDecoder(r.Body).Decode(&quote)

	for index, item := range data {
		if item.Id == quote.Id {
			data = append(data[:index], data[index+1:]...)
			data = append(data, quote)
			json.NewEncoder(w).Encode(quote)
			return
		}
	}
}

func DeleteQuote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	requestId, _ := strconv.Atoi(params["id"])

	for index, item := range data {
		if item.Id == requestId {
			data = append(data[:index], data[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(data)
}
