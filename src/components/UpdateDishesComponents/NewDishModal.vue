<template>
   <div>
      <div
         class="NewDishModal__modal-background"
         @click="closeNewDishModal($event)"
      >
         <div class="NewDishModal__modal-body">
            <form @submit.prevent="createNewDish()">
               <h3 class="NewDishModal__modal-header">
                  Новое блюдо
               </h3>
               <div class="NewDishModal__input-group">
                  <label
                     for="NewDishModal__dish-name"
                     class="NewDishModal__input-label"
                     >Название блюда</label
                  >
                  <input
                     type="text"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-name"
                     v-model="dishName"
                  />
               </div>
               <div class="NewDishModal__input-group">
                  <label
                     for="NewDishModal__dish-type"
                     class="NewDishModal__input-label"
                     >Тип блюда</label
                  >
                  <select
                     v-model="dishType"
                     type="text"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-type"
                     ref="dish-name"
                     required
                  >
                     <option
                        v-for="type in typesMap"
                        :key="type.nameEng"
                        :value="type.nameEng"
                        >{{ type.nameRus }}</option
                     >
                  </select>
               </div>
               <div class="NewDishModal__input-group">
                  <input
                     type="checkbox"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-check-small-portion"
                     v-model="checkSmallPortion"
                  />
                  <label
                     for="NewDishModal__dish-check-small-portion"
                     class="NewDishModal__checkbox-label"
                     >Малая порция</label
                  >
               </div>
               <div class="NewDishModal__input-group" v-if="checkSmallPortion">
                  <label
                     for="NewDishModal__dish-portion-small"
                     class="NewDishModal__input-label"
                     >Название малой порции</label
                  >
                  <input
                     type="text"
                     placeholder="(половина)"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-portion-small"
                     v-model="portionSmall"
                  />
               </div>
               <div class="NewDishModal__input-group" v-if="checkSmallPortion">
                  <label
                     for="NewDishModal__dish-cost-small"
                     class="NewDishModal__input-label"
                     >Цена малой порции</label
                  >
                  <input
                     type="number"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-cost-small"
                     v-model.number="costSmall"
                  />
               </div>
               <div class="NewDishModal__input-group">
                  <label
                     for="NewDishModal__dish-portion-stand"
                     class="NewDishModal__input-label"
                     >Название большой порции</label
                  >
                  <input
                     type="text"
                     placeholder="(порция)"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-portion-stand"
                     v-model="portionStand"
                  />
               </div>
               <div class="NewDishModal__input-group">
                  <label
                     for="NewDishModal__dish-cost-stand"
                     class="NewDishModal__input-label"
                     >Цена большой порции</label
                  >
                  <input
                     type="number"
                     class="NewDishModal__input-input"
                     id="NewDishModal__dish-cost-stand"
                     v-model.number="costStand"
                  />
               </div>
               <div class="button-group">
                  <button type="submit">
                     Сохранить
                  </button>
                  <button
                     @click="closeNewDishModal($event)"
                     class="close-modal-button"
                     type="button"
                  >
                     Отмена
                  </button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         dishName: "",
         dishType: "",
         checkSmallPortion: true,
         portionSmall: "",
         portionStand: "",
         costSmall: 0,
         costStand: 0,
         typesMap: [
            {
               nameRus: "Выпечка",
               nameEng: "bakerys"
            },
            {
               nameRus: "Баклава",
               nameEng: "baklavas"
            },
            {
               nameRus: "Хлеб",
               nameEng: "breads"
            },
            {
               nameRus: "Завтрак",
               nameEng: "breakfasts"
            },
            {
               nameRus: "Пирожное",
               nameEng: "cakes"
            },
            {
               nameRus: "Коктейль",
               nameEng: "cocktails"
            },
            {
               nameRus: "Печенье",
               nameEng: "coockies"
            },
            {
               nameRus: "Донер",
               nameEng: "doners"
            },
            {
               nameRus: "Холодный напиток",
               nameEng: "drinks"
            },
            {
               nameRus: "Гарнир",
               nameEng: "garnirs"
            },
            {
               nameRus: "Горячий напиток",
               nameEng: "hotDrinks"
            },
            {
               nameRus: "Мороженое",
               nameEng: "iceCreams"
            },
            {
               nameRus: "Горячее блюдо",
               nameEng: "mainDishes"
            },
            {
               nameRus: "Торты",
               nameEng: "pies"
            },
            {
               nameRus: "Пицца",
               nameEng: "pizzas"
            },
            {
               nameRus: "Салат",
               nameEng: "salats"
            },
            {
               nameRus: "Шашлык",
               nameEng: "shashlyks"
            },
            {
               nameRus: "Суп",
               nameEng: "soups"
            },
            {
               nameRus: "Тандыр",
               nameEng: "tandyrs"
            }
         ]
      };
   },
   computed: mapState({}),
   methods: {
      createNewDish: function() {
         const newDish = {
            name: this.dishName,
            portionSmall: this.checkSmallPortion ? this.portionSmall : "(нет)",
            portionStand: this.portionStand,
            costSmall: this.checkSmallPortion ? this.costSmall : 0,
            costStand: this.costStand,
            type: this.dishType
         };
         this.$store.dispatch("createDish", newDish);
         this.$store.dispatch("closeNewDishModal");
      },
      closeNewDishModal: function(event) {
         if (
            event.target.className === "NewDishModal__modal-background" ||
            event.target.className === "close-modal-button"
         ) {
            this.$store.dispatch("closeNewDishModal");
         }
      }
   }
};
</script>

<style scoped>
.NewDishModal__modal-background {
   position: fixed;
   width: 100%;
   height: 100%;
   left: 0;
   top: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1;
}
.NewDishModal__modal-body {
   background: rgb(255, 230, 230);
   padding: 1.5rem;
}
.NewDishModal__modal-header {
   margin-bottom: 1rem;
}
.NewDishModal__input-group {
   display: flex;
   margin-bottom: 1rem;
}
.NewDishModal__input-label {
   flex-grow: 1;
}
.NewDishModal__input-input {
   margin-left: 1rem;
   width: 10rem;
}
input[type="checkbox"] {
   display: none;
}
.NewDishModal__checkbox-label {
   width: 100%;
   text-align: right;
   padding: 0.5rem 0;
   font-size: 1rem;
}
.NewDishModal__checkbox-label:after {
   content: "";
   width: 0.8rem;
   height: 0.8rem;
   padding: 0rem 0.15rem 0.3rem 0.15rem;
   display: inline-block;
   border: 1px solid #df6363;
   vertical-align: middle;
   margin-left: 0.4rem;
   border-radius: 0.2rem;
}
.NewDishModal__checkbox-label:hover:after {
   background: #ffe9e9;
}
input[type="checkbox"]:checked + .NewDishModal__checkbox-label:after {
   content: "\2713";
   font-size: 0.7rem;
   font-weight: bold;
   color: #9a2928;
   text-align: center;
}
.button-group {
   display: flex;
   justify-content: space-around;
}
.button-group button {
   padding: 0.2rem 0.7rem;
   color: #000;
   border: 1px solid rgb(255, 166, 166);
   background: #fff4f4;
   width: 100%;
   margin: 0.2rem;
   text-align: center;
   border-radius: 0.2rem;
   cursor: pointer;
   position: relative;
}
</style>
