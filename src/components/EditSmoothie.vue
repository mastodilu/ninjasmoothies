<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{smoothie.title}} smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredients">Ingredients:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
      </div>
      <div class="field add-ingredients">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{feedback}} </p>
        <button class="btn pink">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify"
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db.collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(currentDBData => {
      currentDBData.forEach(row => {
        this.smoothie = row.data()
        this.smoothie.id = row.id
        console.log(this.smoothie)
      });
    });
  },
  methods:{
    addIng(){
      this.feedback = null
      console.log('add ingredient method')
      // check val not null
      if(this.another && this.smoothie.title){
        // add ingredient to array
        this.smoothie.ingredients.push(this.another)
      }else{
        this.feedback = 'Do not leave any blank fields'
      }
      this.another = null
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingr => {
        return ingr != ing
      })
    },
    EditSmoothie(){
      console.log('EDIT SMOOTHIE method -- ', this.smoothie, this.smoothie.id)
      this.feedback = null
      if(this.smoothie.title){
        if(this.another)
          this.smoothie.ingredients.push(this.another)

        //create slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-', //every space becomes -
          remove: /[$*_+~.()'"!\-:@]/g, //removes the characters between this /[ ... ]/g globally
          lower: true
        })
        
        //send to database
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push({name: 'Index'})
        }).catch(err => {
          console.log(err)
        })

        this.title = null
        this.another = null
      }else{
        this.feedback = 'Do not leave any blank fields'
      }


    }
  }
};
</script>

<style>
.edit-smoothie .centered {
  text-align: center;
}

.edit-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.6em;
  cursor: pointer;

}

</style>
