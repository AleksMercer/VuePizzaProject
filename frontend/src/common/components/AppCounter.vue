<template>
  <div :class="`counter ${component}__counter`">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="counter <= 0"
      @click="counter > 0 ? counter-- : ''"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :min="0"
      :max="3"
      v-model="counter"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="counter++"
      :disabled="counter >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "orange",
  },
  component: {
    type: String,
    required: false,
    default: "ingredients",
  },
});

const counter = defineModel({ type: Number, default: 0 });
</script>
