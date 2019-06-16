<template>
  <div>
    <h2 class="title">История</h2>
    <div class="recent">
      <router-link class="link" to="/history/today">Сегодня</router-link>
      <router-link class="link" to="/history/yesterday">Вчера</router-link>
    </div>
    <div class="months">
      <router-link class="link" to="/history/january">Январь</router-link>
      <router-link class="link" to="/history/february">Февраль</router-link>
      <router-link class="link" to="/history/march">Март</router-link>
      <router-link class="link" to="/history/april">Апрель</router-link>
      <router-link class="link" to="/history/may">Май</router-link>
      <router-link class="link" to="/history/june">Июнь</router-link>
      <router-link class="link" to="/history/july">Июль</router-link>
      <router-link class="link" to="/history/august">Август</router-link>
      <router-link class="link" to="/history/september">Сентябрь</router-link>
      <router-link class="link" to="/history/october">Окрябрь</router-link>
      <router-link class="link" to="/history/november">Ноябрь</router-link>
      <router-link class="link" to="/history/december">Декабрь</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import db from "../../firebase/firebase-init";
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.title {
  text-align: center;
  color: #4e0000;
  font-weight: lighter;
  font-size: 1.7rem;
  margin: 0.5rem 0;
}

.recent,
.months {
  display: flex;
  flex-wrap: wrap;
}
.recent .link,
.months .link {
  margin: 0.2rem;
  padding: 0.2rem;
  flex: 1;
  text-align: center;
  flex-basis: 5rem;
  border-radius: 0.2rem;
  background: #ffa1a1;
  color: #2b0000;
}
.link:hover {
  background: #ffb0b0;
  -webkit-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
  -moz-box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
  box-shadow: 2px 2px 3px 0 rgba(42, 42, 42, 0.6);
}
.link:active {
  background: #ff9e9e;
}
</style>
