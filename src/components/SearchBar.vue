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
        <!-- <ion-item slot="header">
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
        </ion-item> -->
      </ion-accordion>
    </ion-accordion-group>
  </ion-list>
</template>
<script setup>
import MangaThumbnail from "@/components/MangaThumbnail";
import {
  IonSearchbar,
  IonAccordion,
  IonItem,
  IonList,
  IonAccordionGroup,
  IonListHeader,
} from "@ionic/vue";
import { ref, defineEmits } from "vue";
import axios from "axios";

let items = ref([]);
const emit = defineEmits(["search"]);

const searchAccordion = ref();
function onChange(event) {
  console.log(event.detail.value);
  if (event.detail.value.length > 0) {
    //todo PROBLEME avec l'appel "my hero" passe mais pas "my hero academia"
    axios
      .get(
        `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/searchInput?search=${event.detail.value}`
      )
      .then((res) => {
        console.log("adzadadad", res.data.data);
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
    console.log(searchAccordion.value.$el.value);
    searchAccordion.value.$el.value = event.detail.value;
  }
}

function onBlur() {
  if (searchAccordion.value) {
    searchAccordion.value.$el.value = undefined;
  }
}
</script>
<style></style>
