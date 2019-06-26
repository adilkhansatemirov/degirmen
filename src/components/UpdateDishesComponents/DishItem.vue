<template>
   <li class="dish-item">
      <div class="dish-info">
         <div class="dish-name">
            {{ dish.name }}
         </div>
         <!-- <div class="dish-prop" v-if="dish.costSmall !== 0"> -->
         <div class="dish-prop">
            {{ dish.portionSmall }}: {{ dish.costSmall }}
         </div>
         <div class="dish-prop">
            {{ dish.portionStand }}: {{ dish.costStand }}
         </div>
      </div>
      <div class="dish-actions">
         <button>Изменить</button>
         <button>Удалить</button>
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
   }
};
</script>

<style scoped>
.dish-item {
   border: 1px solid black;
   width: 15rem;
   margin-bottom: 0.5rem;
}
.dish-name {
   text-align: center;
}
.dish-actions {
   display: flex;
   justify-content: space-around;
}
</style>
