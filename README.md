# Clinical Dosing Suite - PWA package (prototype, not clinically validated)

## Host it (free, 3 minutes)
Upload ALL files in this folder to any HTTPS static host: Netlify Drop (app.netlify.com/drop), GitHub Pages, or Cloudflare Pages.

## Install on a phone
- iPhone: open the link in Safari > Share > Add to Home Screen.
- Android: open in Chrome > Install app.
It then works offline (service worker caches the app; no patient data is stored or sent).

## Update
Change files, then bump `dosing-v1` in sw.js to `dosing-v2` so phones refresh the cache.

## Store apps (App Store / Google Play)
Wrap this folder with Capacitor (npx cap init; npx cap add ios android) - requires your Apple ($99/yr) and Google ($25 once) developer accounts. Read the regulatory summary first.
