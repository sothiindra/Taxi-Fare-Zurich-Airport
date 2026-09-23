# Taxi Fare: Zurich Airport

Eine moderne Expo-/React-Native-App für Android, die den geschätzten Taxipreis vom Ankunftsbereich des Flughafens Zürich zu einem frei wählbaren Ziel berechnet. Die App ist keine Buchungs-App. Sie zeigt ausschliesslich eine Schätzung mit transparenter Kostenaufschlüsselung.

## Funktionen

- Fester Abfahrtsort: Flughafen Zürich Arrival
- Adressen, Orte und Points of Interest über HERE Autosuggest
- Berechnung nur nach Auswahl eines von HERE geprüften Vorschlags
- Auflösung der gewählten HERE-ID in eindeutige Koordinaten
- Fahrdistanz und verkehrsabhängige Fahrzeit über HERE Routing API v8
- Keine Karte und keine Routenansicht
- Tarifberechnung in CHF
- Deutsch als Standardsprache sowie Englisch
- Lokal gespeicherte Sprache und letzte Ziele
- Expo SDK 57 und Android API 36

## Tarif

Die Werte befinden sich zentral in `src/constants/tariff.ts`:

- Grundgebühr: 6.00 CHF
- Distanzpreis: 4.40 CHF pro Kilometer
- Zeitpreis: 0.80 CHF pro Minute

```text
Gesamtpreis = 6.00 + (Kilometer × 4.40) + (Minuten × 0.80)
```

Die verkehrsabhängige HERE-Fahrtdauer wird für die Zeitkosten verwendet. Geldbeträge werden auf zwei Nachkommastellen gerundet und in CHF formatiert.

## Tech-Stack

- Expo SDK 57
- React Native 0.86
- React Native und TypeScript
- React Navigation
- i18next und react-i18next
- AsyncStorage
- HERE Geocoding & Search API v7
- HERE Routing API v8

## Voraussetzungen

- Node.js 22.13 oder neuer
- npm
- Für Expo Go: aktuelles Expo Go auf einem Android-Gerät oder Android-Emulator
- Für native Builds: Android Studio mit Android SDK 36 oder neuer
- Kostenloses HERE-Konto
- HERE API Key

## Installation

```powershell
npm install
Copy-Item .env.example .env
```

Trage danach deinen HERE API Key in `.env` ein:

```env
EXPO_PUBLIC_HERE_API_KEY=dein_here_api_key
```

Starte Expo nach jeder Änderung an `.env` vollständig neu:

```powershell
npx expo start --clear
```

Öffne danach Expo Go und scanne den QR-Code. Bei einem angeschlossenen Android-Gerät oder laufenden Emulator kann Expo Go direkt gestartet werden:

```powershell
npm run android
```

`npm run android` startet bewusst Expo Go. Für einen lokalen nativen Android-Build steht separat folgender Befehl zur Verfügung:

```powershell
npm run android:native
```

## HERE API Key Schritt für Schritt einrichten

### 1. HERE-Konto erstellen

