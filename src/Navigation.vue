<template>
  <div>
    <ul v-if="loggedIn">
      <span class="user-button">
        <v-user-pannel
          @hideNavigation="hideNavigation()"
          @closeUserPannel="closeUserPannel()"
          v-show="userPannelOpen"
        ></v-user-pannel>
        <div class="user-icon-holder" @click="openUserPannel()">
          <font-awesome-icon class="user-icon" icon="user"/>
        </div>
      </span>
      <button @click="pushToMenu()" class="li">
        Меню
        <span>
          <font-awesome-icon icon="utensils"/>
        </span>
      </button>
      <router-link to="/orders" class="li">
        Заказы
        <span>
          <font-awesome-icon icon="check-circle"/>
        </span>
      </router-link>
      <router-link to="/history/today" class="li">
        История
        <span>
          <font-awesome-icon icon="clock"/>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase/app";
import EventBus from "./eventBus";
import UserPannel from "./UserComponents/UserPannel";

export default {
  components: {
    "v-user-pannel": UserPannel
  },
  data() {
    return {
      loggedIn: false,
      userPannelOpen: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.loggedIn = true;
    }
  },
  methods: {
    openUserPannel: function() {
      this.userPannelOpen = true;
    },
    closeUserPannel: function() {
      this.userPannelOpen = false;
    },
    hideNavigation: function() {
      this.loggedIn = false;
    },
    // in case of navigating from
    // 'update order' route to 'new order' route
    // the basket stays filled, so we clear it by 'BUS'
    pushToMenu: function() {
      EventBus.$emit("openMenu");
      this.$router.push("/");
    }
  },
  mounted() {
    EventBus.$on("accessAllowed", () => {
      this.loggedIn = true;
      this.userPannelOpen = false;
    });
  }
};
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
}
button.li {
  font-size: 1rem;
}
.li {
  padding: 0.75rem;
  flex: 1;
  cursor: pointer;
  text-align: center;
  border-top: 1px solid #7400003a;
  border-right: 1px solid #7400003a;
  color: #740000;
  background: #ffcfcf;
}
.li:last-child {
  border-right: none;
}
.li:hover {
  background: #ffe4e4;
}
.li span {
  margin-left: 0.5rem;
  font-size: 1.2rem;
}
.user-button {
  position: absolute;
  left: 0.5rem;
  top: -4.5rem;
  cursor: pointer;
  background: #ffcfcf;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  text-align: center;
}
.user-icon {
  margin-top: 0.75rem;
  font-size: 2rem;
  color: #740000;
}
.user-icon-holder {
  width: 100%;
  height: 100%;
}
@media (max-width: 600px) {
  .li {
    padding: 0.4rem;
  }
  .li span {
    margin-left: 0.5rem;
    font-size: 1rem;
  }
}
</style>


