<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <CustomTitle class="title--small">Авторизуйтесь на сайте </CustomTitle>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <AppInput
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import CustomTitle from "@/common/components/CustomTitle.vue";
import AppInput from "../common/components/AppInput.vue";
import { useAuthStore } from "@/store/authStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import router from "../router";

const authStore = useAuthStore();
const { login } = authStore;
const { isAuthenticated } = storeToRefs(authStore);

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  try {
    await login(email.value, password.value);
    if (isAuthenticated) {
      router.push({ name: "main" });
    }
  } catch (e) {
    throw e.message;
  }
};
</script>
