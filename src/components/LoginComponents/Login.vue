<template>
  <div>
    <div class="root">
      <form @submit.prevent="login()">
        <h1 class="title">Değirmen</h1>
        <input ref="email" type="email" name="email" id="email" v-model="email">
        <input ref="password" type="password" name="password" id="password" v-model="password">
        <button ref="button" type="submit">Login</button>
        <p ref="waitMessage" class="wait-message">Подождите..</p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import EventBus from "../../eventBus";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      this.$refs.button.style.display = "none";
      this.$refs.waitMessage.style.display = "block";
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log("nice");
            EventBus.$emit("accessAllowed");
            this.$router.push("/");
          },
          err => {
            alert("Не верный пароль");
            this.$refs.button.style.display = "inline";
            this.$refs.waitMessage.style.display = "none";
            this.$refs.email.style.background = "#ffc6c6";
            this.$refs.password.style.background = "#ffc6c6";
            this.$refs.password.value = "";
          }
        );
    }
  }
};
</script>

<style scoped>
.root {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-family: "Allura", cursive;
  letter-spacing: 0.3rem;
  color: #700b0b;
  font-size: 3rem;
}
form {
  text-align: center;
  width: 17rem;
}
input {
  width: 100%;
  padding: 0.3rem;
  border: none;
  border-radius: 0.2rem;
  margin: 0 auto;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: "Oswald", sans-serif;
}
input:focus {
  outline: none;
}
.wait-message {
  display: none;
}
button {
  border: none;
  border-radius: 0.2rem;
  padding: 0.2rem 0.8rem;
  width: 50%;
  cursor: pointer;
  flex: 1;
  text-align: center;
  margin: 0.5rem 0.2rem;
  background: #fdc7c7;
  user-select: none;
  font-family: "Oswald", sans-serif;
  font-size: 1rem;
  color: #4d0a0a;
}
button:hover {
  background: #ffe0e0;
  -webkit-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
  -moz-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
  box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
}
button:active {
  outline: none;
  background: #f8a9a9;
}
</style>
