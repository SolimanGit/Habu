<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Explorer</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="item in items" :key="item.id">
          <ion-thumbnail slot="start">
            <img
              :src="`https://uploads.mangadex.org/covers/${
                item.id
              }/${find_cover(item)}.256.jpg`"
            />
          </ion-thumbnail>
          {{ item.attributes.title }}
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
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
<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonThumbnail,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "HomeExplorer",
  data() {
    return {
      items: [],
      isDisabled: false,
    };
  },
  mounted() {
    // axios
    //   .get(
    //     `https://api.mangadex.org/manga?order[followedCount]=desc&limit=30&includes[]=cover_art`
    //   )
    //   .then((res) => {
    //     this.items.push(...res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/mangas`
      )
      .then((res) => {
        console.log(res);
        // this.items.push(...res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ionViewWillEnter() {
    console.log("Home page will enter");
  },
  methods: {
    loadData(e) {
      axios
        .get(
          `https://api.mangadex.org/manga?order[followedCount]=desc&limit=30&includes[]=cover_art&offset=${this.items.length}`
        )
        .then((res) => {
          this.items.push(...res.data.data);
          e.target.complete();
          this.items.length == 100
            ? this.isDisabled == true
            : this.isDisabled == false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    find_cover(item) {
      const cover_id = item.relationships.find(
        (element) => element.type == "cover_art"
      );
      // const fileName = cover_id.attributes.fileName.split('.')
      // console.log(fileName)
      return cover_id.attributes.fileName;
    },
  },
  components: {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonThumbnail,
  },
});
</script>
<style lang=""></style>
