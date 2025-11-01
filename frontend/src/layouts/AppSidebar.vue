<template>
  <div class="layout__sidebar sidebar">
    <RouterLink :to="{ name: 'main' }" class="logo layout__logo">
      <img
        src="@assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </RouterLink>

    <RouterLink
      class="layout__link"
      active-class="layout__link--active"
      :to="{ name: 'history' }"
      >История заказов</RouterLink
    >
    <RouterLink
      class="layout__link"
      :to="{ name: 'profile' }"
      active-class="layout__link--active"
      >Мои данные</RouterLink
    >
  </div>
</template>

<script setup></script>
