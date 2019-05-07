<template>
  <div class="root">
    <div class="background" ref="basketBackground" @click="closeBasket($event)">
      <div class="modal-box">
        <div class="slide-container" ref="slideContainer">
          <div class="slide-item">
            <h3>Доставка</h3>
            <form @submit.prevent="saveOrder()">
              <div class="address-input">
                <label for="address">Адрес</label>
                <input type="text" ref="address" name="address" id="address" required>
              </div>
              <div class="button-group">
                <button class="button" type="submit">
                  Принять заказ
                  <font-awesome-icon icon="utensils"/>
                </button>
                <a class="button" @click="returnToOrders()">
                  Назад
                  <font-awesome-icon icon="arrow-right"/>
                </a>
              </div>
            </form>
          </div>

          <div class="slide-item">
            <div class="basket-empty" v-if="basket.length == 0">Корзина пуста</div>
            <h3>Заказ</h3>
            <div v-if="basket.length != 0" class="button-group">
              <a class="button" @click="moveToDelivery()">
                Доставка
                <font-awesome-icon icon="car-side"/>
              </a>
              <a class="button" @click="moveToCafe()">
                Кафе
                <font-awesome-icon icon="store-alt"/>
              </a>
            </div>
            <ul class="dish-list">
              <li class="dish-item" v-for="dish in basket" :key="dish.key">
                <p class="dish-name">{{dish.dish.name}}</p>
                <p class="dish-cost">{{dish.dish.cost}}</p>
                <p class="dish-amount">
                  <span @click="amountChange(dish, -1)">
                    <font-awesome-icon icon="minus"/>
                  </span>
                  {{dish.amount}}
                  <span @click="amountChange(dish, 1)">
                    <font-awesome-icon icon="plus"/>
                  </span>
                </p>
                <p class="dish-total">{{dish.amount * dish.dish.cost}}</p>
              </li>
            </ul>
          </div>

          <div class="slide-item">
            <h3>Кафе</h3>
            <div class="takeaway-holder">
              <input type="checkbox" name="takeaway" v-model="takeaway" id="takeaway">
              <label class="takeaway-check" for="takeaway">С собой</label>
            </div>
            <form @submit.prevent="saveOrder()" class="cafe-form">
              <div v-if="!takeaway">
                <div class="waiter-name">
                  <label for="waiter-name">Имя офицанта</label>
                  <select v-model="waiterName" name="waiterName" id="waiterName" required>
                    <option v-for="waiterName in waitersNames" :key="waiterName.key">{{waiterName}}</option>
                  </select>
                </div>
                <div class="table">
                  <label for="table">Столик</label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    ref="table"
                    name="table"
                    id="table"
                    required
                  >
                </div>
              </div>
              <label for="discount">Скидка</label>
              <input
                type="number"
                min="0"
                max="50"
                ref="discount"
                name="discount"
                id="discount"
                required
              >
              <div class="button-group">
                <a class="button" @click="returnToOrders()">
                  <font-awesome-icon icon="arrow-left"/>К заказам
                </a>
                <button class="button" type="submit">
                  Принять заказ
                  <font-awesome-icon icon="utensils"/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebase-init";

