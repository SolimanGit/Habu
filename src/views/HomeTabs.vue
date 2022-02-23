<template>
  <ion-page>
      <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="library" href="/library">
          <ion-icon :icon="calendar"></ion-icon>
          <ion-label>Library</ion-label>
        </ion-tab-button>
  
        <ion-tab-button tab="news" href="/news">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>News</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="explorer" href="/explorer">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>Explorer</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="options" href="/options">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>Options</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { 
  IonIcon, 
  IonLabel, 
  IonPage,
  IonTabBar, 
  IonTabButton, 
  IonTabs,
  IonRouterOutlet
} from '@ionic/vue';
import { calendar, personCircle } from 'ionicons/icons';

export default defineComponent({
  components: { IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs,IonRouterOutlet },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }
    return {
      calendar,
      personCircle,
      beforeTabChange,
      afterTabChange
    }
  }
});
</script>