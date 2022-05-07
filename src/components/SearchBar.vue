<template>
  <ion-list>
    <ion-list-header
      ><ion-searchbar
        inputmode="search"
        type="search"
        showClearButton
        debounce="450"
        animated
        @ionBlur="onBlur"
        @ionChange="onChange($event)"
      >
      </ion-searchbar
    ></ion-list-header>

    <ion-accordion-group value="colors" ref="searchAccordion">
      <ion-accordion
        expand="inset"
        value="colors"
        :class="
          items.length != 0 ? 'accordion-expanded' : 'accordion-collapsed'
        "
      >
      </ion-accordion>
    </ion-accordion-group>
  </ion-list>
</template>
<script setup>
import {
  IonSearchbar,
  IonAccordion,
  IonList,
  IonAccordionGroup,
  IonListHeader,
} from "@ionic/vue";
import { ref, defineEmits } from "vue";
import axios from "axios";

let items = ref([]);
const emit = defineEmits(["search"]);

const searchAccordion = ref();
//Fonction de recherche
function onChange(event) {
  if (event.detail.value.length > 0) {
    axios
      .get(
        `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/searchInput?search=${event.detail.value}`
      )
      .then((res) => {
        items.value = res.data.data ?? [];
        emit("search", items.value);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    emit("search", []);
  }

  if (searchAccordion.value) {
    searchAccordion.value.$el.value = event.detail.value;
  }
}
//Fonction qui quitte la recherche quand n'est plus focus
function onBlur() {
  if (searchAccordion.value) {
    searchAccordion.value.$el.value = undefined;
  }
}
</script>
<style></style>
