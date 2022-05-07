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

    // Fonction de connexion de l'utilisateur
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
    const doCreateAccount = () => {
      router.push("CreateAccount");
    };
    return {
      app,
      email,
      password,
      doLogin,
      doCreateAccount,
    };
  },
};
</script>
<style></style>
