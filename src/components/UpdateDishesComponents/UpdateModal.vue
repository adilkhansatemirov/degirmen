<template>
   <div class="modal-background" @click="closeUpdateDishModal($event)">
      <div class="modal-container">
         <div v-if="dishToUpdate">
            <h3 class="modal-header">Изменить блюдо</h3>
            <form @submit.prevent="updateDish()">
               <div class="input-item">
                  <label for="dishName">Название блюда</label>
                  <input
                     type="text"
                     name="dishName"
                     id="dishName"
                     :value="dishToUpdate.name"
                     ref="dishName"
                  />
               </div>
               <div class="input-item" v-show="sellingHalf">
                  <label for="dishPortionSmall">Название малой порции</label>
                  <input
                     type="text"
                     name="dishPortionSmall"
                     id="dishPortionSmall"
                     :value="dishToUpdate.portionSmall"
                     ref="dishPortionSmall"
                  />
               </div>
               <div class="input-item" v-show="sellingHalf">
                  <label for="dishCostSmall">Цена малой порции</label>
                  <input
                     type="number"
                     name="dishCostSmall"
                     id="dishCostSmall"
                     :value="dishToUpdate.costSmall"
                     ref="dishCostSmall"
                  />
               </div>
               <div class="input-item checkbox-item">
                  <input
                     type="checkbox"
                     name="sellingHalf"
                     id="sellingHalf"
                     v-model="sellingHalf"
                  />
                  <label class="checkbox-label" for="sellingHalf"
                     >Малая порция</label
                  >
               </div>
               <div class="input-item">
                  <label for="dishPortionStand">Название большой порции</label>
                  <input
                     type="text"
                     name="dishPortionStand"
                     id="dishPortionStand"
                     :value="dishToUpdate.portionStand"
                     ref="dishPortionStand"
                  />
               </div>
               <div class="input-item">
                  <label for="dishCostStand">Цена большой порции</label>
                  <input
                     type="number"
                     name="dishCostStand"
                     id="dishCostStand"
                     :value="dishToUpdate.costStand"
                     ref="dishCostStand"
                  />
               </div>
               <div class="button-group">
                  <button type="submit">
                     Сохранить
                  </button>
                  <button type="button" class="close-modal-button">
                     Отмена
                  </button>
               </div>
            </form>
         </div>
         <div v-else>
            Загрузка
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         sellingHalf: false
      };
   },
   created() {
      this.sellingHalf = this.dishToUpdate.costSmall !== 0;
   },
   computed: mapState({
      dishToUpdate: state => state.updateDishes.dishToUpdate
   }),
   methods: {
      updateDish: function() {
         const updatedName = this.$refs.dishName.value;
         const updatedPortionSmall = this.$refs.dishPortionSmall.value;
         const updatedPortionStand = this.$refs.dishPortionStand.value;
         const updatedCostSmall = parseInt(this.$refs.dishCostSmall.value);
         const updatedCostStand = parseInt(this.$refs.dishCostStand.value);

         if (
            updatedName === this.dishToUpdate.name &&
            updatedPortionSmall === this.dishToUpdate.portionSmall &&
            updatedPortionStand === this.dishToUpdate.portionStand &&
            updatedCostSmall === this.dishToUpdate.costSmall &&
            updatedCostStand === this.dishToUpdate.costStand
         ) {
            alert("Блюдо не изменено");
            return;
         }
         const updatedDish = {
            ...this.dishToUpdate,
            oldName: this.dishToUpdate.name,
            name: this.$refs.dishName.value,
            costSmall: this.sellingHalf ? this.$refs.dishCostSmall.value : 0,
            costStand: this.$refs.dishCostStand.value,
            portionSmall: this.$refs.dishPortionSmall.value,
            portionStand: this.$refs.dishPortionStand.value
         };
         this.$store.dispatch("updateDish", updatedDish);
      },
      closeUpdateDishModal: function(event) {
         if (
            event.target.className == "modal-background" ||
            event.target.className == "close-modal-button"
         ) {
            this.$store.dispatch("closeUpdateDishModal");
         }
      }
   }
};
</script>

<style>
.modal-background {
   width: 100%;
   height: 100%;
   position: fixed;
   background: rgba(0, 0, 0, 0.4);
   top: 0;
   left: 0;
   z-index: 2;
   display: flex;
   justify-content: center;
   align-items: center;
}
.modal-container {
   padding: 1rem;
   width: 25rem;
   background: rgb(255, 243, 243);
   font-size: 1.2rem;
}
.modal-header {
   text-align: center;
   margin-bottom: 0.5rem;
}
.input-item {
   display: flex;
}
.input-item label {
   flex: 1;
}
.input-item input {
   flex-basis: 10rem;
   margin: 0.5rem auto;
   font-size: 1rem;
}
input[type="checkbox"] {
   display: none;
}
.checkbox-label {
   width: 100%;
   text-align: right;
   padding: 0.5rem 0;
   font-size: 1rem;
}
.checkbox-label:after {
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
.checkbox-label:hover:after {
   background: #ffe9e9;
}
input[type="checkbox"]:checked + .checkbox-label:after {
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
