<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Library</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="getFeed($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item
          v-for="item in items"
          :key="item.id"
          button
          @click="goDetail(true, item)"
        >
          <MangaThumbnail :item="item"></MangaThumbnail>
        </ion-item>
      </ion-list>
      <ion-modal :is-open="openModalDetail" @didDismiss="goDetail(false)">
        <MediaDetail :item="itemDetail" />
      </ion-modal>

      <ion-infinite-scroll
        @ionInfinite="getFeed()"
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
<script setup>
import * as Realm from "realm-web";
import MediaDetail from "@/components/MediaDetail";
import MangaThumbnail from "@/components/MangaThumbnail";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonModal,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import axios from "axios";
const app = Realm.getApp("application-habu-wbdom");
let items = ref([]);
const openModalDetail = ref(false);
const itemDetail = ref(null);
let isDisabled = ref(false);

//Fonction d'affichage de la modal de detail du manga
const goDetail = (state, item) => {
  openModalDetail.value = state;
  item ? (itemDetail.value = item) : null;
};

//Fonction qui récupère le feed de l'utilisateur
const getFeed = async (event = null) => {
  let ids = null;
  await app.currentUser.refreshCustomData();
  if (app.currentUser.customData.feed?.length > 0) {
    const map_format = app.currentUser.customData.feed?.map(
      (map_item) => "&ids[]=" + map_item.id_mangadex
    );
    ids = map_format.join("");
    axios
      .post(
        `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getMediaFeed?offset=${items.value.length}`,
        { ids: ids }
      )
      .then((response) => {
        items.value.push(...response.data.data);
        if (event) {
          event.target.complete();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (event) {
    event.target.complete();
  }
};

//Fonction qui appel le feed de l'utilisateur
onMounted(async () => {
  app.currentUser.refreshCustomData();
  try {
    await getFeed();
  } catch (e) {
    console.log(e);
  }
});
</script>
<style lang=""></style>
