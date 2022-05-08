<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Options</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <div class="flex flex-col justify-center h-full">
        <ion-button color="danger" @click="logout()">Se déconnecter</ion-button
        ><br />
        <ion-button @click="Anilist()">Se connecter à AniList</ion-button>
      </div>
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
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import * as Realm from "realm-web";
import { useRouter } from "vue-router";

const router = useRouter();
const app = Realm.getApp("application-habu-wbdom");
const client_id = process.env.VUE_APP_ANILIST_CLIENT_ID;

//Déconnexion de l'utilisateur
const logout = async () => {
  await app.currentUser?.logOut();
  router.replace("/log");
};

// Fonction de connexion de l'utilisateur au service Anilist via l'API -> en cours de développement
const Anilist = () => {
  window.location.href =
    "https://anilist.co/api/v2/oauth/authorize?client_id=" +
    client_id +
    "&response_type=token";
};
</script>
<style lang=""></style>
