<template>
  <CustomTitle>
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
  </CustomTitle>

  <div class="sheet__content dough">
    <label
      v-for="doughType in doughOptions"
      :key="doughType.id"
      class="dough__input"
      :class="`dough__input--${getEntityValue(doughType.name)}`"
    >
      <input
        v-model="value"
        type="radio"
        name="dough"
        :value="doughType.id"
        class="visually-hidden"
      />
      <b>{{ doughType.name }}</b>
      <span>{{ doughType.description }}</span>
    </label>
  </div>
</template>

<script setup>
import CustomTitle from "@/common/components/CustomTitle.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDataStore } from "@/store";

const { doughOptions, getEntityValue } = storeToRefs(useDataStore());

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
