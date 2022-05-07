<template>
  <ion-content :scroll-events="true">
    <!-- directive -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
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
    <!-- component -->
    <!-- <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer> -->
  </ion-content>
</template>
<script setup>
import { onMounted, ref, defineProps, defineComponent } from "vue";
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
async function call() {
  try {
    const hash = await axios.get(
      `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getChapters?id=${props.id.value}`
    );
    console.log(hash);
    if (hash) {
      let temp = [];
      await Promise.all(
        hash.data.chapter?.data.map(async (element, index) => {
          const image = await axios.get(
            `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getPages?baseUrl=${hash.data.baseUrl}&hash=${hash.data.chapter.hash}&pageId=${hash.data.chapter.data[index]}`
          );
          if (image) {
            console.log(image);
            temp.push(
              "data:image/png;base64," + image.data.body.$binary.base64
            );
          }
        })
      );
      console.log(temp);
      images.value.push(...temp.reverse());
    }
  } catch (e) {
    console.log(e);
  }
}
onMounted(async () => {
  await call();
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
