<template>
  <ion-page>
    <ion-content padding>
      <form novalidate>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Nom</ion-label>
            <ion-input v-model="lastName" name="text" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Prénom</ion-label>
            <ion-input v-model="firstName" name="text" type="text"></ion-input>
          </ion-item>
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
            <ion-button @click="createAccount()" expand="full"
              >SignUp</ion-button
            >

            <!-- <ion-button @click="" color="light" expand="full"
              >Create Account</ion-button
            > -->
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
  </ion-page>
</template>
<script>
import * as Realm from "realm-web";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
  name: "CreateAccount",
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
    const firstName = ref("");
    const lastName = ref("");
    const router = useRouter();

    const createAccount = async () => {
      try {
        //Create user
        await app.emailPasswordAuth.registerUser(email.value, password.value);

        //Authenticate user
        await app.logIn(
          Realm.Credentials.emailPassword(email.value, password.value)
        );

        //save profile information
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("habu-db1").collection("profile");

        const res = await collection.insertOne({
          userID: app.currentUser.id,
          firstName: firstName.value,
          lastName: lastName.value,
        });
        if (res) router.push("explorer");
      } catch (error) {
        console.log("Oops", error);
      }
    };
    return {
      firstName,
      lastName,
      app,
      email,
      password,
      createAccount,
    };
  },
};
</script>
<style></style>
