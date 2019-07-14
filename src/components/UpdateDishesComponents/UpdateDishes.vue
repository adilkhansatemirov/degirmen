<template>
   <div class="container">
      <h1 class="title">Изменить блюда</h1>
      <!-- SOUPS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Супы</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="soup"
               v-for="soup in soups"
               :key="soup.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- MAIN DISHES -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Горячие блюда</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="mainDish"
               v-for="mainDish in mainDishes"
               :key="mainDish.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- DONERS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Донер меню</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="doner"
               v-for="doner in doners"
               :key="doner.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- PIZZAS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Пицца меню</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="pizza"
               v-for="pizza in pizzas"
               :key="pizza.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- GARNIRS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Гарниры</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="garnir"
               v-for="garnir in garnirs"
               :key="garnir.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- SALATS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Салаты</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="salat"
               v-for="salat in salats"
               :key="salat.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- SHASHLYKS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Шашлыки</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="shashlyk"
               v-for="shashlyk in shashlyks"
               :key="shashlyk.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- BREAKFASTS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Завтраки</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="breakfast"
               v-for="breakfast in breakfasts"
               :key="breakfast.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- TANDYRS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Тандыр меню</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="tandyr"
               v-for="tandyr in tandyrs"
               :key="tandyr.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- CAKES -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Пирожные</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="cake"
               v-for="cake in cakes"
               :key="cake.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- BAKLAVAS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Баклава</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="baklava"
               v-for="baklava in baklavas"
               :key="baklava.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- COOCKIES -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Печенье</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="coockie"
               v-for="coockie in coockies"
               :key="coockie.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- BREADS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Хлеб</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="bread"
               v-for="bread in breads"
               :key="bread.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- BAKERYS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Выпечка</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="bakery"
               v-for="bakery in bakerys"
               :key="bakery.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- PIES -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Торты</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="pie"
               v-for="pie in pies"
               :key="pie.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- ICE CREAMS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Мороженое</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="iceCream"
               v-for="iceCream in iceCreams"
               :key="iceCream.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- HOT DRINKS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Горячие напитки</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="hotDrink"
               v-for="hotDrink in hotDrinks"
               :key="hotDrink.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- COCKTAILS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Коктейли</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="cocktail"
               v-for="cocktail in cocktails"
               :key="cocktail.id"
            ></v-dish-item>
         </ul>
      </div>
      <!-- DRINKS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Напитки</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="drink"
               v-for="drink in drinks"
               :key="drink.id"
            ></v-dish-item>
         </ul>
      </div>

      <!-- OTHERS -->
      <div class="UpdateDishes__dishes-view">
         <h3 class="UpdateDishes__dishes-header">Другое</h3>
         <ul class="UpdateDishes__dishes-list">
            <v-dish-item
               :dish="other"
               v-for="other in others"
               :key="other.id"
            ></v-dish-item>
         </ul>
      </div>

      <div class="UpdateDishes__updating-container" v-if="updating">
         <img
            class="UpdateDishes__loading"
            src="../../assets/loading.gif"
            alt=""
         />
         <p class="UpdateDishes__loading-text">
            Изменения сохнаняются.<br />Пожалуйста не перезагужайте страницу.
         </p>
      </div>
      <div @click="openNewDishModal()" class="UpdateDishes__new-dish-icon">
         <font-awesome-icon icon="plus" />
      </div>
      <v-update-modal v-if="modalIsOpen"></v-update-modal>
      <v-new-dish-modal v-if="newDishModalIsOpen"></v-new-dish-modal>
   </div>
</template>

<script>
import { mapState } from "vuex";
import DishItem from "./DishItem";
import UpdateModal from "./UpdateModal";
import NewDishModal from "./NewDishModal";

export default {
   components: {
      "v-dish-item": DishItem,
      "v-update-modal": UpdateModal,
      "v-new-dish-modal": NewDishModal
   },
   computed: mapState({
      soups: state => state.dishes.dishes.soups,
      mainDishes: state => state.dishes.dishes.mainDishes,
      doners: state => state.dishes.dishes.doners,
      pizzas: state => state.dishes.dishes.pizzas,
      garnirs: state => state.dishes.dishes.garnirs,
      salats: state => state.dishes.dishes.salats,
      shashlyks: state => state.dishes.dishes.shashlyks,
      breakfasts: state => state.dishes.dishes.breakfasts,
      tandyrs: state => state.dishes.dishes.tandyrs,
      cakes: state => state.dishes.dishes.cakes,
      baklavas: state => state.dishes.dishes.baklavas,
      coockies: state => state.dishes.dishes.coockies,
      breads: state => state.dishes.dishes.breads,
      bakerys: state => state.dishes.dishes.bakerys,
      pies: state => state.dishes.dishes.pies,
      iceCreams: state => state.dishes.dishes.iceCreams,
      hotDrinks: state => state.dishes.dishes.hotDrinks,
      cocktails: state => state.dishes.dishes.cocktails,
      drinks: state => state.dishes.dishes.drinks,
      doners: state => state.dishes.dishes.doners,
      others: state => state.dishes.dishes.others,

      updating: state => state.updateDishes.updating,
      modalIsOpen: state => state.updateDishes.modalIsOpen,
      newDishModalIsOpen: state => state.updateDishes.newDishModalIsOpen
   }),
   created() {
      this.$store.dispatch("getDishes");
   },
   methods: {
      openNewDishModal: function() {
         this.$store.dispatch("openNewDishModal");
      }
   }
};
</script>

<style scoped>
.container {
   padding-bottom: 4rem;
}
.title {
   text-align: center;
   font-weight: bold;
   font-size: 2.3rem;
   margin: 0.5rem 0;
}
.UpdateDishes__dishes-header {
   text-align: center;
   font-size: 2rem;
   margin-bottom: 1rem;
   font-weight: normal;
}
.UpdateDishes__dishes-list {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   margin-bottom: 3rem;
}
.UpdateDishes__new-dish-icon {
   position: fixed;
   bottom: 4rem;
   right: 2rem;
   cursor: pointer;
   background: #ffcfcf;
   width: 4rem;
   height: 4rem;
   border-radius: 50%;
   font-size: 2rem;
   color: #740000;
   display: flex;
   align-items: center;
   justify-content: center;
   border: 1px solid rgba(225, 74, 74, 0.3);
}
.UpdateDishes__new-dish-icon:hover {
   background: #ffe0e0;
   -webkit-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   -moz-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
}
.UpdateDishes__updating-container {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   z-index: 2;
}
.UpdateDishes__loading {
   width: 5rem;
}
.UpdateDishes__loading-text {
   font-size: 1.5rem;
   color: #fff;
   text-align: center;
}
</style>
