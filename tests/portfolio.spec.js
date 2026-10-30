import { expect, test } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

test('renders original work and all three new projects without page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('built for impact.');
  for (const name of ['VDODL', 'Clipping', 'Storyteller']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('button', { name: 'View EIKEN VOCABULARY APP case study' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View GLI ONLINE CLASSROOM case study' })).toBeVisible();
  await expect(page.locator('a[href^="https://github.com/ttolaaa"]')).not.toHaveCount(0);
  await expect(page.locator('img')).toHaveCount(3);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('introduces six years in IT, infrastructure work, ITIL, and current experience', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Tola Som — Microsoft CO+I DC Technician · built for impact, from code to cloud');
  await expect(page.locator('.hero-description')).toContainText('3.5 years as a system developer');
  await expect(page.locator('.hero-description')).toContainText('Microsoft Japan');
  const glance = page.getByRole('region', { name: 'Career at a glance' });
  await expect(glance).toContainText('6+');
  await expect(glance).toContainText('Program management');
  await expect(glance).toContainText('ITIL® 4 Foundation');
  const impact = page.getByRole('region', { name: 'Real infrastructure. Explained simply.' });
  for (const name of ['New datacenter capacity', 'AI GPU deployments', 'Breakfix maintenance', 'End-of-life decommission']) {
    await expect(impact.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(impact.getByText('Led AMD MI300X & NVIDIA H200')).toBeVisible();
  await expect(impact.locator('.impact-highlight')).toHaveCount(4);
  await page.getByRole('link', { name: 'See what I do' }).click();
  await expect(impact).toBeInViewport();
  const careerSection = page.getByRole('region', { name: 'From interfaces to infrastructure.' });
  await expect(careerSection.getByRole('heading', { name: 'Data Center Technician', exact: true })).toBeVisible();
  await expect(careerSection.getByText('May 2024 - Present', { exact: true })).toBeVisible();
  await expect(careerSection.getByRole('heading', { name: 'System Engineer', exact: true })).toBeVisible();
  await expect(careerSection.getByText('Dec 2020 - May 2024', { exact: true })).toBeVisible();
  await expect(careerSection.locator('.certifications li')).toHaveCount(6);
  await expect(careerSection.getByRole('heading', { name: 'ITIL® 4 Foundation', exact: true })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('GR671898055TS');
});

test('filters projects, keeps previews interactive, and opens an accessible project dialog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '4K', exact: true }).click();
  await expect(page.getByRole('button', { name: '4K', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '60s', exact: true }).click();
  await expect(page.locator('.scene-time').first()).toHaveText('01:00');
  await page.getByRole('button', { name: 'Explore project' }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'VDODL' })).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Explore on GitHub' })).toHaveAttribute('href', 'https://github.com/ttolaaa/VDODL');
  await expect.poll(() => dialog.locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore project' }).first()).toBeFocused();
  await page.getByRole('button', { name: 'Product design', exact: true }).click();
  await expect(page.locator('.tool-card')).toHaveCount(0);
  await expect(page.locator('.experience-card')).toHaveCount(1);
  await expect(page.locator('.work-count')).toHaveText('01 projects / made with care');
  await page.getByRole('button', { name: 'Web apps', exact: true }).click();
  await expect(page.locator('.experience-card.gli')).toHaveCount(1);
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await expect(page.locator('.tool-card')).toHaveCount(3);
  await expect(page.locator('.experience-card')).toHaveCount(0);
});

test('theme persists, archive expands, and footer has no install button', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('.archive summary').click();
  await expect(page.getByRole('heading', { name: 'GlowTracker' })).toBeVisible();
  await expect(page.locator('footer')).not.toContainText('Install');
});

test('voice preview uses speech synthesis and can be stopped', async ({ page }) => {
  await page.addInitScript(() => {
    window.__spoken = '';
    window.speechSynthesis.speak = (utterance) => { window.__spoken = utterance.text; };
    window.speechSynthesis.cancel = () => { window.__spoken = ''; };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Play voice preview' }).click();
  await expect.poll(() => page.evaluate(() => window.__spoken)).toContain('Every great story');
  await page.getByRole('button', { name: 'Stop voice preview' }).click();
  await expect.poll(() => page.evaluate(() => window.__spoken)).toBe('');
});

test('stays within the viewport at phone, tablet, desktop, and ultrawide sizes', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 375, 390, 650, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 950 });
    const measurements = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(measurements.content, `Horizontal overflow at ${width}px`).toBeLessThanOrEqual(measurements.viewport);
  }
});

test('PWA manifest has real icons and portfolio reloads offline', async ({ page, context, request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest.display).toBe('standalone');
  expect(manifest.start_url).toBe('/');
  for (const icon of manifest.icons) {
    const image = await request.get(icon.src);
    expect(image.ok()).toBe(true);
    const data = await image.body();
    const size = Number(icon.sizes.split('x')[0]);
    expect(data.readUInt32BE(16)).toBe(size);
    expect(data.readUInt32BE(20)).toBe(size);
  }
  await page.goto('/');
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
    }
    return Boolean(registration.active);
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'VDODL', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Explore project' }).nth(1).click();
  await expect.poll(() => page.getByRole('dialog').locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.getByRole('status')).toContainText("You're offline.");
  await context.setOffline(false);
});

test('preserves previous about and Eiken case study entry points', async ({ page }) => {
  await page.goto('/eiken-app-case-study');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Eiken Vocabulary App', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close project' }).click();
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'Software, product, and infrastructure.' })).toBeInViewport();
});

test('activates new service workers and reloads without an update button', async ({ page }) => {
  let version = 1;
  const root = resolve('dist');
  const types = { '.js': 'application/javascript', '.css': 'text/css', '.html': 'text/html', '.webmanifest': 'application/manifest+json' };
  // Service worker update fetches bypass Playwright page routing. Serve real releases instead.
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(`${root}${sep}`)) { response.writeHead(403).end(); return; }
    try {
      let body = await readFile(file);
      if (pathname === '/sw.js') body = Buffer.from(`${body.toString()}\n// Deployed release ${version}\n`);
      const extension = file.slice(file.lastIndexOf('.'));
      response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
    } catch (error) {
      if (error.code === 'ENOENT') response.writeHead(404).end();
      else { response.writeHead(500).end(); console.error('Test release server failed:', error); }
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  try {
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise((resolve) => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
      }
    });
    version = 2;
    const reloaded = page.waitForEvent('load');
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await reloaded;
    await expect(page.getByRole('heading', { level: 1 })).toContainText('built for impact.');
    await expect(page.getByRole('button', { name: 'Update', exact: true })).toHaveCount(0);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
