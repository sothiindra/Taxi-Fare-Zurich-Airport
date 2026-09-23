export const de = {
  translation: {
    common: {
      appName: 'Taxi Fare: Zurich Airport',
      airportLabel: 'Abfahrt',
      airportValue: 'Flughafen Zürich Arrival',
      destination: 'Ziel',
      calculate: 'Preis schätzen',
      calculating: 'Berechnung läuft...',
      settings: 'Einstellungen',
      loading: 'Wird geladen...',
      clear: 'Verlauf löschen',
      language: 'Sprache',
      german: 'Deutsch',
      english: 'Englisch',
      recentDestinations: 'Letzte Ziele',
      poweredByHere: 'Powered by HERE',
      validatedSelection: 'Von HERE geprüft',
    },
    home: {
      heroTitle: 'Taxikosten ab Flughafen Zürich sofort schätzen',
      heroSubtitle:
        'Wählen Sie ein von HERE geprüftes Ziel. Die App berechnet daraus Distanz, verkehrsabhängige Fahrzeit und den geschätzten Fahrpreis.',
      destinationPlaceholder: 'Zieladresse oder Ort eingeben',
      destinationHint: 'Die Berechnung ist erst nach Auswahl eines HERE-Vorschlags möglich.',
      destinationDropdownLabel: 'HERE-Vorschläge',
      resultTitle: 'Estimated fare',
      baseFare: 'Grundgebühr',
      distanceCost: 'Distanzkosten',
      timeCost: 'Zeitkosten',
      totalFare: 'Gesamtpreis',
      distance: 'Distanz',
      duration: 'Fahrzeit',
      trafficHint: 'Die Fahrzeit basiert auf den aktuellen Verkehrsdaten von HERE.',
      emptyTitle: 'Bereit für eine neue Schätzung',
      emptyText:
        'Geben Sie ein Ziel ein, wählen Sie einen validierten Vorschlag und starten Sie danach die Berechnung.',
      loadingTitle: 'Fahrt wird berechnet',
      loadingText:
        'Wir holen Distanz und aktuelle Fahrzeit von HERE und wenden danach den hinterlegten Tarif an.',
      suggestionsLoading: 'Vorschläge werden geladen...',
      noSuggestions: 'Keine passenden Vorschläge gefunden.',
      errors: {
        missing_api_key:
          'Kein HERE API Key gefunden. Bitte hinterlegen Sie EXPO_PUBLIC_HERE_API_KEY in Ihrer .env-Datei.',
        autocomplete_failed:
          'Die Zielvorschläge konnten gerade nicht geladen werden. Bitte versuchen Sie es erneut.',
        destination_lookup_failed:
          'Das ausgewählte Ziel konnte nicht aufgelöst werden. Bitte wählen Sie einen anderen HERE-Vorschlag.',
        route_failed:
          'Die Fahrtdaten konnten nicht geladen werden. Bitte prüfen Sie Ihren HERE API Key und versuchen Sie es erneut.',
        route_unavailable:
          'Für dieses Ziel konnten keine Fahrtdaten berechnet werden. Bitte wählen Sie einen anderen Vorschlag.',
        default:
          'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      },
    },
    settings: {
      title: 'Einstellungen',
      languageTitle: 'Sprache der App',
      languageDescription:
        'Die Auswahl wird lokal gespeichert und beim nächsten Start wiederverwendet.',
      recentsTitle: 'Letzte Ziele',
      recentsDescription:
        'Sie können den lokal gespeicherten Zielverlauf jederzeit leeren.',
      clearHistoryButton: 'Letzte Ziele löschen',
      clearHistorySuccess: 'Der lokale Verlauf wurde gelöscht.',
      clearHistoryDisabled: 'Es sind aktuell keine gespeicherten Ziele vorhanden.',
      clearHistoryHelper: 'Gespeicherte Ziele: {{count}}',
    },
  },
};
