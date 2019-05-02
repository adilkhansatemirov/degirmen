<template>
  <div>
    <div class="user-info-container">
      <span @click="closeUserPannel()" class="close-button">
        <font-awesome-icon icon="times"/>
      </span>
      <h3 class="user-name">Здравствуйте, {{userName}}</h3>
      <button @click="enterConrtolPannel()">Войти в кабинет</button>
      <button @click="logout()">Выйти</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../firebase/firebase-init";
import EventBus from "../eventBus";
export default {
  data() {
    return {
      userId: null,
      userEmail: null,
      userStatus: null,
      userName: null
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$emit('hideNavigation');
          this.$router.push("/login");
        });
    },
    enterConrtolPannel: function(){
      this.$router.push("/controlPannel");
      this.closeUserPannel();
    },
    closeUserPannel: function() {
      this.$emit('closeUserPannel');
    }
  },
  created() {
    this.userEmail = firebase.auth().currentUser.email;
    this.userId = firebase.auth().currentUser.uid;

    db.collection("users")
      .doc(this.userId)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.userName = doc.data().name;
      });
  }
};
</script>

<style scoped>
.user-info-container {
  position: absolute;
  background: rgba(49, 46, 46, 0.466);
  bottom: 4.5rem;
  padding: 0.5rem;
  left: 0;
}
.user-name {
  padding: 0;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
