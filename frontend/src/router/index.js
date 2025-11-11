import { createRouter, createWebHistory } from "vue-router";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { middlewarePipeline, isAuthenticated } from "@/middlewares";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/popup",
      name: "popup",
      component: () => import("@/views/PopupView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
      meta: {
        layout: HeaderLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: "/history",
      name: "history",
      component: () => import("@/views/OrdersView.vue"),
      meta: {
        layout: SidebarLayout,
        middlewares: [isAuthenticated],
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        layout: SidebarLayout,
        middlewares: [isAuthenticated],
      },
    },
  ],
});

middlewarePipeline(router);
export default router;
