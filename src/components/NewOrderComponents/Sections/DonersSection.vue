<template>
  <div>
    <section class="section-meals">
      <div class="container pale-red">
        <div class="section__title color-dark-red">ДОНЕРЫ</div>
        <ul class="meal-group">
          <li v-for="doner in doners" :key="doner.key" class="meal-item color-dark-red">
            <div>
              <h4>{{returnName(doner)}}</h4>
              <input
                type="text"
                class="comment-input"
                placeholder="комментарий"
                :ref="'comment'+doner.key"
              >
            </div>
            <div class="portion-size-choise-box">
              <div class="checkboxes">
                <div class="onion-check">
                  <input
                    type="checkbox"
                    name="onion-check"
                    :id="doner.key"
                    value="(без лука)"
                    v-model="doner.toppings"
                  >
                  <label :for="doner.key">Без лука</label>
                </div>
                <div class="cheese-check">
                  <input
                    type="checkbox"
                    name="cheese-check"
                    :id="doner.key+1"
                    value="(с сыром)"
                    v-model="doner.toppings"
                  >
                  <label :for="doner.key+1">С сыром (+50тг)</label>
                </div>
              </div>
              <a
                class="portion__option"
                v-if="doner.costSmall!==0"
                @click="addToBasket(doner, doner.costSmall)"
              >
                <div class="portion__size-price">
                  <div class="portion__size">{{doner.portionSmall}}</div>
                  <div class="portion__price">{{doner.costSmall}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
              <a class="portion__option" @click="addToBasket(doner, doner.costStand)">
                <div class="portion__size-price">
                  <div class="portion__size">{{doner.portionStand}}</div>
                  <div class="portion__price">{{doner.costStand}}₸</div>
                </div>
                <div class="basket-icon">
                  <font-awesome-icon icon="shopping-basket"/>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import db from "../../../firebase/firebase-init";
export default {
  data() {
    return {
      doners: []
    };
  },
  methods: {
    addToBasket: function(doner, cost) {
      const donerToSend = { ...doner };
      donerToSend.nameDefault = doner.name;

      //firstly check 'PORTION SIZE'
      if (doner.costSmall !== 0) {
        if (cost == doner.costSmall) {
          donerToSend.name += ` (${donerToSend.portionSmall.toLowerCase()})`;
          donerToSend.cost = donerToSend.costSmall;
        } else {
          donerToSend.name += ` (${donerToSend.portionStand.toLowerCase()})`;
          donerToSend.cost = donerToSend.costStand;
        }
      } else {
        donerToSend.cost = donerToSend.costStand;
      }

      //secondly check 'CHEESE'
      if (doner.toppings.includes("(с сыром)")) {
        donerToSend.name += " с сыром";
        donerToSend.cost += 50;
      }

      //thirdly check 'ONION'
      if (doner.toppings.includes("(без лука)")) {
        donerToSend.name += " (без лука)";
      }

      //lastly check 'COMMENT'
      let commentInput = this.$refs["comment" + doner.key][0].value;
      if (commentInput !== "") {
        donerToSend.name += ` (${commentInput})`;
      }

      //empty everything`
      doner.toppings = [];
      this.$refs["comment" + doner.key][0].value = "";
      this.$emit("addToBasket", donerToSend);
    },
    returnName(doner) {
      let nameArr = doner.name.split(" ");
      if (nameArr.length == 1) return nameArr[0];

      let donerNameResult = "";
      for (let i = 1; i < nameArr.length; i++) {
        donerNameResult += nameArr[i] + " ";
      }
      return donerNameResult;
    }
  },
  created() {
    db.collection("dishes")
      .doc("doners")
      .get()
      .then(doc => {
        const doners = doc.data().doners;
        for (let i = 0; i < doners.length; i++) {
          const donerItem = {
            key: `doner${i}`,
            type: "doners",
            name: doners[i].name,
            portionSmall: doners[i].portionSmall,
            portionStand: doners[i].portionStand,
            costSmall: doners[i].costSmall,
            costStand: doners[i].costStand,
            toppings: []
          };
          this.doners.push(donerItem);
        }
      });
  }
};
</script>

<style scoped>
.portion-size-choise-box {
  width: 55%;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  justify-content: space-between;
}
.checkboxes {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
input[type="checkbox"] {
  display: none;
}
label {
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
}
label:before {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
  border: 1px solid #df6363;
  vertical-align: middle;
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
  border-radius: 0.2rem;
}
label:hover:before {
  background: #ffe9e9;
}
input[type="checkbox"]:checked + label:before {
  content: "\2713";
  font-size: 0.7rem;
  font-weight: bold;
  color: #9a2928;
  text-align: center;
}
.comment-input {
  font-family: "Lobster";
  border: 1px solid rgba(146, 146, 146, 0.226);
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  background: rgb(255, 233, 233);
}
@media (max-width: 800px) {
  .portion-size-choise-box {
    margin-top: 0.5rem;
    width: 100%;
  }
  .meal-item {
    flex-direction: column;
  }
}
@media (max-width: 500px) {
  .checkboxes {
    flex: 1;
    margin: 0 auto;
  }
  .portion-size-choise-box {
    flex-direction: column;
  }
  .portion__option {
    margin-top: 0.4rem;
  }
}
</style>
