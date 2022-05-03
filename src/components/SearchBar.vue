<template>
  <ion-accordion-group value="colors" ref="searchAccordion">
    <ion-accordion value="colors">
      <ion-item slot="header">
        <ion-searchbar
          inputmode="search"
          type="search"
          showClearButton
          debounce="450"
          animated
          @ionBlur="onBlur"
          @ionChange="onChange($event)"
        >
        </ion-searchbar>
      </ion-item>
      <ion-list slot="content">
        <ion-item>
          <ion-label>Blue</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Blue</ion-label>
        </ion-item>
      </ion-list>
    </ion-accordion>
  </ion-accordion-group>
</template>
<script setup>
import {
  IonSearchbar,
  IonAccordion,
  IonItem,
  IonList,
  IonLabel,
  IonAccordionGroup,
} from "@ionic/vue";
import { ref } from "vue";
import axios from "axios";

let ok = ref(null);
const searchAccordion = ref();
function onChange(event) {
  console.log(event.detail.value);
  axios
    .get(
      `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/searchInput?search=${event.detail.value}`
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (searchAccordion.value) {
    console.log(searchAccordion.value.$el.value);
  }
}

function onBlur() {
  if (searchAccordion.value) {
    searchAccordion.value.$el.value == undefined;
  }
}
</script>
