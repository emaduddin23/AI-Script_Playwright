const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  
  const urls = [
    { name: 'Getting Started', url: 'https://engine.chatyro.com/docs/getting-started' },
    { name: 'Quick Start Guide', url: 'https://engine.chatyro.com/docs/quick-start' },
    { name: 'API Reference', url: 'https://engine.chatyro.com/docs/api-reference' },
    { name: 'React SDK', url: 'https://engine.chatyro.com/docs/react-sdk' }
  ];
  
  let docs = '';
  
  for (const item of urls) {
    console.log(`Navigating to ${item.name}...`);
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const bodyText = await page.evaluate(() => document.body.innerText);
    docs += `\n\n==================== ${item.name} ====================\n${bodyText}\n`;
  }
  
  fs.writeFileSync('chatyro-docs.txt', docs);
  console.log('Docs saved to chatyro-docs.txt');
  
  await browser.close();
})();
