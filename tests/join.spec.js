const { chromium } = require('playwright');

(async () => {
    // headless: true to run smoothly in the background and prevent crashes/closures
    // We add fake device arguments so the application detects mock camera/mic devices
    const browser = await chromium.launch({ 
        headless: true,
        args: [
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream'
        ]
    });

    for (let i = 1; i <= 1; i++) {
        let context;
        let page;
        try {
            console.log(`\n🔄 User ${i} starting the join flow...`);
            // Grant permissions for camera and microphone
            context = await browser.newContext({
                permissions: ['microphone', 'camera']
            });
            page = await context.newPage();

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
            const secondJoinBtn = page.locator('button:has-text("Join meeting")').last();
            await secondJoinBtn.waitFor({ state: 'visible', timeout: 20000 });

            // Debug: Log all matching buttons to see what exists in the DOM
            const buttons = page.locator('button:has-text("Join meeting")');
            const count = await buttons.count();
            console.log(`🔍 Total 'Join meeting' buttons found in DOM: ${count}`);
            for (let j = 0; j < count; j++) {
                const html = await buttons.nth(j).evaluate(el => el.outerHTML);
                console.log(`   Button ${j}: ${html}`);
            }
            
            // Remove disabled attribute if present (as done in pages/join.js) to ensure it can be clicked
            await secondJoinBtn.evaluate(b => b.removeAttribute('disabled'));
            
            // Focus and trigger click with force: true, followed by native browser click dispatch
            await secondJoinBtn.focus();
            await secondJoinBtn.click({ force: true });
            await secondJoinBtn.evaluate(b => b.click());
            
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
            // Take a screenshot of the failure state to diagnose the issue
            try {
                await page.screenshot({ path: `tests/failure-user-${i}.png` });
                console.log(`📸 Saved failure screenshot to tests/failure-user-${i}.png`);
            } catch (screenshotError) {
                console.log(`⚠️ Could not take screenshot: ${screenshotError.message}`);
            }
            console.log(`⚠️ User ${i} failed to join: ${error.message}`);
        }
    }

    // Close the browser at the very end
    await browser.close();
    console.log('\n🎉 Finished running all user sessions.');
})();