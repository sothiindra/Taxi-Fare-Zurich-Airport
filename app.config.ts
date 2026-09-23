import type { ConfigContext, ExpoConfig } from '@expo/config';

const HERE_API_KEY = process.env.EXPO_PUBLIC_HERE_API_KEY ?? '';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Taxi Fare: Zurich Airport',
  slug: 'taxi-fare-zurich-airport',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  scheme: 'taxifarezurichairport',
  icon: './assets/icon.png',
  android: {
    package: 'com.taxifarezurichairport.app',
    softwareKeyboardLayoutMode: 'resize',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon-foreground.png',
      backgroundImage: './assets/adaptive-icon-background.png',
    },
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#F4F7FB',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
        },
      },
    ],
  ],
  extra: {
    hereApiKey: HERE_API_KEY,
  },
});
