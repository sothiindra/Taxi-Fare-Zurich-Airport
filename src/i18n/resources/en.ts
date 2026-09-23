export const en = {
  translation: {
    common: {
      appName: 'Taxi Fare: Zurich Airport',
      airportLabel: 'Pickup',
      airportValue: 'Zurich Airport Arrival',
      destination: 'Destination',
      calculate: 'Estimate fare',
      calculating: 'Calculating...',
      settings: 'Settings',
      loading: 'Loading...',
      clear: 'Clear history',
      language: 'Language',
      german: 'German',
      english: 'English',
      recentDestinations: 'Recent destinations',
      poweredByHere: 'Powered by HERE',
      validatedSelection: 'Verified by HERE',
    },
    home: {
      heroTitle: 'Estimate taxi fares from Zurich Airport in seconds',
      heroSubtitle:
        'Choose a HERE-verified destination and the app calculates distance, traffic-aware travel time, and the estimated fare.',
      destinationPlaceholder: 'Enter destination address or place',
      clearDestination: 'Clear destination',
      destinationHint: 'Calculation is only available after selecting a HERE suggestion.',
      destinationDropdownLabel: 'HERE suggestions',
      resultTitle: 'Estimated fare',
      baseFare: 'Base fare',
      distanceCost: 'Distance cost',
      timeCost: 'Time cost',
      totalFare: 'Total fare',
      distance: 'Distance',
      duration: 'Travel time',
      trafficHint: 'Travel time is based on current HERE traffic data.',
      emptyTitle: 'Ready for a new estimate',
      emptyText:
        'Type a destination, choose a validated suggestion, and then start the calculation.',
      loadingTitle: 'Calculating your trip',
      loadingText:
        'We are fetching distance and live travel time from HERE before applying the configured fare tariff.',
      suggestionsLoading: 'Loading suggestions...',
      noSuggestions: 'No matching suggestions found.',
      errors: {
        missing_api_key:
          'No HERE API key found. Add EXPO_PUBLIC_HERE_API_KEY to your .env file.',
        autocomplete_failed:
          'Destination suggestions could not be loaded right now. Please try again.',
        destination_lookup_failed:
          'The selected destination could not be resolved. Please choose another HERE suggestion.',
        route_failed:
          'Trip data could not be loaded. Please verify your HERE API key and try again.',
        route_unavailable:
          'No driving estimate is available for this destination. Please choose a different suggestion.',
        default: 'An unexpected error occurred. Please try again.',
      },
    },
    settings: {
      title: 'Settings',
      languageTitle: 'App language',
      languageDescription:
        'The chosen language is stored locally and restored on the next app launch.',
      recentsTitle: 'Recent destinations',
      recentsDescription:
        'You can remove the locally stored destination history at any time.',
      clearHistoryButton: 'Clear recent destinations',
      clearHistorySuccess: 'The local history has been cleared.',
      clearHistoryDisabled: 'There are currently no stored destinations.',
      clearHistoryHelper: 'Stored destinations: {{count}}',
    },
  },
};
