const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });

    for (let i = 1; i <= 100; i++) {
        try {
            const context = await browser.newContext();
            const page = await context.newPage();
            
            page.setDefaultNavigationTimeout(45000);
            page.setDefaultTimeout(15000);

            await page.goto('https://engine.chatyro.com/join/57fbf26f0798');

            // Fill the name input first to enable the Join button
            const nameInput = page.locator('input').first();
            await nameInput.waitFor({ state: 'visible', timeout: 10000 });
            await nameInput.fill(`User-${i}`);

            await page.getByRole('button', { name: 'Join meeting' }).click();

            console.log(`User ${i} joined`);

            await page.waitForTimeout(1000);
        } catch (error) {
            console.log(`⚠️ User ${i} failed to join: ${error.message}`);
        }
    }
})();