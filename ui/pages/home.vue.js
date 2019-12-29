var home = Vue.component("Home", {
  template: `<div>
    <h4>{{message}}</h4>
    <hr />
    <p>Select Quote: <select @change="onChange($event)">
            <option v-for="item in selectList" :value="item.value">{{item.author}}</option>
        </select>
    </p>
    <hr />
    <div v-for="(quote, index) in quotes" :key="index" v-if="multiple">
        <blockquote class="blockquote">
            <p class="mb-0 col-11 .col-md-7">{{ quote.text }}</p>
            <footer class="blockquote-footer">{{quote.author}}
                <div class="float-right">
                    <router-link :to="'/manage/' + quote.id" class="btn btn-secondary btn-sm">edit</router-link>
                    <button type="button" title="Delete Quote" class="btn btn-outline-danger btn-sm" @click="removeSingleQuote(quote.id)">
                        <span>&times;</span>
                    </button>
                </div>
            </footer>
        </blockquote>
        <hr />
    </div>

    <div v-if="!multiple">
        <blockquote class="blockquote">
            <p class="mb-0 col-11 .col-md-7">{{ quote.text }}</p>
            <footer class="blockquote-footer">{{quote.author}}
                <div class="float-right">
                    <router-link :to="'/manage/' + quote.id" class="btn btn-secondary btn-sm">edit</router-link>
                    <button type="button" title="Delete Quote" class="btn btn-outline-danger btn-sm" @click="removeSingleQuote(quote.id)">
                        <span>&times;</span>
                    </button>
                </div>
            </footer>
        </blockquote>
    </div>
</div>`,
  data() {
    return {
      message: 'View our quotes',
      quotes: [],
      quote: {},
      multiple: false,
      selectList: [],
      error: '',
    };
  },

  methods: {
    onChange(event) {
      let quoteIndex = event.target.value;
      if (quoteIndex == 0) {
        this.getAllQuotes();
      } else {
        this.getSingleQuote(quoteIndex);
      }
    },

    getAllQuotes() {
      axios
        .get(baseUrl + '/quote/')
        .then(response => {
          let data = response.data;
          this.quotes = data;
          this.selectList = this.setupSelect(data);
          this.selectList.unshift({
            author: 'All Authors',
            value: 0
          });
          return (this.quotes, this.selectList);
        });

      this.multiple = true;
    },

    getSingleQuote(id) {
      axios
        .get(baseUrl + '/quote/' + id)
        .then(response => (this.quote = response.data));
      this.multiple = false;
    },

    removeSingleQuote(id) {
      axios.delete(baseUrl + '/quote/' + id)
        .then(() => {
          this.getAllQuotes()
        })
        .catch((error) => {
          this.$log.debug(error);
          this.error = "Failed to remove quote"
        });

    },

    setupSelect(quoteList) {
      return quoteList.map(function (quote) {
        return {
          author: quote.author,
          value: quote.id
        };
      }).sort((a, b) => (a.author > b.author) ? 1 : -1);
    }
  },

  mounted() {
    this.getAllQuotes();
  }
});