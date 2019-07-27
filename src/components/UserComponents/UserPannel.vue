<template>
   <div>
      <div class="user-pannel-background" @click="closeUserPannel($event)">
         <div class="user-pannel-container">
            <div class="user-info-header">
               <h3 class="user-info">{{ user.name }}, {{ user.status }}</h3>
               <span @click="closeUserPannel($event, 'close')">
                  <font-awesome-icon icon="times" />
               </span>
            </div>
            <div class="user-info-link-group">
               <div class="link" @click="redirect('/controlPannel')">
                  <p>Войти в кабинет</p>
                  <font-awesome-icon icon="sign-in-alt" />
               </div>
               <div class="link" @click="redirect('/updateDishes')">
                  <p>Настроить блюда</p>
                  <font-awesome-icon icon="hamburger" />
               </div>
               <div class="link" @click="redirect('/historyChecks')">
                  <p>История чеков</p>
                  <font-awesome-icon icon="clipboard-list" />
               </div>
               <div class="link" @click="redirect('/waiters')" v-if="adminMode">
                  <p>Официанты</p>
                  <font-awesome-icon icon="users" />
               </div>
               <div class="link" @click="logout()">
                  <p>Выйти из системы</p>
                  <font-awesome-icon icon="door-open" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   methods: {
      logout: function() {
         this.$store.dispatch("logout", this);
      },
      redirect: function(path) {
         this.$router.push(path);
         this.$emit("closeUserPannel");
      },
      closeUserPannel: function(event, close) {
         if (!event) return;
         if (event.target.className === "user-pannel-background" || close) {
            this.$emit("closeUserPannel");
         }
      }
   },
   computed: {
      user() {
         return this.$store.getters.getCurrentUser;
      },
      adminMode() {
         return this.user.status !== "Официант";
      }
   }
};
</script>

<style scoped>
.user-pannel-background {
   width: 100vw;
   height: 100vh;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 1;
}
.user-pannel-container {
   position: absolute;
   background: rgba(80, 13, 13, 0.8);
   text-align: left;
   bottom: 8.5rem;
   width: 15rem;
   left: 1rem;
   color: #fff;
}
.user-info-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding-bottom: 0.3rem;
   background: rgb(63, 7, 7);
   padding: 0.3rem 0.5rem;
}
.user-info {
   padding: 0;
   font-weight: lighter;
   font-size: 1rem;
}
.close-button {
   position: absolute;
   top: 0.1rem;
   right: 0.5rem;
}
.user-info-link-group {
   padding: 0.5rem;
   margin-top: 0.3rem;
}
.link {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 0.4rem;
   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
