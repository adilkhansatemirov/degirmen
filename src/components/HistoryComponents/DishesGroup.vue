<template>
   <div>
      <!-- SOUPS -->
      <ul class="dishes-list">
         <li class="dish-item">
            <p class="dish-name">{{ sectionName }}</p>
            <p class="dish-counter">{{ portionSmall }}</p>
            <p class="dish-counter">{{ portionStand }}</p>
            <p class="dish-counter">Сумма</p>
         </li>
         <li
            :class="returnClass(dish)"
            class="dish-item"
            v-for="dish in dishes"
            :key="dish.key"
         >
            <p class="dish-name">{{ dish.name }}</p>
            <p class="dish-counter" v-if="dish.costSmall === 0"></p>
            <p class="dish-counter" v-if="dish.costSmall !== 0">
               {{ dish.counterSmall }} ({{ dish.costSmall }}тг)
            </p>
            <p class="dish-counter">
               {{ dish.counterStand }} ({{ dish.costStand }}тг)
            </p>
            <p class="dish-counter">{{ dish.counterMoney }}</p>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   props: {
      dishes: {
         type: Array
      },
      sectionName: {
         type: String
      },
      portionSmall: {
         type: String,
         default: ""
      },
      portionStand: {
         type: String,
         default: ""
      }
   },
   methods: {
      returnClass: function(dish) {
         let className = "dish-item";
         if (dish.counterSmall == 0 && dish.counterStand == 0) {
            className += " not-taken";
         }
         if (dish.name.includes("(с сыром)")) {
            className += " margin";
         }
         return className;
      }
   },
   created() {
      console.log(this.dishes);
   }
};
</script>

<style scoped>
.dishes-list {
   margin-bottom: 1.5rem;
}
.dish-item {
   display: flex;
   border-bottom: 1px solid rgba(170, 22, 22, 0.158);
   margin-bottom: 0.1rem;
}
.not-taken {
   opacity: 0.5;
}
.dish-name {
   flex: 3;
}
.dish-counter {
   text-align: right;
   flex: 1;
}
</style>
