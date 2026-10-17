# Samman Diwas Manager 3.0 — PWA launch fix

## Upload to the existing GitHub repository
1. Download and extract this ZIP.
2. Open the repository `SMDV` on GitHub.
3. Upload/replace the files in the repository root (same level as the existing `index.html`).
4. Upload all five files: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`.
5. Commit changes and wait for GitHub Pages to finish deploying.
6. Open https://aditya-1829.github.io/SMDV/ in Chrome and check that it works.

## Important
- This version explicitly sets the GitHub Pages repository path `/SMDV/` for the PWA start URL, scope, icons, and service worker.
- PIN remains `1829`.
- Data is saved locally on this device/browser. It does not cloud-sync.
- Back up your data before replacing existing files. Replacing files alone normally does not erase browser local storage, but clearing site data or uninstalling may affect access to local data.

## If the old installed shortcut still says “Could not open app”
After deploying the updated files:
1. Open the site in Chrome.
2. Reload the page twice and wait a few seconds.
3. Try opening the installed app again.
4. If the old shortcut still fails, remove only that broken home-screen app shortcut and install again from the updated website. Export a JSON backup first if you have data you need.
