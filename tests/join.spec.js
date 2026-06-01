const { chromium } = require('playwright');

(async () => {
    // headless: false so the user can visually see the flow in action
    const browser = await chromium.launch({ headless: false });

    for (let i = 1; i <= 1; i++) {
        try {
            console.log(`\n🔄 User ${i} starting the join flow...`);
            const context = await browser.newContext();
            const page = await context.newPage();

            page.setDefaultNavigationTimeout(45000);
            page.setDefaultTimeout(15000);

            // Step 1: Navigate to the join link
            await page.goto('https://engine.chatyro.com/join/57fbf26f0798');

            // Step 2: Fill the name input first to enable the Join button
            const nameInput = page.locator('input').first();
            await nameInput.waitFor({ state: 'visible', timeout: 15000 });
            await nameInput.fill(`User-${i}`);

            // Step 3: Click the first 'Join meeting' button on landing page
            const firstJoinBtn = page.getByRole('button', { name: 'Join meeting' }).first();
            await firstJoinBtn.click();
            console.log(`✓ User ${i} clicked first 'Join meeting' button`);

            // Step 4: Wait for Lobby page and click the second 'Join meeting' button
            const secondJoinBtn = page.locator('button:has-text("Join meeting")').first();
            await secondJoinBtn.waitFor({ state: 'visible', timeout: 20000 });
            await secondJoinBtn.click();
            console.log(`✓ User ${i} clicked second 'Join meeting' button (Lobby)`);

            // Step 5: Wait for the third page (Meeting Room) to load and show the Leave button
            const leaveBtn = page.locator('button:has-text("Leave")').first();
            await leaveBtn.waitFor({ state: 'visible', timeout: 25000 });
            console.log(`🎉 User ${i} successfully entered the meeting room!`);

            // Wait a brief moment to simulate presence in the meeting
            await page.waitForTimeout(2000);

            // Step 6: Click the UI 'Leave' button to exit cleanly
            await leaveBtn.click();
            console.log(`✓ User ${i} clicked UI 'Leave' button`);

            // Wait a small moment to let the exit register
            await page.waitForTimeout(1000);

            // Step 7: Close context to free resources
            await context.close();
            console.log(`🚪 User ${i} left & context closed cleanly.`);

        } catch (error) {
            console.log(`⚠️ User ${i} failed to join: ${error.message}`);
        }
    }

    // Close the browser at the very end
    await browser.close();
    console.log('\n🎉 Finished running all user sessions.');
})();