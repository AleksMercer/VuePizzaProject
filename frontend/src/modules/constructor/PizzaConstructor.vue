<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <AppDrop @drop="(transferData) => dropHandler(transferData)">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${
            pizzaDough === 1 ? 'small' : 'big'
          }-${getEntityValue(
            getEntity(pizzaSauce, 'sauce').name.toLowerCase()
          )}`"
        >
          <div class="pizza__wrapper">
            <template
              v-for="[ingredientId, value] in Object.entries(pizzaIngredients)"
            >
              <div
                v-if="value > 0"
                :key="ingredientId"
                class="pizza__filling"
                :class="[
                  `pizza__filling--${getEntityValue(
                    getEntity(ingredientId, 'ingredient').name.toLowerCase()
                  )}`,
                  value > 1 ? 'pizza__filling--second' : '',
                  value > 2 ? 'pizza__filling--third' : '',
                ]"
              ></div>
            </template>
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ getPizzaPrice }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="pizzaName.length < 3"
        @click="handleSubmit"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { useDataStore } from "@/store";
import { storeToRefs } from "pinia";
import { usePizzaStore } from "@/store";
import { ref } from "vue";
import { useCartStore } from "@/store";
import router from "../../router";

defineProps({
  dropHandler: {
    type: Function,
    required: true,
  },
});

const { getEntityValue, getEntity } = storeToRefs(useDataStore());
const { getPizzaPrice, pizzaIngredients, pizzaDough, pizzaSauce } =
  storeToRefs(usePizzaStore());
const { addPizzaToCart } = useCartStore();

const pizzaName = ref("");

const handleSubmit = () => {
  addPizzaToCart(pizzaName);

  router.push({ name: "cart" });
};
</script>
