# Taxi Fare: Zurich Airport

Taxi Fare: Zurich Airport ist eine moderne, Android-fokussierte React-Native-App mit Expo, die den geschaetzten Taxipreis vom Flughafen Zurich zu einem frei waehlbaren Ziel berechnet. Die App ist bewusst kein Buchungsprodukt, sondern ein klar fokussierter Preisrechner mit Google-validierter Zielauswahl, verkehrsbasierter Fahrzeit und transparenter Kostenaufschluesselung.

## Projektuebersicht

Die App besteht aus zwei Screens:

- Hauptscreen fuer Zieleingabe, Live-Vorschlaege, Berechnung und Ergebnisdarstellung
- Settings-Screen fuer die manuelle Sprachumschaltung und das Loeschen lokal gespeicherter letzter Ziele

Der Startpunkt ist immer fix auf den Flughafen Zurich Arrival gesetzt. Nutzer geben nur das Ziel ein, waehlen einen von Google validierten Vorschlag aus und starten dann die Berechnung.

## Ziel der App

Die App soll schnell und verstaendlich beantworten:

- Wie weit ist das Ziel vom Flughafen Zurich entfernt?
- Wie lange dauert die Fahrt unter Beruecksichtigung des aktuellen Verkehrs?
- Wie hoch ist der geschaetzte Fahrpreis nach der fest vorgegebenen Tariflogik?

Es werden keine Karten, keine Polylines und keine Routenansichten angezeigt. Die App konzentriert sich ausschliesslich auf Schaetzung, Distanz, Zeit und Kostenaufschluesselung.

## Feature-Uebersicht

- Fixer Abfahrtsort: Flughafen Zurich
- Freie Zieleingabe
- Google Places Autocomplete fuer Live-Vorschlaege
- Berechnung erst nach Auswahl eines Google-validierten Vorschlags
- Google Routes API fuer Distanz und verkehrsabhaengige Fahrzeit
- Ergebnis-Card mit Estimated fare, Grundgebuehr, Distanzkosten, Zeitkosten, Gesamtpreis, Distanz und Fahrzeit
- Deutsche Standardsprache beim ersten Start
- Zusaetzliche englische Lokalisierung
- Manuelle Sprachumschaltung im Settings-Screen
- Lokale Speicherung der gewaehlten Sprache
- Einfache lokale Speicherung letzter Ziele
- Loeschfunktion fuer die Zielhistorie
- Zentrale Tarifdefinition
- Gekapselte API-Schicht fuer spaetere Erweiterungen

## Tech-Stack

- Expo
- React Native
- TypeScript
- React Navigation Native Stack
- react-i18next und i18next
- AsyncStorage
- Google Places API
- Google Routes API
- expo-build-properties
- expo-linear-gradient

## Voraussetzungen

Vor dem lokalen Start sollten folgende Dinge verfuegbar sein:

- Node.js 20 oder neuer
- npm
- Android Studio inklusive Android SDK
- Ein Android Emulator oder ein physisches Android-Geraet
- Ein Google-Cloud-Projekt mit aktivierter Abrechnung
- Ein Google Maps Platform API Key

## Installationsanleitung

### 1. Abhaengigkeiten installieren

```bash
npm install
```

### 2. Environment-Datei anlegen

```bash
copy .env.example .env
```

