const { chromium } = require('playwright');

const URL = process.argv[2] || 'https://engine.chatyro.com/join/57fbf26f0798';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    console.log('Opening', URL);
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

    // Try text-based matches
    const matches = await page.locator('text=/Join meeting/i').elementHandles();
    if (matches.length === 0) {
      console.log('No direct text= matches for "Join meeting"');
    }

    for (const el of matches) {
      const outer = await el.evaluate((e) => e.outerHTML);
      const role = await el.evaluate((e) => e.getAttribute('role'));
      const id = await el.evaluate((e) => e.id);
      const classes = await el.evaluate((e) => e.className);
      const aria = await el.evaluate((e) => e.getAttribute('aria-label'));
      const text = await el.evaluate((e) => e.textContent.trim());
      console.log('--- MATCH ---');
      console.log('tag outerHTML:', outer.substring(0, 1000));
      console.log('id:', id || '(none)');
      console.log('class:', classes || '(none)');
      console.log('role attr:', role || '(none)');
      console.log('aria-label:', aria || '(none)');
      console.log('text:', text || '(none)');
    }

    // If no matches, try button elements and inspect their text
    if (matches.length === 0) {
      const buttons = await page.$$('button');
      console.log('Found', buttons.length, 'button elements - inspecting first 20');
      for (let i = 0; i < Math.min(buttons.length, 20); i++) {
        const el = buttons[i];
        const text = (await el.textContent())?.trim();
        const outer = await el.evaluate((e) => e.outerHTML);
        const id = await el.evaluate((e) => e.id);
        const classes = await el.evaluate((e) => e.className);
        const aria = await el.evaluate((e) => e.getAttribute('aria-label'));
        console.log(`-- button[${i}] text: "${text}"`);
        console.log('   id:', id || '(none)', 'class:', classes || '(none)', 'aria:', aria || '(none)');
        console.log('   outer snippet:', outer.substring(0, 200));
      }
    }

  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    await browser.close();
  }
})();
