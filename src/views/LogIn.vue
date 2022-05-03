<template>
  <ion-page>
    <ion-content padding>
      <form novalidate>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">email</ion-label>
            <ion-input v-model="email" name="email" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Password</ion-label>
            <ion-input
              v-model="password"
              name="password"
              type="password"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-row responsive-sm>
          <ion-col>
            <ion-button @click="doLogin()" expand="full">Login</ion-button>

            <ion-button @click="doCreateAccount()" color="light" expand="full"
              >Create Account</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row responsive-sm>
          <ion-col>
            <ion-button @click="doLoginAnilist()" expand="full"
              >Log In with Anilist</ion-button
            >
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
  </ion-page>
</template>
<script>
import * as Realm from "realm-web";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import {
  IonLabel,
  IonPage,
  IonInput,
  IonItem,
  IonRow,
  IonCol,
  IonButton,
  IonContent,
  IonList,
} from "@ionic/vue";

export default {
  name: "LogIn",
  components: {
    IonLabel,
    IonPage,
    IonInput,
    IonItem,
    IonRow,
    IonCol,
    IonButton,
    IonContent,
    IonList,
  },
  setup() {
    const app = Realm.getApp("application-habu-wbdom");
    const password = ref("");
    const email = ref("");
    const router = useRouter();

    const doLogin = async () => {
      const credentials = Realm.Credentials.emailPassword(
        email.value,
        password.value
      );
      try {
        const user = await app.logIn(credentials);
        if (user) router.push("explorer");
      } catch (error) {
        console.log("Oops", error);
      }
    };
    const doLoginAnilist = () => {
      //todo mettre le client dans une variable d'environnement

      axios
        .get(
          `https://anilist.co/api/v2/oauth/authorize?client_id=8060&response_type=token`,
          {
            headers: {
              "Access-Control-Allow-Credentials": true,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      app,
      email,
      password,
      doLogin,
      doLoginAnilist,
    };
  },
};
</script>
<style></style>
