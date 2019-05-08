<template>
  <div>
    <div class="order-info" v-if="order.type == 'Доставка'">
      <p>Адрес: {{order.address}}</p>
    </div>
    <div class="order-info" v-else>
      <div v-if="order.takeaway == true">
        <p>С собой</p>
      </div>
      <div v-else>
        <p>Офицант: {{order.waiterName}}</p>
        <p>Столик: {{order.table}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    }
  }
};
</script>

<style scoped>
.order-info {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}
</style>
