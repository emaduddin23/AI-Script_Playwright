import { test, expect } from '@playwright/test';

for (let i = 1; i <= 1; i++) {
  test('test', async ({ page }) => {
    await page.goto('https://engine.chatyro.com/join/57fbf26f0798');

    await expect(page.getByRole('heading', { name: 'test2' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Jane Doe' }).fill('test 2');
    await page.getByRole('button', { name: 'Join meeting' }).click();

    await expect(page.getByRole('button', { name: 'Unmute' })).toBeVisible();

    await page.getByRole('button', { name: 'Join meeting' }).click();

    await expect(page.getByRole('button', { name: 'Cam on' })).toBeVisible();

    await page.getByRole('button', { name: 'Leave' }).click();
  });
}