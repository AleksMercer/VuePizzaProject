<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <CustomTitle class="title--small">Авторизуйтесь на сайте </CustomTitle>
    </div>

    <div v-if="authError" class="error-message">
      {{ authError }}
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
            :class="{ 'input-error': errors.email }"
            @blur="validateField('email')"
          />
        </label>

        <div v-if="errors.email" class="field-error">
          {{ errors.email }}
        </div>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            :class="{ 'input-error': errors.password }"
            @blur="validateField('password')"
          />
        </label>

        <div v-if="errors.password" class="field-error">
          {{ errors.password }}
        </div>
      </div>
      <button type="submit" class="button" :disabled="isSubmitting">
        {{ isSubmitting ? "Загрузка..." : "Авторизоваться" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import CustomTitle from "@/common/components/CustomTitle.vue";
import AppInput from "../common/components/AppInput.vue";
import { useAuthStore } from "@/store/authStore";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import router from "../router";

const authStore = useAuthStore();
const { login } = authStore;
const { isAuthenticated } = storeToRefs(authStore);

const email = ref("");
const password = ref("");
const errors = reactive({
  email: "",
  password: "",
});
const authError = ref("");
const isSubmitting = ref(false);

const validateEmail = (email) => {
  if (!email) {
    return "Поле email обязательно для заполнения";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Введите корректный email адрес";
  }

  return "";
};

const validatePassword = (password) => {
  if (!password) {
    return "Поле пароль обязательно для заполнения";
  }
  return "";
};

const validateField = (fieldName) => {
  switch (fieldName) {
    case "email":
      errors.email = validateEmail(email.value);
      break;
    case "password":
      errors.password = validatePassword(password.value);
      break;
  }
};

const validateForm = () => {
  let isValid = true;

  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(password.value);

  errors.email = emailError;
  errors.password = passwordError;

  if (emailError || passwordError) {
    isValid = false;
  }

  return isValid;
};

const onSubmit = async () => {
  authError.value = "";

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    await login(email.value, password.value);

    if (isAuthenticated.value) {
      router.push({ name: "main" });
    } else {
      authError.value = "Неверный email или пароль";
    }
  } catch (error) {
    console.error("Login error:", error);
    authError.value = error.message || "Произошла ошибка при авторизации";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
