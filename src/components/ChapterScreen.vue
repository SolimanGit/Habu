<template>
  <ion-content :scroll-events="true">
    <!-- directive -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
        <ion-title>truc</ion-title>
      </ion-toolbar>
    </ion-header>
    <div
      class="images flex flex-wrap w-full justify-start"
      v-viewer.rebuild="options"
    >
      <img class="w-3/12" v-for="src in images" :key="src" :src="src" />
    </div>
    <!-- component -->
    <!-- <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer> -->
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
function show() {
  this.$viewerApi({
    images: this.images,
  });
}
onMounted(() => {
  axios
    .get(
      `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getChapters?id=${props.id.value}`
    )
    .then((res) => {
      console.log(res);
      // hash = res;
      //todo A VOIR POUR AFFICHER DU BASE 64
      res.data.chapter?.data.forEach((element, index) => {
        axios
          .get(
            `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getPages?baseUrl=${res.data.baseUrl}&hash=${res.data.chapter.hash}&pageId=${res.data.chapter.data[index]}`
          )
          .then((res) => {
            console.log("IMAGE", res);
            images.value.push(
              "data:image/png;base64," + res.data.body.$binary.base64
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
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
