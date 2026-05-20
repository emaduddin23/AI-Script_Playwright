<div align="center">

# 🎭 Playwright Automation

**Production-ready end-to-end browser testing with the Page Object Model**

[![Playwright](https://img.shields.io/badge/Playwright-1.44-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

Clean, readable tests with shared page classes, reusable actions, auto-screenshots on failure, and full Docker support.

[Installation](#-installation) · [Running Tests](#-running-tests) · [Docker](#-running-in-docker) · [Writing Tests](#-writing-a-new-test) · [Configuration](#-configuration)

</div>

---

## ✨ Features

- **Page Object Model** — locators and actions live in dedicated page classes; tests stay clean and readable
- **Shared fixtures** — `loginPage`, `dashboardPage`, and `authenticatedPage` are injected automatically into every test
- **Auto-screenshots** — Playwright captures a screenshot, video, and trace on every failure automatically
- **Environment variables** — base URL and credentials are never hard-coded; `.env` keeps them local
- **Docker support** — the official Playwright image ships with all browsers pre-installed; no local setup needed for CI
- **HTML report** — one command opens a full visual report with logs, screenshots, and traces

---

## 📁 Project structure

```
playwright-automation/
├── pages/
│   ├── BasePage.js          # Shared helpers: navigate, click, fill, assert, screenshot
│   ├── LoginPage.js         # Login screen — locators + signIn() / expectError()
│   └── DashboardPage.js     # Dashboard — locators + navigateTo() / signOut()
├── tests/
│   ├── navigation.test.js   # Smoke tests — public pages, HTTP status, JS errors
│   ├── login.test.js        # Login — happy path, wrong password, empty fields
│   └── dashboard.test.js    # Dashboard — content, nav links, sign-out
├── utils/
│   └── fixtures.js          # Custom fixtures that wire page objects into tests
├── screenshots/             # On-demand screenshots (git-ignored)
├── test-results/            # Raw artefacts: JSON, videos, traces (git-ignored)
├── playwright-report/       # HTML report generated after each run (git-ignored)
├── playwright.config.js     # Central Playwright configuration
├── Dockerfile               # Container image for CI / isolated runs
├── docker-compose.yml       # Convenience wrapper for Docker runs
├── .env.example             # Template — copy to .env and fill in your values
└── package.json
```

---

## 🔧 Requirements

| Tool | Minimum version |
|------|----------------|
| Node.js | 18 |
| npm | 9 |

> **Docker** is optional — see [Running in Docker](#-running-in-docker) if you prefer a container-based setup.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/playwright-automation.git
cd playwright-automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install browser binaries

```bash
npm run install:browsers
```

This downloads Chromium (and Firefox / WebKit if you enable them in `playwright.config.js`).

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
# Root URL of the application under test
BASE_URL=https://your-app.com

# Credentials used by the sign-in tests
LOGIN_EMAIL=user@example.com
LOGIN_PASSWORD=your_password_here
```

> `.env` is listed in `.gitignore` and will never be committed to version control.

---

## 🚀 Running tests

### Run all tests

```bash
npm test
```

### Run a single test file

```bash
npx playwright test tests/login.test.js
```

### Run tests matching a keyword

```bash
npx playwright test --grep "dashboard"
```

### Run with the browser visible (headed mode)

```bash
npm run test:headed
```

### Open Playwright's interactive UI explorer

```bash
npm run test:ui
```

### Step through a test in the debugger

```bash
npm run test:debug
```

---

## 📊 Viewing the HTML report

After any test run, open the full visual report:

```bash
npm run report
```

The report (at `playwright-report/index.html`) shows pass/fail status, error messages, captured screenshots, videos, and traces for every failing test.

---

## 🐳 Running in Docker

No local Node.js or browser installation required — the official Playwright image includes everything.

### Build the image

```bash
docker build -t playwright-tests .
```

### Run all tests

```bash
docker run --rm --env-file .env playwright-tests
```

### Run a single file

```bash
docker run --rm --env-file .env playwright-tests \
  npx playwright test tests/login.test.js
```

### Using Docker Compose (recommended)

Reports and screenshots are written back to your local directories automatically:

```bash
# Run all tests
docker compose run --rm tests

# Run a specific file
docker compose run --rm tests npx playwright test tests/navigation.test.js
```

---

## ✍️ Writing a new test

### 1. Create a page class

```js
// pages/SettingsPage.js
const { BasePage } = require('./BasePage');

class SettingsPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading    = page.locator('h1');
    this.saveButton = page.locator('button:has-text("Save")');
  }

  async open() {
    await super.open('/settings');
  }
}

module.exports = { SettingsPage };
```

### 2. Register it as a fixture

```js
// utils/fixtures.js  (add inside the base.extend({}) call)
const { SettingsPage } = require('../pages/SettingsPage');

settingsPage: async ({ page }, use) => {
  await use(new SettingsPage(page));
},
```

### 3. Write the test

```js
// tests/settings.test.js
const { test, expect } = require('../utils/fixtures');

test('settings page loads after login', async ({ authenticatedPage, settingsPage }) => {
  await settingsPage.open();
  await settingsPage.expectVisible('h1');
  await settingsPage.expectUrlContains('/settings');
});
```

---

## ⚙️ Configuration

All settings live in `playwright.config.js`. The most common things to change:

| Setting | Where | Default |
|---------|-------|---------|
| App URL | `BASE_URL` in `.env` | `https://example.com` |
| Browsers | `projects` array in config | Chromium only |
| Retries on CI | `retries` | 2 |
| Action timeout | `actionTimeout` | 15 s |
| Navigation timeout | `navigationTimeout` | 30 s |
| Screenshots | `screenshot` | On failure only |
| Video | `video` | Retained on failure |

To enable Firefox or WebKit, uncomment the relevant block in `playwright.config.js`:

```js
// {
//   name: 'firefox',
//   use: { ...devices['Desktop Firefox'] },
// },
// {
//   name: 'webkit',
//   use: { ...devices['Desktop Safari'] },
// },
```

---

## 🌍 Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BASE_URL` | Yes | Root URL of the application under test |
| `LOGIN_EMAIL` | For auth tests | Email address used to sign in |
| `LOGIN_PASSWORD` | For auth tests | Password used to sign in |

---

## 📋 Scripts reference

| Command | What it does |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:headed` | Run all tests with the browser visible |
| `npm run test:ui` | Open Playwright's interactive UI mode |
| `npm run test:debug` | Step through tests one action at a time |
| `npm run report` | Open the HTML report in the browser |
| `npm run codegen` | Record a new test by clicking through the app |
| `npm run install:browsers` | Download Playwright browser binaries |

---

## 🗂️ How the Page Object Model works

```
BasePage
│  navigate · click · fill · expectText · expectVisible · screenshot · wait
│
├── LoginPage          extends BasePage
│     open() · enterCredentials() · submit() · signIn() · expectError()
│
└── DashboardPage      extends BasePage
      open() · expectLoaded() · navigateTo() · signOut() · getNotificationText()
```

Tests never reference raw CSS selectors. They call methods on page objects, which makes tests readable as plain English and means a selector change only needs to be fixed in one place.

---

## 📄 License

MIT
