# rund-ums-stillen.de

Statische Website für die Stillberatung von Inna Singer (GitHub Pages).

## Offene Platzhalter (gelb markiert auf der Seite)
- Fotos: `assets/img/inna.jpg` (Kreis im Hero) und `assets/img/inna-portrait.jpg` – im HTML auskommentierte `<img>`-Zeilen aktivieren
- Region / Einzugsgebiet, Qualifikation, persönlicher Text, Sprachen
- Dauer und Preise je Phase, Rückmeldezeit
- Impressum und Datenschutz vollständig ausfüllen
- E-Mail `kontakt@rund-ums-stillen.de` muss bei Strato existieren (oder überall ersetzen)
- Formular: `data-endpoint` in `index.html` auf einen Formular-Dienst setzen (z. B. Formspree), sonst öffnet sich das E-Mail-Programm

## Design
Leitidee „rund ums“: der Stillkreis mit den fünf Phasen. Hell = Milchweiß/Nachtblau, Dunkel = Nachtlicht.
Rundschrift (`ui-rounded`, Fallback Nunito lokal), Systemschrift für Text. Keine externen Dienste, keine Cookies.
