<template>
   <div>
      <ul v-if="isAuthentificated">
         <span class="user-button">
            <v-user-pannel
               @closeUserPannel="closeUserPannel()"
               v-show="userPannelOpen"
            ></v-user-pannel>
            <div class="user-icon-holder" @click="openUserPannel()">
               <font-awesome-icon class="user-icon" icon="user" />
            </div>
         </span>
         <button @click="pushToMenu()" class="li">
            Меню
            <span class="icon-wrapper">
               <font-awesome-icon icon="utensils" />
            </span>
         </button>
         <router-link to="/orders" class="li">
            Заказы
            <span class="icon-wrapper">
               <font-awesome-icon icon="check-circle" />
            </span>
         </router-link>
         <router-link to="/history/today" class="li">
            История
            <span class="icon-wrapper">
               <font-awesome-icon icon="clock" />
            </span>
         </router-link>
      </ul>
   </div>
</template>

<script>
import firebase from "firebase/app";
import EventBus from "../eventBus";
import UserPannel from "./UserComponents/UserPannel";

export default {
   components: {
      "v-user-pannel": UserPannel
   },
   data() {
      return {
         userPannelOpen: false
      };
   },
   computed: {
      isAuthentificated() {
         return this.$store.state.auth.isAuthentificated;
      },
      adminMode() {
         if (this.$store.state.auth.user) {
            return this.$store.state.auth.user.status !== "Официант";
         } else return false;
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
      // the basket stays filled, so we clear it
      pushToMenu: function() {
         this.$store.dispatch("setBasket", []);
         this.$store.dispatch("setSecondBasket", []);
         this.$router.push("/");
      }
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
.li {
   padding: 0.75rem;
   flex: 1;
   cursor: pointer;
   text-align: center;
   border-top: 1px solid #7400003a;
   border-right: 1px solid #7400003a;
   color: #740000;
   background: #ffcfcf;
   border-bottom: none;
}
.li:last-child {
   border-right: none;
}
.li:hover {
   background: #ffe4e4;
}
.icon-wrapper {
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
   border: 1px solid rgba(225, 74, 74, 0.3);
}
.user-button:hover {
   background: #ffe0e0;
   -webkit-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   -moz-box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
   box-shadow: 4px 4px 9px 0px rgba(179, 172, 179, 1);
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
   .icon-wrapper {
      margin-left: 0.5rem;
      font-size: 1rem;
   }
}
@media (max-width: 400px) {
   .li {
      font-size: 0.9rem;
   }
   .icon-wrapper {
      margin-left: 0.2rem;
      font-size: 0.8rem;
   }
}
</style>


