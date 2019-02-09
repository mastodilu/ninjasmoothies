<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
        <label for="ingredients">Ingredients:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
      </div>
      <div class="field add-ingredients">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{feedback}} </p>
        <button class="btn pink">Add smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddSmoothie(){
      console.log('ADD SMOOTHIE method')
      this.feedback = null
      if(this.title && this.another){
        this.ingredients.push(this.another)

        //create slug
        this.slug = slugify(this.title, {
          replacement: '-', //every space becomes -
          remove: /[$*_+~.()'"!\-:@]/g, //removes the characters between this /[ ... ]/g globally
          lower: true
        })
        
        //send to database
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
    },
    addIng(){
      this.feedback = null
      console.log('add ingredient method')
      // check val not null
      if(this.another && this.title){
        // add ingredient to array
        this.ingredients.push(this.another)
      }else{
        this.feedback = 'Do not leave any blank fields'
      }
      this.another = null
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingr => {
        return ingr != ing
      })
    }
  }
};
</script>

<style>
.add-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.6em;
  cursor: pointer;

}
</style>
