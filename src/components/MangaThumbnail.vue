<template>
  <ion-thumbnail slot="start">
    <img
      :src="`https://uploads.mangadex.org/covers/${props.item.id}/${find_cover(
        props.item
      )}.256.jpg`"
    />
  </ion-thumbnail>
  <p>{{ Object.values(props.item.attributes.title)[0] }}</p>
</template>
<script setup>
import { defineProps } from "vue";
import { IonThumbnail } from "@ionic/vue";

const props = defineProps(["item"]);

//Fonction de recherche de la cover dans l'objet de l'item
function find_cover(item) {
  const cover_id = item.relationships.find(
    (element) => element.type == "cover_art"
  );
  return cover_id.attributes.fileName;
}
</script>
<style></style>
