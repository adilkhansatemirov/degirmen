<template>
  <div>
    <span @click="openBasket()" ref="basket" class="basket">
      <div class="basket-purchases-inner">
        <div class="basket-holder">
          <font-awesome-icon icon="shopping-basket"/>
        </div>
      </div>
      <span>{{ countDishes() }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    basket: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    openBasket: function() {
      this.$emit("openBasket");
    },
    spinBasket: function() {
      const basketElement = this.$refs.basket;
      basketElement.style.animation = "spin 0.5s ease";
      basketElement.addEventListener("animationend", () => {
        basketElement.style.animation = "";
      });
    },
    countDishes: function(){
      let counter = 0;
      for (let i = 0; i < this.basket.length; i++) {
        counter += this.basket[i].amount;
      }
      return counter;
      
    }
  }
};
</script>

<style scoped>
.basket {
  position: fixed;
  z-index: 2;
  width: 6rem;
  height: 4rem;
  display: flex;
  font-size: 1.7rem;
  justify-content: center;
  align-items: center;
  right: 1.5rem;
  bottom: 3.5rem;
  cursor: pointer;
  border-radius: 1rem;
  background: rgb(255, 216, 216);
  border: 1px solid rgba(225, 74, 74, 0.3);
}
.basket:hover{
  background: #ffe0e0;
  -webkit-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
  -moz-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
  box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
}
.basket-purchases-inner .basket-holder {
  color: #7e1412;
}
.basket span {
  margin-left: 0.5rem;
  color: #7e1412;
  font-size: 1.4rem;
}
</style>