Danach den Google API Key in `.env` eintragen:

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=dein_google_maps_api_key
```

## Schritte zum lokalen Starten des Projekts

### Entwicklungsserver starten

```bash
npm run start
```

### Android lokal starten

```bash
npm run android
```

Alternativ kann die App ueber die Expo-CLI auf einem Emulator oder Android-Geraet gestartet werden.

## Android-Hinweise

Die App ist fuer Android ausgelegt. In `app.config.ts` ist die Android-Konfiguration bewusst explizit hinterlegt.

Wichtige Punkte:

- compileSdkVersion: 35
- targetSdkVersion: 35
- buildToolsVersion: 35.0.0

Diese Werte werden ueber das Expo-Plugin `expo-build-properties` gesetzt.

Falls spaeter native Android-Dateien erzeugt werden sollen:

```bash
npx expo prebuild -p android
```

## Projektstruktur

```text
.
|-- App.tsx
|-- app.config.ts
|-- babel.config.js
|-- package.json
|-- tsconfig.json
|-- .env.example
|-- assets
|-- src
|   |-- components
|   |-- config
|   |-- constants
|   |-- i18n
|   |-- navigation
|   |-- providers
|   |-- screens
|   |-- services
|   |-- theme
|   |-- types
|   `-- utils
`-- README.md
```

### Wichtige Dateien im Detail

- `App.tsx`: Einstiegspunkt der App mit Navigation, Theme und Providern
- `app.config.ts`: Expo-App-Konfiguration, Android-SDK-Werte und zentrale Bereitstellung des API Keys
- `src/constants/app.ts`: Feste Definition des Startpunkts Flughafen Zurich sowie Storage-Keys
- `src/constants/tariff.ts`: Zentrale Tarifwerte
- `src/services/googleMaps.ts`: Gekapselte Google-API-Aufrufe fuer Autocomplete und Routenberechnung
- `src/services/storage.ts`: Lokale Speicherung fuer Sprache und letzte Ziele
- `src/utils/fare.ts`: Preisberechnung anhand der Tariflogik
- `src/utils/format.ts`: CHF-, Distanz- und Zeitformatierung
- `src/i18n/index.ts`: Initialisierung der Lokalisierung

## Konfigurationshinweise

### Startpunkt ist fest definiert

Der Abfahrtsort ist zentral in `src/constants/app.ts` konfiguriert. Verwendet werden feste Koordinaten fuer den Flughafen Zurich:

- Latitude: 47.458056
- Longitude: 8.548056
- IATA: ZRH

### Environment-Konfiguration

Der Google API Key ist nicht im Code verteilt, sondern wird sauber zentralisiert:

- Eingabe in `.env`
- Einlesen in `app.config.ts`
- Zugriff in der App ueber `src/config/env.ts`

### App Icons und Splash Placeholder

Im Projekt liegen bereits einfache Placeholder-Dateien:

- `assets/icon.png`
- `assets/adaptive-icon-background.png`
- `assets/adaptive-icon-foreground.png`
- `assets/splash-icon.png`

Diese Dateien sind in `app.config.ts` bereits eingebunden. Fuer eigene finale Assets muessen die Dateien einfach mit neuen PNGs gleichen Namens ersetzt werden oder die Pfade in `app.config.ts` angepasst werden.

Empfohlene Formate:

- App Icon: 1024 x 1024 PNG
- Android Adaptive Icon Foreground: 1024 x 1024 PNG mit genug Rand
- Splash Icon: quadratisches PNG mit transparentem oder hellem Hintergrund

## Erklaerung der Preisberechnung

Die App verwendet exakt diese Tariflogik:

- Grundgebuehr: 6.00 CHF
- Pro Kilometer: 4.40 CHF
- Pro Minute: 0.80 CHF

Formel:

```text
Gesamtpreis = 6.00 + (Kilometer * 4.40) + (Minuten * 0.80)
```

Technischer Ablauf:

1. Der Nutzer gibt ein Ziel ein.
2. Google Places liefert Vorschlaege.
3. Der Nutzer waehlt einen validierten Vorschlag aus.
4. Google Routes liefert Distanz und verkehrsabhaengige Fahrzeit.
5. `src/utils/fare.ts` berechnet Grundgebuehr, Distanzkosten, Zeitkosten und Gesamtpreis.
6. `src/utils/format.ts` formatiert die Ausgabe fuer die UI.

## Hinweise zur Lokalisierung

Die App startet standardmaessig auf Deutsch und unterstuetzt zusaetzlich Englisch.

Eigenschaften:

- Keine automatische Erzwingung anhand der Geraetesprache
- Manuelle Sprachumschaltung im Settings-Screen
- Lokale Speicherung der Sprache
- Wiederherstellung beim naechsten Start

Verwendete Dateien:

- `src/i18n/index.ts`
- `src/i18n/resources/de.ts`
- `src/i18n/resources/en.ts`

## Hinweise zur lokalen Speicherung

Folgende Daten werden lokal gespeichert:

- gewaehlte Sprache
- letzte ausgewaehlte Ziele

Verwendete Technologie:

- `@react-native-async-storage/async-storage`

Verhalten:

- Letzte Ziele werden leichtgewichtig gespeichert
- Doppelte Eintraege werden entfernt
- Die Historie wird auf maximal 5 Eintraege begrenzt
- Im Settings-Screen kann die Historie geloescht werden

## Google API Keys einrichten

Dieser Abschnitt ist absichtlich detailliert, damit die Einrichtung fuer private Nutzung sauber und nachvollziehbar bleibt.

### Welche Google APIs werden benoetigt?

Sie benoetigen mindestens diese beiden APIs:

- Places API fuer Live-Vorschlaege und validierte Zielauswahl
- Routes API fuer Distanz und aktuelle, verkehrsbezogene Fahrzeit

Die App verwendet bewusst:

- Places Autocomplete fuer Vorschlaege
- Routes API `computeRoutes` fuer Fahrdaten

Die App verwendet bewusst keine Kartenanzeige und keine Route auf einer Map.

### Wie aktiviert man die APIs in der Google Cloud?

1. Die [Google Cloud Console](https://console.cloud.google.com/) oeffnen.
2. Ein Projekt auswaehlen oder neu anlegen.
3. Billing aktivieren.
4. Zu `APIs & Services` > `Library` wechseln.
5. Nacheinander aktivieren:
   - Places API
   - Routes API

### Wie erstellt man API Keys?

1. Zu `APIs & Services` > `Credentials` wechseln.
2. `Create credentials` auswaehlen.
3. `API key` erstellen.
4. Den Key sinnvoll benennen.

### Wie sichert und beschraenkt man die Keys?

Auch bei privater Nutzung sollte der Key nicht offen bleiben.

Empfehlungen:

1. Unter `API restrictions` nur die benoetigten APIs erlauben:
   - Places API
   - Routes API
2. Unter `Application restrictions` spaeter eine moeglichst enge Einschraenkung setzen.
3. Keine echten Keys im Repository committen.
4. Keine Keys direkt im Quellcode hardcoden.

### Wo werden die Keys im Projekt abgelegt?

Der Key gehoert in die Datei `.env`:

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=dein_google_maps_api_key
```

