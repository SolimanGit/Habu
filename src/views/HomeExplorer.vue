<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Explorer</ion-title>
        </ion-toolbar>
      </ion-header>
      <SearchBar @go-detail="(state, item) => goDetail(state, item)" />
      <ion-list>
        <ion-item
          v-for="item in items"
          :key="item.id"
          button
          @click="goDetail(true, item)"
        >
          <MangaThumbnail :item="item"></MangaThumbnail>
        </ion-item>
      </ion-list>
      <ion-modal :is-open="openModalDetail" @didDismiss="goDetail(false)">
        <MediaDetail :item="itemDetail" />
      </ion-modal>
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
  IonModal,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from "axios";
import MediaDetail from "@/components/MediaDetail";
import SearchBar from "@/components/SearchBar";
import MangaThumbnail from "@/components/MangaThumbnail";
export default defineComponent({
  name: "HomeExplorer",
  data() {
    return {
      items: [],
      isDisabled: false,
    };
  },
  setup() {
    // function goDetail(state,item) {
    //   provide("machin", "itemmmmmmmm");
    //   this.$router.push({
    //     name: "MediaDetail",
    //     params: {
    //       id: item.id,
    //     },
    //   });
    // }
    const openModalDetail = ref(false);
    const itemDetail = ref(null);
    const goDetail = (state, item) => {
      openModalDetail.value = state;
      item ? (itemDetail.value = item) : null;
    };
    return {
      goDetail,
      openModalDetail,
      itemDetail,
    };
  },
  mounted() {
    axios
      .get(
        `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/mangas`
      )
      .then((res) => {
        console.log(res);
        this.items.push(...res.data.data);
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
          // `https://api.mangadex.org/manga?order[followedCount]=desc&limit=30&includes[]=cover_art&offset=${this.items.length}`
          `https://data.mongodb-api.com/app/application-habu-wbdom/endpoint/mangas?offset=${this.items.length}`
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
    IonModal,
    MediaDetail,
    SearchBar,
    MangaThumbnail,
  },
});
</script>
<style lang=""></style>
