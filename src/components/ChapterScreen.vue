<template>
  <ion-content :scroll-events="true">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Fermer</ion-button>
        </ion-buttons>
        <ion-title>Chapitres</ion-title>
      </ion-toolbar>
    </ion-header>
    <div
      class="images flex flex-wrap w-full justify-start"
      v-viewer.rebuild="options"
    >
      <img class="w-3/12" v-for="src in images" :key="src" :src="src" />
    </div>
  </ion-content>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  modalController,
} from "@ionic/vue";
import axios from "axios";
const props = defineProps(["id"]);
let images = ref([]);
let options = {
  inline: false,
  button: false,
  navbar: false,
  title: false,
  toolbar: false,
  tooltip: false,
  movable: false,
  zoomable: true,
  rotatable: false,
  scalable: false,
  transition: false,
  fullscreen: true,
  keyboard: true,
};
//Fonction de chargement des images du chapitre
async function call() {
  try {
    const hash = await axios.get(
      `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getChapters?id=${props.id.value}`
    );
    if (hash) {
      let temp = [];
      await Promise.all(
        hash.data.chapter?.data.map(async (element, index) => {
          const image = await axios.get(
            `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getPages?baseUrl=${hash.data.baseUrl}&hash=${hash.data.chapter.hash}&pageId=${hash.data.chapter.data[index]}`
          );
          if (image) {
            temp.push(
              "data:image/png;base64," + image.data.body.$binary.base64
            );
          }
        })
      );
      images.value.push(...temp.reverse());
    }
  } catch (e) {
    console.log(e);
  }
}
//Mounted appel de la fonction de chargement des images
onMounted(async () => {
  await call();
});
//Fonctione pour fermer la modal
function dismiss() {
  modalController.dismiss();
}
</script>
<style>
/* .images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
} */
</style>
