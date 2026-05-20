# docker-compose.yml
# ---------------------------------------------------------------------------
# Convenience wrapper around the Playwright container.
#
# Usage:
#   docker compose run --rm tests                         # run all tests
#   docker compose run --rm tests npx playwright test tests/login.test.js
#   docker compose run --rm tests npx playwright show-report
# ---------------------------------------------------------------------------

services:
  tests:
    build: .
    # Mount local directories so reports and screenshots are available on the
    # host after the container exits — no need to docker cp anything.
    volumes:
      - ./playwright-report:/app/playwright-report
      - ./test-results:/app/test-results
      - ./screenshots:/app/screenshots
    # Load environment variables from the local .env file
    env_file:
      - .env
    # Chromium inside Docker requires these flags to run without a GPU / display
    environment:
      - PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
