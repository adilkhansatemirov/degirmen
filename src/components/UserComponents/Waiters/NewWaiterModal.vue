<template>
   <div class="modal-background" @click="closeNewWaiterModal($event)">
      <div class="modal-container">
         <h3 class="modal-header">Новый официант</h3>
         <form @submit.prevent="createNewWaiter()">
            <div class="input-item">
               <label for="waiter-name">Имя</label>
               <input type="text" id="waiter-name" v-model="name" />
            </div>
            <div class="input-item">
               <label for="waiter-email">Email</label>
               <input type="email" id="waiter-email" v-model="email" />
            </div>
            <div class="input-item">
               <label for="waiter-password">Пароль</label>
               <input type="password" id="waiter-password" v-model="password" />
            </div>
            <div class="button-group">
               <button type="submit">
                  Сохранить
               </button>
               <button type="button" class="close-modal-button">
                  Отмена
               </button>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         name: "",
         email: "",
         password: ""
      };
   },
   methods: {
      createNewWaiter: function() {
         if (!this.name || !this.email || !this.password) {
            return;
         }
         const waiter = {
            name: this.name,
            email: this.email,
            password: this.password
         };
         this.$store.dispatch("closeNewWaiterModal");
         this.$store.dispatch("createNewWaiter", waiter);
      },
      closeNewWaiterModal: function() {
         if (
            event.target.className == "modal-background" ||
            event.target.className == "close-modal-button"
         ) {
            this.$store.dispatch("closeNewWaiterModal");
         }
      }
   }
};
</script>

<style>
.modal-background {
   width: 100%;
   height: 100%;
   position: fixed;
   background: rgba(0, 0, 0, 0.4);
   top: 0;
   left: 0;
   z-index: 2;
   display: flex;
   justify-content: center;
   align-items: center;
}
.modal-container {
   padding: 1rem;
   width: 25rem;
   background: rgb(255, 243, 243);
   font-size: 1.2rem;
}
.modal-header {
   text-align: center;
   margin-bottom: 0.5rem;
}
.input-item {
   display: flex;
}
.input-item label {
   flex: 1;
}
.input-item input {
   flex-basis: 10rem;
   margin: 0.5rem auto;
   font-size: 1rem;
}
input[type="checkbox"] {
   display: none;
}
.checkbox-label {
   width: 100%;
   text-align: right;
   padding: 0.5rem 0;
   font-size: 1rem;
}
.checkbox-label:after {
   content: "";
   width: 0.8rem;
   height: 0.8rem;
   padding: 0rem 0.15rem 0.3rem 0.15rem;
   display: inline-block;
   border: 1px solid #df6363;
   vertical-align: middle;
   margin-left: 0.4rem;
   border-radius: 0.2rem;
}
.checkbox-label:hover:after {
   background: #ffe9e9;
}
input[type="checkbox"]:checked + .checkbox-label:after {
   content: "\2713";
   font-size: 0.7rem;
   font-weight: bold;
   color: #9a2928;
   text-align: center;
}
.button-group {
   display: flex;
   justify-content: space-around;
}
.button-group button {
   padding: 0.2rem 0.7rem;
   color: #000;
   border: 1px solid rgb(255, 166, 166);
   background: #fff4f4;
   width: 100%;
   margin: 0.2rem;
   text-align: center;
   border-radius: 0.2rem;
   cursor: pointer;
   position: relative;
}
.loading {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>
