<template>
  <div>
    <div class="container">
      <h2 class="title">Заказы</h2>
      <!-- TEXTFIELD TO UNLOCK ADMIN PRIVILIGES -->
      <div class="unlock-save-order-holder" v-if="adminMode">
        <p class="unlock-save-order-message">Введите пароль чтобы сохранить заказ или закрыть кассу</p>
        <input
          class="unlock-save-order-input"
          ref="passwordToSaveInput"
          placeholder="пароль"
          type="password"
          v-model="passwordInput"
        >
      </div>

      <div v-if="adminMode">
        <a
          class="close-cashier-button"
          @click="clearHistory()"
          v-if="orders.length==0 && passwordCorrect == passwordInput"
        >Закрыть кассу на сегодня</a>
        <a
          class="close-cashier-button disabled"
          v-if="orders.length==0 && passwordCorrect != passwordInput"
        >Закрыть кассу на сегодня</a>
      </div>

      <ul class="orders-list">
        <li class="order-item" v-for="order in orders" :key="order.id">
          <div class="order-header">
            <p class="order-type">{{order.type}}</p>
            <p class="order-time">{{getTime(order)}}</p>
          </div>
          <div class="order-body">
            <v-order-info :order="order"></v-order-info>

            <li v-for="dish in order.dishes" :key="dish.key">
              <v-dish-item :dish="dish"></v-dish-item>
            </li>

            <v-order-count-money :order="order"></v-order-count-money>

            <div class="button-group">
              <a class="button" @click="updateOrder(order)">Изменить</a>
              <a class="button" @click="cancelOrder(order)">Отменить</a>
              <div v-if="adminMode">
                <a
                  class="button"
                  v-if="passwordCorrect == passwordInput"
                  @click="archiveOrder(order)"
                >Сохранить</a>
                <a class="button disabled" v-if="passwordCorrect != passwordInput">Сохранить</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebase-init";
import firebase from "firebase/app";
import DishItem from "./DishItem.vue";
import OrderInfo from "./OrderInfo.vue";
import OrderCountMoney from "./OrderCountMoney.vue";

export default {
  components: {
    "v-order-info": OrderInfo,
    "v-dish-item": DishItem,
    "v-order-count-money": OrderCountMoney
  },
  data() {
    return {
      orders: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      saveOrderShow: false,
      passwordInput: "",
      passwordCorrect: "hello",
      adminMode: false
    };
  },
  methods: {
    getTime: function(order) {
      let time = order.time.toString().split(" ")[4];
      time = time.substring(0, time.lastIndexOf(":"));
      return time;
    },
    getMonth: function(order) {
      return this.months[order.time.getMonth()];
    },
    updateOrder: function(order) {
      this.$router.push(`/update/${order.id}`);
    },
    cancelOrder: function(order) {
      db.collection("currentOrders")
        .doc(order.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
    },
    archiveOrder: function(order) {
      this.passwordInput = "";
      this.updateHistory(order, "Today");
      this.updateHistory(order, this.getMonth(order));
      this.cancelOrder(order);
    },
    updateHistory: function(order, time) {
      db.collection("history")
        .doc(time)
        .get()
        .then(doc => {
          //get info from database
          let dishes = doc.data().dishes;
          let waitersMoney = doc.data().waitersMoney;
          let deliveryMoney = doc.data().deliveryMoney;
          let discountMoney = doc.data().discountMoney;
          let counterTotal = doc.data().counterTotal;

          //LOOK THROUGH THE ORDER
          if (order.type == "Кафе") {
            //update number of orders and counter money of waiter that took the order
            if (order.discount != 0) {
              discountMoney += order.total - this.countDiscount(order);
            }
            if (!order.takeaway) {
              for (let i = 0; i < waitersMoney.length; i++) {
                if (waitersMoney[i].waiterName == order.waiterName) {
                  waitersMoney[i].numberOfOrders++;
                  waitersMoney[i].counterMoney += this.service(order);
                  break;
                }
              }
            }
          } else {
            //add to delivery money
            deliveryMoney += 300;
          }

          for (let i = 0; i < dishes.length; i++) {
            //dishes in list of history
            for (let j = 0; j < order.dishes.length; j++) {
              //dishes in order
              if (
                dishes[i].name == order.dishes[j].dish.nameDefault &&
                dishes[i].type != "Горячие блюда"
              ) {
                let totalOfDish;
                if (dishes[i].costSmall == order.dishes[j].dish.cost) {
                  dishes[i].counterSmall += order.dishes[j].amount;
                  totalOfDish = dishes[i].costSmall * order.dishes[j].amount;
                } else {
                  dishes[i].counterStand += order.dishes[j].amount;
                  totalOfDish = dishes[i].costStand * order.dishes[j].amount;
                }
                dishes[i].counterMoney += totalOfDish;
                counterTotal += totalOfDish;
              } else if (
                dishes[i].name == order.dishes[j].dish.nameDefault &&
                dishes[i].type == "Горячие блюда"
              ) {
                let totalOfDish;
                if (order.dishes[j].dish.name.includes("(без гарнира)")) {
                  dishes[i].counterSmall += order.dishes[j].amount;
                  totalOfDish = dishes[i].costSmall * order.dishes[j].amount;
                } else {
                  dishes[i].counterStand += order.dishes[j].amount;
                  totalOfDish = dishes[i].costStand * order.dishes[j].amount;
                }
                dishes[i].counterMoney += totalOfDish;
                counterTotal += totalOfDish;
              }
            }
          }

          db.collection("history")
            .doc(time)
            .set({
              dishes,
              waitersMoney,
              deliveryMoney,
              discountMoney,
              counterTotal
            });
        });
    },
    clearHistory: function() {
      db.collection("history")
        .doc("Today")
        .get()
        .then(doc => {
          let dishes = doc.data().dishes;
          let waitersMoney = doc.data().waitersMoney;
          let deliveryMoney = doc.data().deliveryMoney;
          let discountMoney = doc.data().discountMoney;
          let counterTotal = doc.data().counterTotal;

          db.collection("history")
            .doc("Yesterday")
            .set({
              dishes,
              waitersMoney,
              deliveryMoney,
              discountMoney,
              counterTotal
            })
            .then(() => {
              for (let i = 0; i < dishes.length; i++) {
                dishes[i].counterSmall = 0;
                dishes[i].counterStand = 0;
                dishes[i].counterMoney = 0;
              }
              for (let i = 0; i < waitersMoney.length; i++) {
                waitersMoney[i].numberOfOrders = 0;
                waitersMoney[i].counterMoney = 0;
              }

              deliveryMoney = 0;
              discountMoney = 0;
              counterTotal = 0;

              db.collection("history")
                .doc("Today")
                .set({
                  dishes,
                  waitersMoney,
                  deliveryMoney,
                  discountMoney,
                  counterTotal
                });
            });

          // for (let i = 0; i < this.months.length; i++) {
          //   db.collection("history")
          //     .doc(this.months[i])
          //     .set({
          //       dishes,
          //       waitersMoney,
          //       deliveryMoney,
          //       discountMoney,
          //       counterTotal
          //     });
          // }
        });
    },
    allowToSave() {
      return this.$refs.passwordToSaveInput.value == this.passwordToSaveOrder;
    }
  },
  created() {
    db.collection("currentOrders")
      .orderBy("time", "desc")
      .onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
        var source = querySnapshot.metadata.fromCache
          ? "local cache"
          : "server";

        this.orders = [];
        querySnapshot.forEach(doc => {
          const order = {
            id: doc.id,
            dishes: doc.data().dishes,
            time: doc.data().time.toDate(),
            type: doc.data().type,
            total: doc.data().total
          };

          if (doc.data().type == "Доставка") {
            order.address = doc.data().address;
          } else if (doc.data().type == "Кафе") {
            if (!doc.data().takeaway) {
              order.waiterName = doc.data().waiterName;
              order.table = doc.data().table;
            } else {
              order.takeaway = doc.data().takeaway; //true
            }
            order.discount = doc.data().discount;
          }

          this.orders.push(order);
        });
      });
    //setting adminMode
    let { uid } = firebase.auth().currentUser;
    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        this.adminMode = doc.data().status !== "Офицант";
      });
  }
};
</script>

