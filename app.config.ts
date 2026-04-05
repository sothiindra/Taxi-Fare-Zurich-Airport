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
  android: {
    package: 'com.taxifarezurichairport.app',
    softwareKeyboardLayoutMode: 'resize',
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
