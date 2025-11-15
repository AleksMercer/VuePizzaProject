<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink :to="{ name: 'main' }" class="logo">
        <img
          src="@assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </RouterLink>
    </div>
    <div class="header__cart">
      <RouterLink :to="{ name: 'cart' }">{{ getOrderPrice() }} ₽</RouterLink>
    </div>
    <div class="header__user">
      <template v-if="isAuthenticated">
        <RouterLink :to="{ name: 'profile' }">
          <img
            :src="getPublicImage(getUserAttribute('avatar'))"
            :alt="getUserAttribute('name')"
            width="32"
            height="32"
          />
          <span>{{ getUserAttribute("name") }}</span>
        </RouterLink>
        <a class="header__login" @click.prevent="logoutClickHandler">
          <span>Выйти</span>
        </a>
      </template>
      <RouterLink v-else :to="{ name: 'auth' }" class="header__login"
        ><span>Войти</span></RouterLink
      >
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store";
import router from "../router";
import { getPublicImage } from "../common/helpers";
import { useCartStore } from "../store";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const { logout, getUserAttribute } = authStore;

const { getOrderPrice } = storeToRefs(useCartStore());

const logoutClickHandler = async () => {
  await logout();
  await router.push({ name: "auth" });
};
</script>
