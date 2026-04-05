import Constants from 'expo-constants';

const googleMapsApiKey =
  Constants.expoConfig?.extra?.googleMapsApiKey ??
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ??
  '';

export const env = {
  googleMapsApiKey,
};

export const hasGoogleMapsKey = Boolean(googleMapsApiKey);
