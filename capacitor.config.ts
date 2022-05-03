import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Habu',
  webDir: 'dist',
  bundledWebRuntime: false,
  "server": {
    "url": "http://192.168.1.26:8100/",
    "cleartext": true
  },
};

export default config;
