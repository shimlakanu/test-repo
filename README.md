# Personal one-page website

Open `index.html` directly in any modern browser. No server, installation, or build step is required.

The site is fully static and consists only of HTML and CSS.

Replace the LinkedIn URL in `index.html` with your profile link.

## Browser tests

Install the test dependencies and Chromium once:

```bash
npm install
npx playwright install chromium
```

Run the same browser suite used by GitHub Actions:

```bash
npm test
```

The suite tests desktop and mobile Chromium layouts. Pull requests to `main` run it automatically through `.github/workflows/browser-tests.yml`.
