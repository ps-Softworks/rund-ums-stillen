# rund-ums-stillen.de

Statische Website für die Stillberatung von Inna Singer (GitHub Pages).

## Offene Platzhalter (gelb markiert auf der Seite)
- Fotos: `assets/img/inna.jpg` (Kreis im Hero) und `assets/img/inna-portrait.jpg` – im HTML auskommentierte `<img>`-Zeilen aktivieren
- Stillberatung: Dauer und Preis für Hausbesuch und Online, Einzugsgebiet der Hausbesuche
- Impressum und Datenschutz vollständig ausfüllen
- Workshop-Termin „Sanftes Abstillen“ (30.11.2026) nach Ablauf ersetzen/entfernen (Abschnitt `#termine`)
- Formular: `data-endpoint` in `index.html` auf einen Formular-Dienst setzen (z. B. Formspree), sonst öffnet sich das E-Mail-Programm

## Design
Leitidee „rund ums“: der Stillkreis mit den fünf Phasen. Hell = Milchweiß/Nachtblau, Dunkel = Nachtlicht.
Rundschrift (`ui-rounded`, Fallback Nunito lokal), Systemschrift für Text. Keine externen Dienste, keine Cookies.

## Cache
Nach Änderungen an CSS/JS die Versionsnummer `?v=…` in den HTML-Dateien erhöhen, sonst zeigen Browser die alte Fassung.
