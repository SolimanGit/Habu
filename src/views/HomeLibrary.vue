<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Library</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="item in items" :key="item.id">
          <ion-thumbnail slot="start">
            <img
              :src="`https://uploads.mangadex.org/covers/${
                item.id
              }/${find_cover(item)}.256.jpg`"
            />
          </ion-thumbnail>
          {{ item.attributes.title }}
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        threshold="100px"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonThumbnail,
  IonItem,
} from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "HomeLibrary",
  data() {
    return {};
  },
  components: {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonThumbnail,
    IonItem,
  },
});
</script>
<style lang=""></style>
