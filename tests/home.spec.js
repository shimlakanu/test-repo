const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the personal introduction', async ({ page }) => {
  await expect(page).toHaveTitle("Hi, I'm Shimla.");
  await expect(page.getByRole('heading', { name: "Hi, I'm Shimla." })).toBeVisible();
  await expect(page.getByText('Hi,', { exact: true })).toBeVisible();
  await expect(page.getByText('I’m Shimla.', { exact: true })).toBeVisible();
});

test('finishes the entrance animation in a visible state', async ({ page }) => {
  const words = page.locator('h1 span');

  await expect(words).toHaveCount(2);
  await expect(words.first()).toHaveCSS('opacity', '1');
  await expect(words.last()).toHaveCSS('opacity', '1');
  await expect(words.first()).toHaveCSS('filter', 'blur(0px)');
});

test('keeps the introduction centered without horizontal overflow', async ({ page }) => {
  const heading = page.getByRole('heading', { name: "Hi, I'm Shimla." });
  const box = await heading.boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(Math.abs((box.x + box.width / 2) - viewport.width / 2)).toBeLessThan(3);

  const hasOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
});

test('respects reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();

  const firstWord = page.locator('h1 span').first();
  await expect(firstWord).toHaveCSS('animation-name', 'none');
  await expect(firstWord).toHaveCSS('opacity', '1');
});
