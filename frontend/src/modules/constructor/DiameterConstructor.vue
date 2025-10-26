<template>
  <CustomTitle>
    <h2 class="title title--small sheet__title">Выберите размер</h2>
  </CustomTitle>

  <div class="sheet__content diameter">
    <label
      v-for="size in sizes"
      :key="size.id"
      class="diameter__input"
      :class="`diameter__input--${size.value}${getEntityValue(size.name)}`"
    >
      <input
        v-model="value"
        type="radio"
        :name="size.name"
        :value="size.id"
        class="visually-hidden"
      />
      <span>{{ size.name }}</span>
    </label>
  </div>
</template>

<script setup>
import CustomTitle from "@/common/components/CustomTitle.vue";
import { computed } from "vue";
import { useDataStore } from "@/store";
import { storeToRefs } from "pinia";

const { sizeOptions: sizes, getEntityValue } = storeToRefs(useDataStore());

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