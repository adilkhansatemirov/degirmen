<template>
   <li class="dish-item">
      <div class="dish-info">
         <div class="dish-name">
            {{ dish.name }}
         </div>
         <div class="dish-body">
            <div class="dish-prop" v-if="dish.costSmall !== 0">
               {{ dish.portionSmall }}: {{ dish.costSmall }}
            </div>
            <div class="dish-prop">
               {{ dish.portionStand }}: {{ dish.costStand }}
            </div>
         </div>
         <div class="dish-actions">
            <button @click="openUpdateDishModal()">Изменить</button>
            <button @click="deleteDish()">Удалить</button>
         </div>
      </div>
   </li>
</template>

<script>
export default {
   props: {
      dish: {
         type: Object,
         required: true
      }
   },
   methods: {
      openUpdateDishModal: function() {
         this.$store.dispatch("openUpdateDishModal", this.dish);
      },
      deleteDish: function() {
         this.$store.dispatch("deleteDish", this.dish);
      }
   }
};
</script>

<style scoped>
.dish-item {
   border: 1px solid rgba(143, 143, 143, 0.418);
   border-radius: 0.5rem;
   width: 15rem;
   margin: 0 0.3rem 1rem;
}
.dish-info {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 100%;
}
.dish-name {
   text-align: center;
   padding: 0.1rem 0.5rem;
   background: rgb(255, 166, 166);
}
.dish-body {
   text-align: center;
}
.dish-prop {
   margin-bottom: 0.3rem;
}
.dish-actions {
   display: flex;
   justify-content: space-around;
}
.dish-actions button {
   padding: 0.2rem 0.7rem;
   color: #000;
   border: 1px solid rgb(255, 166, 166);
   background: #fff4f4;
   width: 100%;
   margin: 0.2rem;
   text-align: center;
   border-radius: 0.2rem;
   cursor: pointer;
}
</style>