export default {
  props: {
    basket: {
      type: Array
    },
    docToUpdate: {
      type: String,
      default: "not assigned"
    }
  },
  data() {
    return {
      slideContainer: null,
      width: null,
      position: null,
      waiterMoney: 0,
      takeaway: false,
      waitersNames: ["Арман", "Бекзат"],
      waiterName: null
    };
  },
  methods: {
    isHalf: function(dish) {
      if (dish.cost == dish.costSmall) {
        return true;
      }
      return false;
    },
    amountChange: function(dish, number) {
      dish.amount += number;
      if (dish.amount == 0) {
        this.deleteDish(dish);
      }
    },
    deleteDish: function(dish) {
      for (let i = 0; i < this.basket.length; i++) {
        if (dish.dish.name == this.basket[i].dish.name) {
          console.log(dish.dish.name);
          console.log(this.basket[i].dish.name);
          this.basket.splice(i, 1);
          break;
        }
      }
    },
    closeBasket: function(event) {
      if (event.target == this.$refs.basketBackground) {
        // document.querySelector(".background").style.display = "none";
        this.$emit("closeBasket");
      }
    },
    moveToDelivery: function() {
      this.slideContainer.style.transition = "transform 0.4s ease-in-out";
      this.slideContainer.style.transform = `translateX(${0}px)`;
      this.position = "delivery";
    },
    moveToCafe: function() {
      this.slideContainer.style.transition = "transform 0.4s ease-in-out";
      this.slideContainer.style.transform = `translateX(${-2 * this.width}px)`;
      this.position = "cafe";
    },
    returnToOrders: function() {
      this.slideContainer.style.transition = "transform 0.4s ease-in-out";
      this.slideContainer.style.transform = `translateX(${-this.width}px)`;
      this.position = null;
    },
    saveOrder: function() {
      const orderToPost = {
        time: new Date(),
        total: this.countTotal(),
        dishes: this.basket
      };
      if (this.position == "delivery") {
        orderToPost.address = this.$refs.address.value;
        orderToPost.type = "Доставка";
      } else if (this.position == "cafe") {
        if (!this.takeaway) {
          orderToPost.waiterName = this.waiterName;
          orderToPost.table = this.$refs.table.value;
        }
        orderToPost.takeaway = this.takeaway;
        orderToPost.discount = this.$refs.discount.value;
        orderToPost.type = "Кафе";
      }
      console.log(orderToPost);

      if (this.docToUpdate == "not assigned") {
        //if new order
        db.collection("currentOrders")
          .add(orderToPost)
          .then(docRef => {
            console.log(docRef);
          });
      } else {
        //if update order
        db.collection("currentOrders")
          .doc(this.docToUpdate)
          .set(orderToPost)
          .then(docRef => {
            console.log("written");
          });
        console.log(this.basket);
      }
      this.$router.push("/orders");
    },
    countTotal: function() {
      let total = 0;
      for (let i = 0; i < this.basket.length; i++) {
        if (this.isHalf(this.basket[i].dish)) {
          total += this.basket[i].dish.costSmall * this.basket[i].amount;
        } else {
          total += this.basket[i].dish.costStand * this.basket[i].amount;
        }
      }
      return total;
    }
  },
  mounted() {
    //adjusting slider
    this.slideContainer = this.$refs.slideContainer;
    this.width = this.slideContainer.offsetWidth;
    this.slideContainer.style.transform = `translateX(${-this.width}px)`;

    //if entered in update order
    if (this.docToUpdate != "not assigned") {
      db.collection("currentOrders")
        .doc(this.docToUpdate)
        .get()
        .then(doc => {
          if (doc.data().type == "Доставка") {
            this.$refs.address.value = doc.data().address;
          } else {
            if (doc.data().takeaway) {
              this.takeaway = doc.data().takeaway;
            } else {
              this.waiterName = doc.data().waiterName;
              this.$refs.table.value = doc.data().table;
            }
            this.$refs.discount.value = doc.data().discount;
          }
        });
    }
    // db.collection("history")
    //   .doc("Today")
    //   .get()
    //   .then(doc => {
    //     for (let i = 0; i < doc.data().waitersMoney.length; i++) {
    //       this.waitersNames.push(doc.data().waitersMoney[i].waiterName);
    //     }
    //   });
  }
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  width: 70%;
  height: 50%;
  border: 3px solid #4d0a0a;
  color: #4d0a0a;
  overflow: hidden;
}
.slide-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.slide-item {
  min-width: 100%;
  position: relative;
  background: #ffaeae;
  overflow: auto;
}
form {
  position: relative;
}
.button-group {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 1rem 0;
  z-index: 5;
}
button {
  font-family: "Oswald", sans-serif;
  font-size: 1rem;
  color: #4d0a0a;
}
.button {
  border: 1px solid #680a0a3b;
  border-radius: 0.2rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  flex: 1;
  text-align: center;
  margin: 0 0.2rem;
  background: #fdc7c7;
  user-select: none;
}
.button:hover {
  background: #ffd8d8;
  -webkit-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
  -moz-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
  box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
}
.button:active {
  background: #ffbbbb;
}
/* Main slide */
.basket-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  opacity: 0.5;
}
h3 {
  font-size: 1.5rem;
  text-align: center;
  font-weight: lighter;
}
.dish-list {
  padding: 0 0.5rem;
}
.dish-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #b8676744;
  margin-bottom: 0.3rem;
}
.dish-name {
  flex: 3;
}
.dish-cost {
  flex: 1;
  text-align: right;
}
.dish-amount {
  flex: 1;
  text-align: right;
}
.dish-amount span {
  font-size: 1.1rem;
  margin: 0 0.2rem;
}
.dish-amount span:hover {
  color: #db0404;
}
.dish-total {
  flex: 1;
  text-align: right;
}
.dish-total,
.dish-amount,
.dish-cost {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
/* Delivery slide*/
.address-input {
  margin-top: 1rem;
  display: flex;
}
.address-input label {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  display: block;
}
.address-input input {
  margin: 0 0.5rem;
  padding: 0.2rem;
  flex: 1;
  border: none;
  font-family: "Oswald", sans-serif;
  letter-spacing: 1px;
  font-size: 1rem;
  border-radius: 0.2rem;
}
/* Cafe slide */
input[type="checkbox"] {
  display: none;
}
.takeaway-holder {
  margin: 1rem 0;
  text-align: center;
}
.takeaway-check {
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
  font-size: 1.3rem;
}
.takeaway-check:before {
  content: "";
  width: 1.3rem;
  height: 1.3rem;
  display: inline-block;
  border: 1px solid #df6363;
  vertical-align: middle;
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
  border-radius: 0.2rem;
}
.takeaway-check:hover:before {
  background: #ffe9e9;
}
input[type="checkbox"]:checked + .takeaway-check:before {
  content: "\2713";
  font-size: 1rem;
  font-weight: bold;
  color: #9a2928;
  text-align: center;
}
.cafe-form {
  text-align: center;
}
select {
  display: block;
}
.cafe-form input,
select {
  margin: 0 auto;
  width: 30%;
  padding: 0.2rem;
  border-radius: 0.2rem;
  border: none;
  margin-bottom: 0.5rem;
}
.cafe-form label {
  font-size: 1.2rem;
}
@media (max-width: 900px) {
  .modal-box {
    width: 80%;
  }
}
@media (max-width: 800px) {
  .modal-box {
    width: 90%;
    height: 75%;
  }
  .dish-name {
    flex: 2;
  }
}
</style>