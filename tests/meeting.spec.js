// import { test, expect } from '@playwright/test';

// for (let i = 1; i <= 1; i++) {
//   test(`test ${i}`, async ({ page }) => {
//     await page.goto('https://engine.chatyro.com/join/57fbf26f0798');

//     await expect(page.getByRole('heading', { name: 'test2' })).toBeVisible();

//      await page.getByRole('textbox', { name: 'Jane Doe' }).fill(`User ${i}`);
//      console.log(`user ${i} entered the meeting `)
//     await page.getByRole('button', { name: 'Join meeting' }).click();
//     console.log(`user ${i} clicked join meeting`)
//     await expect(page.getByRole('button', { name: 'Unmute' })).toBeVisible();

//     await page.getByRole('button', { name: 'Join meeting' }).click();
//     console.log(`user ${i} clicked join meeting again`)
//     await expect(page.getByRole('button', { name: 'Cam on' })).toBeVisible();

//     await page.getByRole('button', { name: 'Leave' }).click();
//     console.log(`user ${i} left the meeting`)
//   });
// }