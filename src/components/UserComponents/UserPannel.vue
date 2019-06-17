<template>
  <div>
    <div class="user-info-container">
      <span @click="closeUserPannel()" class="close-button">
        <font-awesome-icon icon="times"/>
      </span>
      <h3 class="user-name">{{user.status}}, {{user.name}}</h3>
      <button class="button" @click="enterConrtolPannel()">Войти в кабинет</button>
      <button class="button" @click="logout()">Выйти из системы</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("logout", this);
    },
    enterConrtolPannel: function() {
      this.$router.push("/controlPannel");
      this.closeUserPannel();
    },
    closeUserPannel: function() {
      this.$emit("closeUserPannel");
    }
  },
  computed: {
    user() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user;
      } else return "null";
    }
  }
};
</script>

<style scoped>
.user-info-container {
  position: absolute;
  background: rgba(80, 13, 13, 0.7);
  bottom: 4.5rem;
  padding: 0.5rem;
  width: 12rem;
  left: 0;
  color: #fff;
}
.user-name {
  padding: 0;
  font-weight: lighter;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0.3rem;
  z-index: 1;
}
.button {
  display: block;
  width: 100%;
  margin: 0.3rem 0;
}
</style>
