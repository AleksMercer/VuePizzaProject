<template>
  <div v-if="showPopup" class="popup" @click="showPopup = false">
    <h2 class="popup__title">Спасибо за заказ</h2>
    <p>Мы начали готовить Ваш заказ, скоро привезем его Вам</p>
    <div class="popup__button">
      <button class="button" @click="confirmOrder">Отлично, я жду!</button>
    </div>
  </div>

  <div v-else class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <ul v-if="cart.pizzas.length > 0" class="cart-list sheet">
          <li
            v-for="pizza in cart.pizzas"
            :key="pizza.id"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                src="@assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name ?? "" }}</h2>
                <ul>
                  <li>
                    {{ getEntity(pizza.sizeId, "size").name ?? "" }},
                    {{ getEntity(pizza.doughId, "dough").name ?? "" }}
                  </li>
                  <li>
                    Соус: {{ getEntity(pizza.sauceId, "sauce").name ?? "" }}
                  </li>
                  <li>
                    Начинка:
                    {{
                      pizza.ingredients.reduce(
                        (acc, ingredient) =>
                          acc +
                          `${
                            getEntity(ingredient.ingredientId, "ingredient")
                              .name ?? ""
                          }, `,
                        ""
                      )
                    }}
                  </li>
                </ul>
              </div>
            </div>

            <AppCounter
              v-model="pizza.quantity"
              :orange="true"
              class="cart-list__counter"
            />

            <div class="cart-list__price">
              <b>{{ pizza.quantity * getSinglePizzaPrice(pizza) }} ₽</b>
            </div>

            <div class="cart-list__button">
              <RouterLink :to="{ name: 'main' }" class="cart-list__edit">
                Изменить
              </RouterLink>
            </div>
          </li>
        </ul>

        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одной пиццы</p>
        </div>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc in cart.misc"
              :key="misc.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="getPublicImage(getEntity(misc.miscId, 'misc').image)"
                  width="39"
                  height="60"
                  :alt="getEntity(misc.miscId, 'misc').name ?? ''"
                />
                <span>{{ getEntity(misc.miscId, "misc").name ?? "" }}</span>
              </p>
              <div class="additional-list__wrapper">
                <AppCounter
                  v-model="misc.quantity"
                  class="additional-list__counter"
                ></AppCounter>
                <div class="additional-list__price">
                  <b>× {{ getEntity(misc.miscId, "misc").price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="cart.phone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="cart.address.street"
                    type="text"
                    name="street"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="cart.address.building"
                    type="text"
                    name="house"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="cart.address.flat"
                    type="text"
                    name="apartment"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <RouterLink
          :to="{ name: 'main' }"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </RouterLink>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ getOrderPrice() }} ₽</b>
      </div>

      <div class="footer__submit">
        <button class="button" @click="showPopup = true">Оформить заказ</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../store";
import AppCounter from "../common/components/AppCounter.vue";
import { useDataStore } from "../store";
import { getPublicImage } from "@/common/helpers";
import { ref } from "vue";

const cartStore = useCartStore();
const { cart, getSinglePizzaPrice, getOrderPrice } = storeToRefs(cartStore);
const { sendOrder } = cartStore;
const { getEntity } = storeToRefs(useDataStore());
const showPopup = ref(false);

const confirmOrder = () => {
  sendOrder();
  showPopup.value = false;
};
</script>
