var manage = Vue.component("Manage",{
    template: `<div>
   <h4>{{ message }}</h4>
   <hr />
   <p v-if="errors.length" class="alert alert-danger">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
    <form>
        <input type="hidden" v-model="quote.id" />
        <div class="form-group">
            <label for="formGroupAuthorInput">Author:</label>
            <input type="text" class="form-control" id="formGroupAuthorInput" placeholder="Author Name" v-model.trim="quote.author">
        </div>
        <div class="form-group">
            <label for="formGroupQuoteTextInput">Quote Text</label>
            <input type="text" class="form-control" id="formGroupQuoteTextInput" placeholder="Quote text" v-model.trim="quote.text">
        </div>
        <button type="submit" class="btn btn-outline-success" @click="save">Save Quote</button>
        <button type="button" class="btn btn-danger" @click="cancel">Cancel</button> 
    </form> 
</div>
`,
 
data() {
  return {
      message: '',
      quote: {
        id: undefined,
        author: '',
        text: ''
      },
      success: false,
      error: '',
      errors: []
    };
  },
    methods: {
      load(){
        let id = this.$route.params.id;
        if(id){
          this.message = 'Edit a quote';
          axios
          .get(baseUrl + '/quote/' + id)
          .then(response => (this.quote = response.data));
        } else {
          this.message = 'Add a quote';
        }
        
      },

      checkForm(){
        if (this.quote.author && this.quote.text) {
          return true;
        }  
        this.errors = [];
  
        if (!this.quote.author) {
          this.errors.push('Author name is required.');
        }
        if (!this.quote.text) {
          this.errors.push('Quote text is required.');
        }
        if(this.errors.length > 0){
          return false;
        }
      },

      save(){   
        if(this.checkForm()){
          if(this.quote.id){
            axios.put(baseUrl + '/quote/',  this.quote)
                 .then(function(response){
                   this.success = response.data;
                   if(this.success){
                    router.push('/');
                   }
                 }).catch(function (error) {
                  this.error = error;
                });
          } else {
            axios.post(baseUrl + '/quote/',  this.quote)
            .then(function (response) {
              this.success = response.data;
              if(this.success){
                router.push('/');
              }
            })
            .catch(function (error) {
              this.error = error;
            });
          }
        }        
      },

      cancel() {
        router.push('/');
      }
    },
    
    mounted() {
     this.load();
    }
});