1. Öffne [HERE Platform](https://platform.here.com/).
2. Erstelle ein Konto oder melde dich an.
3. Wähle einen für dein Nutzungsvolumen passenden Plan. Für Entwicklung und private Nutzung reicht normalerweise der kostenlose Einstiegstarif.
4. Prüfe auf der [HERE-Preisseite](https://www.here.com/get-started/pricing), welche aktuellen Tageslimits für deinen Plan gelten.

### 2. Eine HERE-App registrieren

1. Öffne in der HERE Platform den `Access Manager`.
2. Wechsle zum Bereich `Apps`.
3. Klicke auf `Register new app`.
4. Verwende beispielsweise den Namen `Taxi Fare: Zurich Airport`.
5. Füge optional eine kurze Beschreibung hinzu.
6. Schliesse die Registrierung ab.

HERE erstellt dabei eine eindeutige App-ID. Eine HERE-App sollte nur für diese Anwendung verwendet werden.

### 3. API Key erzeugen

1. Öffne die gerade registrierte HERE-App.
2. Wechsle zum Tab `Credentials`.
3. Öffne den Bereich `API Keys`.
4. Klicke auf `Create API key`.
5. Bewahre den Schlüssel sicher auf und veröffentliche ihn nicht in Git.

HERE erlaubt üblicherweise zwei API Keys pro registrierter App. Damit kann später ein Schlüssel ausgetauscht werden, ohne die App sofort zu unterbrechen.

### 4. Benötigte HERE-Dienste prüfen

Diese App benötigt Zugriff auf:

- Geocoding & Search API v7
  - Autosuggest für Live-Vorschläge
  - Lookup für die Koordinaten eines ausgewählten Vorschlags
- Routing API v8
  - Fahrdistanz
  - Fahrtdauer mit aktuellem Verkehr

Bei HERE werden diese Dienste über die Berechtigungen und Limits deines Plans bereitgestellt. Falls ein Dienst im Konto nicht verfügbar ist, prüfe den gewählten Plan und die App-Berechtigungen.

### 5. API Key lokal eintragen

Lege im Projektstamm eine Datei `.env` an. Als Vorlage dient `.env.example`:

```env
EXPO_PUBLIC_HERE_API_KEY=dein_here_api_key
```

Die echte `.env` ist über `.gitignore` ausgeschlossen und darf nicht committed werden.

### 6. Expo neu starten

Eine laufende Expo-Instanz übernimmt geänderte Environment-Variablen nicht immer automatisch. Stoppe Expo und starte mit geleertem Cache neu:

```powershell
npx expo start --clear
```

Zum erneuten Start in Expo Go:

```powershell
npm run android
```

### 7. Integration testen

1. Öffne die App.
2. Tippe mindestens drei Zeichen in das Zielfeld.
3. Prüfe, ob `Powered by HERE` und passende Vorschläge erscheinen.
4. Wähle einen Vorschlag aus.
5. Tippe auf `Preis schätzen`.
6. Prüfe, ob Distanz, Fahrzeit und Preis erscheinen.

Die Fahrzeit nutzt aktuellen Verkehr, weil die Routing-Anfrage keine feste Abfahrtszeit übermittelt. HERE verwendet in diesem Fall automatisch den Zeitpunkt der Anfrage und aktiviert verkehrsabhängiges Routing.

## Sicherheit des API Keys

`EXPO_PUBLIC_`-Variablen sind in einer gebauten mobilen App grundsätzlich auslesbar. Die `.env` verhindert nur, dass der Schlüssel versehentlich ins Repository gelangt; sie macht ihn im APK nicht geheim.

Für diese private erste Version entspricht das der gewünschten Architektur. Für eine öffentlich verteilte App empfiehlt sich später:

- ein kleiner eigener Proxy-Server
- serverseitige HERE-Zugangsdaten
- Authentifizierung der App gegenüber dem Proxy
- serverseitige Ratenbegrenzung
- Überwachung der HERE-Nutzung und Limits

## HERE-Ablauf in der App

1. Autosuggest liefert Vorschläge während der Eingabe.
2. Jeder auswählbare Vorschlag enthält eine eindeutige HERE-ID.
3. Lookup löst die HERE-ID in Koordinaten auf.
4. Routing API v8 berechnet die Route vom festen Flughafen-Startpunkt zu diesen Koordinaten.
5. Die Summen aller Routensektionen liefern Meter und Sekunden.
6. `duration` enthält die verkehrsabhängige Dauer; `baseDuration` wird nur intern als Referenz gespeichert.
7. Die Tariflogik berechnet daraus den geschätzten Fahrpreis.

## Projektstruktur

```text
.
|-- App.tsx
|-- app.config.ts
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
|   |   |-- hereLocation.ts
|   |   `-- storage.ts
|   |-- theme
|   |-- types
|   |   `-- location.ts
|   `-- utils
`-- README.md
```

Wichtige Dateien:

- `src/services/hereLocation.ts`: HERE Autosuggest, Lookup und Routing
- `src/config/env.ts`: zentraler Zugriff auf den HERE API Key
- `src/constants/app.ts`: fixer Startpunkt Flughafen Zürich Arrival
- `src/constants/tariff.ts`: zentrale Tarifwerte
- `src/utils/fare.ts`: Preisberechnung
- `src/utils/format.ts`: CHF-, Distanz- und Zeitformatierung
- `src/i18n/resources/de.ts`: Schweizer Hochdeutsch
- `src/i18n/resources/en.ts`: englische Übersetzung

## Lokalisierung

Die App startet beim ersten Mal auf Deutsch. Die Sprache wird nicht automatisch anhand der Gerätesprache geändert. Nutzer können Deutsch oder Englisch im Settings-Screen wählen. Die Auswahl wird über AsyncStorage gespeichert.

Die deutschen Texte verwenden Schweizer Hochdeutsch, insbesondere `ss` statt `ß`.

## Lokale Speicherung

Gespeichert werden:

- die gewählte Sprache
- bis zu fünf zuletzt verwendete HERE-Ziele

Alte Ziel-IDs anderer Anbieter werden beim Laden verworfen, da sie nicht mit HERE Lookup kompatibel sind. Der Verlauf kann im Settings-Screen vollständig gelöscht werden.

## App Icons

Folgende Placeholder sind bereits eingebunden:

- `assets/icon.png`
- `assets/adaptive-icon-foreground.png`
- `assets/adaptive-icon-background.png`
- `assets/splash-icon.png`

Die Dateien können später durch finale PNGs mit denselben Namen ersetzt werden. Empfohlen sind 1024 × 1024 Pixel.

## Troubleshooting

### Keine Vorschläge erscheinen

- Prüfe, ob `.env` vorhanden ist.
- Prüfe den Namen `EXPO_PUBLIC_HERE_API_KEY` auf Tippfehler.
- Starte Expo mit `npx expo start --clear` neu.
- Prüfe in der HERE Platform, ob der Schlüssel aktiv ist.
- Prüfe, ob das Tageslimit erreicht wurde.

### Fehler 401 oder 403

- Der API Key ist ungültig, deaktiviert oder besitzt nicht die nötigen Berechtigungen.
- Erzeuge bei Bedarf einen neuen Key in `Access Manager` → `Apps` → `Credentials`.
- Prüfe, ob Geocoding & Search und Routing im gewählten Plan enthalten sind.

### Fehler 429

Das Anfrage- oder Tageslimit wurde erreicht. Warte bis zur Rücksetzung des Limits oder passe den HERE-Plan an. Die App reduziert Autosuggest-Anfragen bereits mit einer kurzen Verzögerung nach der Eingabe.

### Ziel kann nicht aufgelöst werden

HERE Autosuggest kann auch allgemeine Suchvorschläge liefern. Die App zeigt nur Einträge mit HERE-ID an. Falls Lookup trotzdem keine Position liefert, wähle einen anderen Vorschlag.

### Route kann nicht berechnet werden

- Das Ziel ist eventuell nicht mit dem Auto erreichbar.
- Prüfe den Routing-Zugriff des API Keys.
- Teste eine normale Strassenadresse als Ziel.

## Nützliche HERE-Dokumentation

- [HERE Autosuggest und Search](https://docs.here.com/geocoding-and-search/docs/introduction-to-here-geocoding-search-api-v7)
- [HERE Lookup nach Auswahl eines Vorschlags](https://docs.here.com/routing/docs/routing-v8-waypoints-from-search)
- [HERE Routing API v8 Einstieg](https://docs.here.com/routing/docs/routing-v8-get-started)
- [Verkehr in HERE Routing](https://docs.here.com/routing/docs/routing-v8-traffic-in-routing)
- [HERE Preise und Limits](https://www.here.com/get-started/pricing)
