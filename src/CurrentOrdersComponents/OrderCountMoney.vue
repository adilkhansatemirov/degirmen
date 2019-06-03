<template>
  <div>
    <p class="order-total">Итог: {{order.total}}</p>
    <div v-if="order.type == 'Кафе'">
      <p class="order-total" v-if="!order.takeaway">Обслуживание: {{service(order)}}</p>
      <div v-if="order.discount != 0">
        <p class="order-total">Скидка: -{{order.discount}}%</p>
      </div>
    </div>
    <p v-else class="order-total">Доставка: 300</p>

    <p class="order-total">
      <span class="print-button" @click="printRequest(order)">
        <font-awesome-icon icon="print"/>
      </span>
      К оплате: {{toPay(order)}}
    </p>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    order: {
      type: Object
    },
    adminMode: {
      type: Boolean
    }
  },
  methods: {
    // @decs returns positive value of discount if not 0
    countDiscount: function(order) {
      let totalWithService = order.total + this.service(order);
      return Math.round((totalWithService * order.discount) / 100);
    },
    // @decs returns 10% money of the order.total
    service: function(order) {
      if (order.takeaway) {
        return 0;
      }
      return Math.round((order.total * 10) / 100);
    },
    toPay: function(order) {
      if (order.type == "Кафе") {
        return order.total + this.service(order) - this.countDiscount(order);
      } else {
        return order.total + 300;
      }
    },
    printRequest: function(order) {
      order.destination = this.adminMode ? "CASHIER TABLE" : "WAITERS TABLE";
      const data = {
        order
      };
      const config = {
        responseType: "text"
      };
      axios
        // .post("/test/index.php", data, config)
        .post("/print/example/interface/ethernet.php", data, config)
        .then(response => {
          console.log(response);
          console.log("Responce was handled.");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.order-total {
  text-align: right;
}
.print-button {
  font-size: 1.1rem;
}
.print-button:hover {
  color: rgb(155, 67, 67);
}
</style>
