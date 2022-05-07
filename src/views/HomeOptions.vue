<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Plus</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <a
        :href="
          'https://anilist.co/api/v2/oauth/authorize?client_id=' +
          client_id +
          '&response_type=token'
        "
        >Login with AniList</a
      >

      <ion-button @click="Anilist()">Login with anilist BUTTON</ion-button>
    </ion-content>
  </ion-page>
</template>
<script setup>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
} from "@ionic/vue";
import axios from "axios";
import { onMounted } from "vue";

const client_id = process.env.VUE_APP_ANILIST_CLIENT_ID;

const Anilist = () => {
  window.location.href =
    "https://anilist.co/api/v2/oauth/authorize?client_id=" +
    client_id +
    "&response_type=token";
  // axios
  //   .post(
  //     `https://anilist.co/api/v2/oauth/authorize?client_id=${client_id}&response_type=token`
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
</script>
<style lang=""></style>
