import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useDataStore } from "./dataStore";

export const usePizzaStore = defineStore("pizza", () => {
  const { getEntity } = storeToRefs(useDataStore());

  const pizzaIngredients = ref({});
  const pizzaDough = ref(1);
  const pizzaSize = ref(1);
  const pizzaSauce = ref(1);

  const getPizzaPrice = computed(() => {
    let ingredientsSum = 0;

    for (let [id, count] of Object.entries(pizzaIngredients.value)) {
      ingredientsSum += getEntity.value(id, "ingredient").price * count;
    }
    return (
      ((getEntity.value(pizzaDough.value, "dough").price ?? 0) +
        (getEntity.value(pizzaSauce.value, "sauce").price ?? 0) +
        ingredientsSum) *
      (getEntity.value(pizzaSize.value, "size").multiplier ?? 1)
    );
  });

  return { pizzaIngredients, pizzaDough, pizzaSize, pizzaSauce, getPizzaPrice };
});
