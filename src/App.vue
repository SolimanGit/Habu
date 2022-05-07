<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import * as Realm from "realm-web";
const app = Realm.getApp("application-habu-wbdom");

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  //Fonction d'ajout du token anilist dans la bdd -> en cours de développement
  async mounted() {
    if (app.currentUser) {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");

      if (window.location.hash) {
        let url_token = new URLSearchParams(
          window.location.hash.substring(1)
        ).get("access_token");

        const collection = mongodb.db("habu-db1").collection("profile");
        await collection.updateOne(
          { userID: app.currentUser.id },
          { $set: { anilist_token: url_token } }
        );
        await app.currentUser.refreshCustomData();
      }
    }
  },
});
</script>
