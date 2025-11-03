<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <CustomTitle>
          <h1 class="title title--big">Конструктор пиццы</h1>
        </CustomTitle>
        <div class="content__dough">
          <div class="sheet">
            <DoughConstructor v-model="pizzaDough" />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <DiameterConstructor v-model="pizzaSize" />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <IngredientConstructor
              v-model:ingredients-value="pizzaIngredients"
              v-model:sauce-value="pizzaSauce"
            />
          </div>
        </div>
        <PizzaConstructor :drop-handler="dropHandler" />
      </div>
    </form>
  </main>
</template>

<script setup>
import CustomTitle from "@/common/components/CustomTitle.vue";
import DoughConstructor from "@/modules/constructor/DoughConstructor.vue";
import DiameterConstructor from "@/modules/constructor/DiameterConstructor.vue";
import IngredientConstructor from "@/modules/constructor/IngredientConstructor.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import { usePizzaStore } from "@/store";
import { storeToRefs } from "pinia";

const { pizzaIngredients, pizzaDough, pizzaSize, pizzaSauce } =
  storeToRefs(usePizzaStore());

const dropHandler = (transferData) => {
  pizzaIngredients.value[transferData.value]++;
};
</script>
