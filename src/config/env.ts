import Constants from 'expo-constants';

const hereApiKey =
  Constants.expoConfig?.extra?.hereApiKey ??
  process.env.EXPO_PUBLIC_HERE_API_KEY ??
  '';

export const env = {
  hereApiKey,
};

export const hasHereApiKey = Boolean(hereApiKey);
