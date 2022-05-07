<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="library" href="/library">
          <ion-icon :icon="library"></ion-icon>
          <ion-label>Library</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="explorer" href="/explorer">
          <ion-icon :icon="fileTrayFull"></ion-icon>
          <ion-label>Explorer</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="options" href="/options">
          <ion-icon :icon="settingsOutline"></ion-icon>
          <ion-label>Options</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/vue";
import { library, settingsOutline, fileTrayFull } from "ionicons/icons";

export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonRouterOutlet,
  },
  setup() {
    return {
      library,
      settingsOutline,
      fileTrayFull,
    };
  },
});
</script>
