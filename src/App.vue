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
  async mounted() {
    if (app.currentUser) {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");

      if (window.location.hash) {
        let url_token = new URLSearchParams(
          window.location.hash.substring(1)
        ).get("access_token");

        const collection = mongodb.db("habu-db1").collection("profile");
        console.log(app.currentUser.customData.anilist_token);
        console.log(url_token);
        console.log(
          await collection.updateOne(
            { userId: app.currentUser.id }, // Query for the user object of the logged in user
            { $set: { anilist_token: url_token } } // Set the logged in user's favorite color to purple
          )
        );
        await app.currentUser.refreshCustomData();
        // app.currentUser.customData.access_token = url_token;
      }
    }
  },
});
</script>
