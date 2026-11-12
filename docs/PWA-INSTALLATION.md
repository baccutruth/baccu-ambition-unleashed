# Install BACCU Ambition Unleashed

## Android — Chrome
1. Open https://baccutruth.github.io/baccu-ambition-unleashed/ in Chrome.
2. Use the **Install app** prompt if it appears.
3. Otherwise open Chrome's three-dot menu and choose **Install app** or **Add to Home screen**.
4. Confirm, then open the BACCU icon and test navigation.
5. If unavailable, update Chrome and retry over HTTPS.

## iPhone and iPad — Safari
1. Open the site in Safari.
2. Tap Share.
3. Choose **Add to Home Screen**.
4. Confirm and open the new icon.

iOS does not use Android's `beforeinstallprompt` event, so the install button may not appear there.

## Offline expectations
The service worker caches the local app shell. External opportunity providers still require internet. Offline mode does not refresh deadlines or verify current status.

## Physical-device QA
- [ ] Android Chrome installation completed.
- [ ] BACCU icon and standalone launch checked.
- [ ] Navigation, search and filters work after installation.
- [ ] Offline shell and online external links checked.
- [ ] iPhone Safari Add to Home Screen checked when an iPhone is available.

Record device, OS, browser and date. Never claim device testing without completing it.
