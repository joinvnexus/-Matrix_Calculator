const { test } = require('@playwright/test');

test('verify styled buttons and error handling', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // Remove webpack overlay
  await page.evaluate(() => {
    const overlay = document.querySelector('#webpack-dev-server-client-overlay');
    if (overlay) overlay.remove();
    // Also try by tag name if ID is not exactly that
    const overlays = document.querySelectorAll('iframe');
    overlays.forEach(o => o.remove());
  });

  await page.waitForSelector('h1');
  await page.screenshot({ path: '/home/jules/verification/styled_ui.png', fullPage: true });

  // Force click if needed
  await page.click('button:has-text("Solve AX = B")', { force: true });

  await page.waitForSelector('.bg-red-100');
  await page.screenshot({ path: '/home/jules/verification/error_fixed.png', fullPage: true });
});
