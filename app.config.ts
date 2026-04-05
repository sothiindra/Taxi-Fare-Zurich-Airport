import type { ConfigContext, ExpoConfig } from '@expo/config';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Taxi Fare: Zurich Airport',
  slug: 'taxi-fare-zurich-airport',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  scheme: 'taxifarezurichairport',
  jsEngine: 'hermes',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#F4F7FB',
  },
  android: {
    package: 'com.taxifarezurichairport.app',
    softwareKeyboardLayoutMode: 'resize',
    "icon": "./assets/icon.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon-foreground.png",
        "backgroundImage": "./assets/adaptive-icon-background.png"
      },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
        },
      },
    ],
  ],
  extra: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
});
