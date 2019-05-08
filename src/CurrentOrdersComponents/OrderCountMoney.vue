<template>
  <div>
    <p class="order-total">Итог: {{order.total}}</p>
    <div v-if="order.type == 'Кафе'">
      <div v-if="order.discount != 0">
        <p class="order-total">Скидка: -{{order.discount}}%</p>
        <p class="order-total">С учетом скидки: {{countDiscount(order)}}</p>
      </div>
      <p class="order-total" v-if="!order.takeaway">Обслуживание: {{service(order)}}</p>
    </div>
    <p v-else class="order-total">Доставка: 300</p>

    <p class="order-total">К оплате: {{toPay(order)}}</p>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    }
  },
  methods: {
    countDiscount: function(order) {
      return Math.round(order.total - (order.total * order.discount) / 100);
    },
    service: function(order) {
      if (order.takeaway) {
        return 0;
      } else if (order.discount != 0) {
        return Math.round((this.countDiscount(order) * 5) / 100);
      }
      return Math.round((order.total * 5) / 100);
    },
    toPay: function(order) {
      if (order.type == "Кафе") {
        if (order.discount != 0) {
          return this.countDiscount(order) + this.service(order);
        }
        return order.total + this.service(order);
      } else {
        return order.total + 300;
      }
    }
  }
};
</script>

<style scoped>
.order-total {
  text-align: right;
}
</style>
