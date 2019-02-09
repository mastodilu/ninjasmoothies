<template>
  <div class="index container">
    <div class="card z-depth-3" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text"> {{ smoothie.title }} </h2>
        <ul class="ingredients">
          <li v-for="(ing,index) in smoothie.ingredients" :key="index">
            <span class="chip"> {{ ing }} </span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to=" {name: 'EditSmoothie', params:{smoothie_slug: smoothie.slug}} ">
          <i class="material-icons edit ">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id){
    // DELETE from FIRESTORE
      // console.log(id)
      db.collection('smoothies').doc(id).delete()
      .then( () => {
        // LOCAL DELETE
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id;
        })
      })
    }
  },
  created(){//fetch data from firestore
    db.collection('smoothies').get()
    .then(currentDBData => {
      currentDBData.forEach(row => {
        // console.log(row.data(), row.id)
        let smoothie = row.data()
        smoothie.id = row.id;
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<style>
.index {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-gap: 30px;
  margin-top: 50px;
}

.index h2 {
  font-size: 2em;
  text-align: center;
}

.index .ingredients {
  margin:30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
