<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismissModal()">Fermer</ion-button>
        </ion-buttons>
        <ion-title>Manga</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="text-3xl font-bold underline">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card class="flex">
              <div class="w-28">
                <img
                  class="object-contain"
                  :src="`https://uploads.mangadex.org/covers/${
                    item_detail.id
                  }/${find_cover(item)}.256.jpg`"
                />
              </div>
              <ion-card-content class="self-center">
                <p class="font-bold text-lg">
                  {{ Object.values(item_detail.attributes.title)[0] }}
                </p>
                <p>{{ item_detail.attributes.status }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button v-if="!mediaFollowed" @click="addToFeed()">Follow</ion-button>
      <ion-button v-else @click="removeFromFeed()">unfollow</ion-button>
      <ion-list>
        <ion-item
          v-for="item in items_chapters"
          :key="item.id"
          button
          @click="showChapter(item.id)"
        >
          <div>
            <p>Ch.{{ item.attributes.chapter }}</p>
            <p class="font-light">
              {{ formatDate(item.attributes.createdAt) }}
            </p>
          </div>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        threshold="100px"
        id="infinite-scroll-chapter"
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
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import axios from "axios";
import { ref, onMounted, defineAsyncComponent } from "vue";
import * as Realm from "realm-web";
export default {
  name: "MediaDetail",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  props: ["item"],
  setup(props) {
    let item_detail = ref({ ...props.item });
    let items_chapters = ref([]);
    let chapter_selected = ref(null);
    let isDisabled = ref(false);
    let mediaFollowed = ref(false);
    const openModalDetail = ref(false);
    let currentModal = ref(null);

    const app = Realm.getApp("application-habu-wbdom");
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");

    //Fonction pour ajouter dans le feed de l'utilisateur un manga
    async function addToFeed() {
      try {
        const collection = mongodb.db("habu-db1").collection("profile");
        const resp = await collection.updateOne(
          {
            userID: app.currentUser.id,
          },
          {
            $push: {
              feed: {
                id_mangadex: item_detail.value.id,
                id_anilist: item_detail.value.attributes.links.al,
              },
            },
          }
        );
        resp ? (mediaFollowed.value = true) : null;
      } catch {
        console.log("error");
      }
    }

    //Fonction pour formater une date en dd/mm/yyyy
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    }

    //Fonction qui retire du feed d'un utilisateur un manga
    async function removeFromFeed() {
      try {
        const collection = mongodb.db("habu-db1").collection("profile");
        const resp = await collection.updateOne(
          {
            userID: app.currentUser.id,
          },
          {
            $pull: { feed: { id_mangadex: item_detail.value.id } },
          }
        );
        resp ? (mediaFollowed.value = false) : null;
      } catch {
        console.log("error");
      }
    }

    //Fonction pour fermer une modal
    function dismissModal() {
      modalController.dismiss();
    }

    //Fonction pour find les covers des mangas
    function find_cover(item) {
      const cover_id = item.relationships.find(
        (element) => element.type == "cover_art"
      );
      return cover_id.attributes.fileName;
    }
    //Fonction pour récupérer les chapitres dynamiquement
    function loadData(event) {
      axios
        .get(
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getDetail?id=${props.item.id}&offset=${items_chapters.value.length}`
        )
        .then((res) => {
          items_chapters.value.push(...res.data.data);
          event.target.complete();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //Fonction pour afficher le chapitre dans une modal
    async function showChapter(id) {
      chapter_selected.value = id;
      openModalDetail.value = true;
      const modal = await modalController.create({
        component: defineAsyncComponent(() =>
          import("@/components/ChapterScreen.vue")
        ),
        componentProps: {
          id: chapter_selected,
        },
      });
      await modal.present();
      currentModal.value = modal;
    }

    //Mounter qui permet de charger les données
    onMounted(async () => {
      await app.currentUser.refreshCustomData();
      axios
        .get(
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getDetail?id=${props.item.id}`
        )
        .then((res) => {
          items_chapters.value.push(...res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      if (app.currentUser.customData.feed?.length > 0) {
        app.currentUser.customData.feed.forEach((element) => {
          if (element.id_mangadex == props.item.id) {
            mediaFollowed.value = true;
          }
        });
      }
    });
    return {
      onMounted,
      dismissModal,
      item_detail,
      find_cover,
      items_chapters,
      isDisabled,
      loadData,
      addToFeed,
      mediaFollowed,
      removeFromFeed,
      showChapter,
      openModalDetail,
      chapter_selected,
      formatDate,
    };
  },
};
</script>