### Welche Beispiel-Konfigurationsdateien werden verwendet?

- `.env.example`: Vorlage mit dem benoetigten Schluessel
- `.gitignore`: Verhindert, dass echte `.env`-Dateien versehentlich committed werden
- `app.config.ts`: Liest die Variable ein und stellt sie in Expo `extra` bereit
- `src/config/env.ts`: Kapselt den Zugriff in der App

## API-Layer und Wartbarkeit

Die API-Zugriffe sind bewusst zentral gekapselt:

- `fetchDestinationSuggestions(...)`
- `fetchRouteMetrics(...)`

Datei:

- `src/services/googleMaps.ts`

Vorteile:

- klare Trennung von UI und Netzwerklogik
- leichte spaetere Umstellung auf einen Proxy oder ein Backend
- bessere Wartbarkeit
- klarere Fehlerbehandlung

## Troubleshooting / haeufige Probleme

### Es erscheinen keine Zielvorschlaege

Pruefen:

- Ist `.env` vorhanden?
- Ist `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` gesetzt?
- Ist die Places API in Google Cloud aktiviert?
- Ist Billing aktiv?
- Ist der API Key eventuell zu streng eingeschraenkt?

### Die Preisberechnung schlaegt fehl

Pruefen:

- Ist die Routes API aktiviert?
- Hat der API Key Zugriff auf die Routes API?
- Wurde wirklich ein Vorschlag aus der Liste ausgewaehlt?
- Ist das Ziel per Auto erreichbar?

### Die Sprache bleibt nicht gespeichert

Pruefen:

- Wurden die Abhaengigkeiten korrekt installiert?
- Ist AsyncStorage verfuegbar?
- Wurde lokaler App-Speicher manuell geloescht?

### Android-Build startet nicht

Pruefen:

- Ist Android Studio korrekt eingerichtet?
- Ist ein Emulator verfuegbar oder ein Geraet verbunden?
- Wurden alle npm-Abhaengigkeiten installiert?
- Ist die verwendete Node-Version aktuell genug?

## Vorschlaege fuer moegliche zukuenftige Erweiterungen

- Nacht- und Feiertagszuschlaege
- mehrere Tarifprofile
- Favoriten statt nur letzter Ziele
- mehrere fixe Startpunkte
- Proxy-Backend fuer API-Key-Schutz
- Export oder Teilen einer Preisaufschluesselung
- Vergleich mit OeV oder Ride-Hailing-Diensten

## Startrelevante Kommandos

```bash
npm install
copy .env.example .env
npm run start
npm run android
```

## Hinweise zur Code-Qualitaet

Das Projekt ist bewusst so aufgebaut, dass UI, Tariflogik, Konfiguration, Lokalisierung und API-Zugriffe klar getrennt bleiben. Die App verwendet TypeScript, sinnvolle Dateinamen und eine kleine, fuer die App-Groesse passende State-Struktur ohne Overengineering.

## Externe Referenzen

Fuer zentrale technische Entscheidungen wurden aktuelle offizielle Dokumentationen verwendet:

- Expo-Dokumentation zu `expo-build-properties`
- Expo-Dokumentation zu SDK 54 und React Native 0.81
- Google-Dokumentation zu Places Autocomplete
- Google-Dokumentation zur Routes API `computeRoutes`
