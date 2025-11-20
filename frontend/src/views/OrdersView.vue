<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <template v-if="userOrders.length > 0">
      <section v-for="order in userOrders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ getOrderPrice(order) }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            class="order__item"
          >
            <div class="product">
              <img
                src="@assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getEntity(pizza.sizeId, "size").name }},
                    {{ getEntity(pizza.doughId, "dough").name }}
                  </li>
                  <li>Соус: {{ getEntity(pizza.sauceId, "sauce").name }}</li>
                  <li v-if="pizza.ingredients">
                    Начинка:
                    {{
                      pizza.ingredients
                        .map(
                          (ingredient) =>
                            getEntity(ingredient.ingredientId, "ingredient")
                              .name
                        )
                        .join(", ")
                    }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{ pizza.quantity > 1 ? `${pizza.quantity}x` : ""
              }}{{ getSinglePizzaPrice(pizza) }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="misc.id">
            <img
              :src="getPublicImage(getEntity(misc.miscId, 'misc').image)"
              width="20"
              height="30"
              :alt="getEntity(misc.miscId, 'misc').name"
            />
            <p>
              <span>{{ getEntity(misc.miscId, "misc").name }}</span>
              <b
                >{{
                  getEntity(misc.miscId, "misc").quantity > 1
                    ? `${getEntity(misc.miscId, "misc").quantity}x`
                    : ""
                }}{{ getEntity(misc.miscId, "misc").price }} ₽</b
              >
            </p>
          </li>
        </ul>

        <p v-if="userAddresses.value" class="order__address">
          Адрес доставки:
          {{
            userAddresses.find((address) => address.id === order.addressId).name
          }}
        </p>
      </section>
    </template>
    <div v-else class="sheet cart__empty">
      <p>В истории нет ни одного заказа</p>
    </div>
  </div>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../store";
import { useDataStore } from "../store";
import { useCartStore } from "../store";

const profileStore = useProfileStore();
const { userOrders, getOrderPrice, userAddresses } = storeToRefs(profileStore);
const { deleteOrder, repeatOrder } = profileStore;

const { getEntity } = useDataStore();

const { getSinglePizzaPrice } = storeToRefs(useCartStore());
</script>
