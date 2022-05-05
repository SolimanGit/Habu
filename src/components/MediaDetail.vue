<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismissModal()">Close</ion-button>
        </ion-buttons>
        <ion-title>truc</ion-title>
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
      <h1 class="text-3xl underline text-red">OKOKOOK</h1>
      <ion-button v-if="!mediaFollowed" @click="addToFeed()">Follow</ion-button>
      <ion-button v-else @click="removeFromFeed()">unfollow</ion-button>
      <ion-list>
        <ion-item
          v-for="item in items_chapters"
          :key="item.id"
          button
          @click="getChapterPNG(item.id)"
        >
          <p>Ch.{{ item.attributes.chapter }}</p>
          <br />
          <p>{{ item.attributes.createdAt }}</p>
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
import { ref, onMounted } from "vue";
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
    console.log(props.item);
    let item_detail = ref({ ...props.item });
    let items_chapters = ref([]);
    let isDisabled = ref(false);
    let mediaFollowed = ref(false);
    const app = Realm.getApp("application-habu-wbdom");
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    async function addToFeed() {
      try {
        const collection = mongodb.db("habu-db1").collection("profile");
        const resp = await collection.updateOne(
          {
            userID: app.currentUser.id,
          },
          {
            $push: { feed: { id_mangadex: item_detail.value.id } },
          }
        );
        if (resp) {
          mediaFollowed.value = true;
          console.log(resp);
          console.log("ok");
        } else {
          console.log("no");
        }
      } catch {
        console.log("error");
      }
    }
    async function removeFromFeed() {
      try {
        const collection = mongodb.db("habu-db1").collection("profile");
        const resp = await collection.update(
          {
            userID: app.currentUser.id,
          },
          {
            $pull: { feed: { id_mangadex: item_detail.value.id } },
          }
        );
        resp ? console.log("ok") : console.log("nok");
      } catch {
        console.log("error");
      }
    }
    function dismissModal() {
      modalController.dismiss();
    }
    function find_cover(item) {
      const cover_id = item.relationships.find(
        (element) => element.type == "cover_art"
      );
      return cover_id.attributes.fileName;
    }
    function loadData(event) {
      console.log("OULALALLALALA", items_chapters.value.length);
      axios
        .get(
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getDetail?id=${props.item.id}&offset=${items_chapters.value.length}`
        )
        .then((res) => {
          items_chapters.value.push(...res.data.data);
          event.target.complete();
          items_chapters.value.length == 200
            ? this.isDisabled == true
            : this.isDisabled == false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getChapterPNG(id) {
      axios
        .get(
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getChapters?id=${id}`
        )
        .then((res) => {
          console.log(res);
          axios
            .get(
              `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getPages?baseUrl=${res.data.baseUrl}&hash=${res.data.chapter.hash}&pageId=${res.data.chapter.data[0]}`
            )
            .then((res) => {
              console.log("IMAGE", res);
            })
            .catch((err) => {
              console.log(err);
            });
          // modalController.create({
          //   component: "Chapter",
          //   componentProps: {
          //     chapter: res.data.data,
          //   },
          // }).then((modal) => {
          //   modal.present();
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    onMounted(async () => {
      await app.currentUser.refreshCustomData();
      axios
        .get(
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/getDetail?id=${props.item.id}`
        )
        .then((res) => {
          console.log(res);
          items_chapters.value.push(...res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      if (app.currentUser.customData.feed?.length > 0) {
        console.log(app.currentUser.customData.feed);
        app.currentUser.customData.feed.forEach((element) => {
          console.log("wow");
          if (element.id_mangadex == props.item.id) {
            console.log("COPY");
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
      getChapterPNG,
      addToFeed,
      mediaFollowed,
      removeFromFeed,
    };
  },
};
</script>
