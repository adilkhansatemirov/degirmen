<template>
   <div class="container">
      <h2 class="title">Изменить блюда</h2>
      <ul class="dishes-list">
         <v-dish-item
            :dish="baklava"
            v-for="baklava in baklavas"
            :key="baklava.id"
         ></v-dish-item>
      </ul>
   </div>
</template>

<script>
import { mapState } from "vuex";
import DishItem from "./DishItem";

export default {
   components: {
      "v-dish-item": DishItem
   },
   computed: mapState({
      baklavas: state => state.dishes.dishes.baklavas
   })
};
</script>

<style scoped>
.title {
   text-align: center;
   color: #4e0000;
   font-weight: lighter;
   font-size: 1.7rem;
   margin: 0.5rem 0;
}
.dishes-list {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
}
</style>
