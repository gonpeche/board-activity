# Mural

React + Vite app to filter and sort sticky-note cards from a session. Data is loaded from `public/cards.json`.

## Setup

Clone the repository, then install dependencies from the project root:

```bash
npm install
```

## Run the app locally

Start the Vite dev server (default URL is printed in the terminal, usually `http://localhost:5173`):

```bash
npm run dev
```

## Run tests locally

### Unit and integration tests (Jest)

Jest runs tests under `test/unit/` and `test/integration/` (React Testing Library where applicable):

```bash
npm run test:jest
```

### End-to-end tests (Playwright)

E2E specs live in `test/e2e/`. The Playwright config starts the dev server on `http://127.0.0.1:4173` automatically.

Install browser binaries once (needed before the first E2E run):

```bash
npx playwright install chromium
```

Then run E2E tests:

```bash
npm run test:e2e
```

### Full suite

Run Jest, then Playwright:

```bash
npm test
```

Ensure `npx playwright install chromium` has been run at least once so Playwright can launch the browser.
