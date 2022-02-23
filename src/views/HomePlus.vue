<template>
     <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Plus</ion-title>
      </ion-toolbar>
    </ion-header>
    </ion-page>
</template>
<script>
import {IonPage, IonHeader, IonTitle, IonToolbar} from '@ionic/vue'
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomePlus',
  data() {
    return {
    }
  },
  components: {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
},
});
</script>
<style lang="">
    
</style>