<template>
  <div>
    <div class="dish-item">
      <p class="dish-name">{{dish.dish.name}}</p>
      <p class="dish-cost">{{dish.dish.cost}}</p>
      <p class="dish-amount">{{dish.amount}}</p>
      <p class="dish-total">{{dish.amount * dish.dish.cost}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dish: {
      type: Object
    }
  }
};
</script>

<style scoped>
.dish-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(211, 43, 43, 0.185);
  padding-bottom: 0.1rem;
}
.dish-name {
  flex: 3;
}
.dish-cost,
.dish-amount,
.dish-total {
  flex: 1;
  text-align: right;
}
</style>
