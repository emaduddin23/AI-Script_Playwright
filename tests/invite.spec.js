import { test, expect } from '@playwright/test';

test('Check Invite and Add User functionality', async ({ page }) => {
    // 1. Navigate to the login page
    // Note: Update this URL if the admin dashboard is on a different subdomain (e.g. app.chatyro.com/login)
    await page.goto('https://engine.chatyro.com/login'); 

    // 2. Fill in the email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 }).catch(() => console.log('Email input not found, URL might be different'));
    if (await emailInput.isVisible()) {
        await emailInput.fill('admin@gmail.com');
        
        // 3. Fill in the password
        const passwordInput = page.locator('input[type="password"]');
        await passwordInput.fill('1q2w3E*');

        // 4. Click the login/submit button
        await page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Sign in")').first().click();

        // 5. Wait for the page to load after login
        await page.waitForTimeout(5000); 
        console.log('Logged in! Current URL:', page.url());
    } else {
        console.log('Could not find login fields on this URL:', page.url());
    }

    // 6. Extract all buttons and links to find where Invites/Users are located
    const allTextContents = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('a, button, [role="button"], [role="link"]'));
        return Array.from(new Set(elements.map(el => el.innerText?.trim() || el.textContent?.trim()))).filter(Boolean);
    });

    const inviteRelated = allTextContents.filter(text => 
        text.toLowerCase().includes('invite') || 
        text.toLowerCase().includes('add user') || 
        text.toLowerCase().includes('add') || 
        text.toLowerCase().includes('team') || 
        text.toLowerCase().includes('users')
    );

    console.log('Found the following related buttons/links on the page:', inviteRelated);

    // 7. Pause the script here so you can use the Playwright Inspector
    // This allows you to visually check the UI and interact with the page.
    console.log("Playwright Inspector will now open. You can manually navigate and verify the invite feature.");
    await page.pause();
});