<style scoped>
.container {
  padding-bottom: 4rem;
}
.title {
  text-align: center;
  color: #4e0000;
  font-weight: lighter;
  font-size: 1.7rem;
  margin: 0.5rem 0;
}
.order-item {
  color: #6b0606;
  border: 2px solid #af3d3d;
  background: #ffd5d5;
  border-radius: 0.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.3rem;
}
.order-header {
  display: flex;
  justify-content: space-between;
  background: #a02a2a;
  color: #ffffff;
  padding: 0 0.4rem;
  align-items: center;
}
.order-info {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}
.order-body {
  padding: 0 0.4rem;
}
.order-type {
  font-size: 1.5rem;
}
.button-group {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
}
.button {
  border: 1.1px solid #6d00002c;
  border-radius: 0.2rem;
  padding: 0 0.8rem;
  cursor: pointer;
  flex: 1;
  text-align: center;
  margin: 0 0.2rem;
  background: #ffc0c0;
  user-select: none;
}
.button:hover {
  background: #ff9a9a;
  color: #380000;
}
.button:active {
  background: #ff6767;
}
.close-cashier-button {
  padding: 0.2rem 0.7rem;
  color: #880000;
  border: 1.2px solid #880000;
  background: #fff4f4;
  width: 100%;
  margin: 0.5rem auto 0;
  text-align: center;
  border-radius: 0.2rem;
  cursor: pointer;
}
.close-cashier-button:hover {
  background: #ffffff;
}
.disabled {
  background: #b4aaaa;
  color: #756969;
}
.disabled:hover {
  background: #b4aaaa;
  color: #756969;
}
.unlock-save-order-holder {
  display: flex;
  margin-bottom: 0.5rem;
}
.unlock-save-order-message {
  text-align: center;
  font-size: 0.9rem;
  padding: 0.3rem;
  flex: 2;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  background: #941f1f;
  color: #ffeaea;
}
.unlock-save-order-input {
  font-family: "Oswald", sans-serif;
  border: 1.5px solid #880000;
  flex: 1;
  padding: 0.3rem;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
}
@media (max-width: 800px) {
  .unlock-save-order-holder {
    flex-direction: column;
  }
  .unlock-save-order-message {
    border-radius: 0.3rem 0.3rem 0rem 0rem;
  }
  .unlock-save-order-input {
    text-align: center;
    border-radius: 0rem 0rem 0.3rem 0.3rem;
  }
}
</style>