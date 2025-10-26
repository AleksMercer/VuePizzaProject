<template>
  <CustomTitle>
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
  </CustomTitle>

  <div class="sheet__content ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>
      <label
        v-for="sauce in sauces"
        :key="sauce.id"
        class="radio ingredients__input"
      >
        <input
          v-model="sauceValue"
          type="radio"
          name="sauce"
          :value="sauce.id"
        />
        <span>{{ sauce.name }}</span>
      </label>
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <li
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredients__item"
        >
          <AppDrag
            :transfer-data="{
              value: ingredient.id,
            }"
          >
            <span
              :class="[
                'filling--' + getEntityValue(ingredient.name.toLowerCase()),
              ]"
              class="filling"
            >
              {{ ingredient.name }}
            </span>
          </AppDrag>

          <AppCounter
            v-model="ingredientsValue[ingredient.id]"
            :is-increment-disabled="ingredientsValue[ingredient.id] >= 3"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store";
import CustomTitle from "@/common/components/CustomTitle.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

const {
  saucesOptions: sauces,
  ingredientsOptions: ingredients,
  getEntityValue,
} = useDataStore();

const props = defineProps({
  sauceValue: {
    type: Number,
    required: true,
  },
  ingredientsValue: {
    type: Object,
    required: true,
  },
});

const sauceValue = computed({
  get() {
    return props.sauceValue;
  },
  set(sauceValue) {
    emit("update:sauceValue", sauceValue);
  },
});

const ingredientsValue = computed({
  get() {
    return props.ingredientsValue;
  },
  set(ingredientsValue) {
    emit("update:ingredientValue", ingredientsValue);
  },
});

const emit = defineEmits(["update:sauceValue", "update:ingredientValue"]);
</script>
