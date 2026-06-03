const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (let i = 1; i <= 100; i++) {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://engine.chatyro.com/join/57fbf26f0798');

    try {
      await page.waitForSelector('button:has-text("Join meeting"):not([disabled])', { timeout: 60000 });
      await page.click('button:has-text("Join meeting"):not([disabled])');
      console.log(`User ${i} joined (enabled)`);
    } catch (e) {
      const btn = await page.$('button:has-text("Join meeting")');
      if (btn) {
        await btn.evaluate(b => b.removeAttribute('disabled'));
        await btn.click();
        console.log(`User ${i} joined (removed disabled)`);
      } else {
        console.error(`User ${i} failed: Join button not found`);
      }
    }

    await page.waitForTimeout(1000);
  }
})();