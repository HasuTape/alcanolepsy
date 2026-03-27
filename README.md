# Alcanolepsy — strona i wiki

To jest prosta strona statyczna (`website/`) z wiki (`website/wiki/`).

## Hosting

Możesz wrzucić folder `website/` na:

- GitHub Pages (jako root strony),
- Firebase Hosting,
- dowolny serwer statyczny.

## Pobieranie najnowszej wersji (APK)

Strona potrafi pobrać link do APK z Firestore: `appConfig/update.downloadUrl`.

1) W Firebase Console dodaj Web App i skopiuj config.
2) Wklej go do `website/assets/firebase-config.js`.
3) W apce, jako admin, wgraj APK w `Konto` (ustawi `downloadUrl` automatycznie).

