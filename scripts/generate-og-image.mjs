import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

// 1200x627 is LinkedIn's recommended share-image size (also works for Open Graph/X).
const font = (file) => `data:font/ttf;base64,${readFileSync(`public/fonts/${file}`).toString('base64')}`;

const browser = await chromium.launch();

// Capture the hero illustration (browser + code cards) from the real site so the share card stays in sync with it.
const server = await createServer({ server: { port: 0, host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const site = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
await site.goto(server.resolvedUrls.local[0], { waitUntil: 'load' });
await site.evaluate(() => document.fonts.ready);
await site.waitForTimeout(800);
const art = `data:image/png;base64,${(await site.locator('.hero-art-canvas').screenshot({ omitBackground: true })).toString('base64')}`;
await server.close();

const html = `<!doctype html><html><head><style>
@font-face{font-family:'DM Sans';font-weight:100 1000;src:url(${font('dm-sans.ttf')})}
@font-face{font-family:'Manrope';font-weight:200 800;src:url(${font('manrope.ttf')})}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:627px;background:#f5f5ef;color:#26352b;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden}
.art{position:absolute;right:24px;top:56px;height:400px}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:'Manrope';font-weight:800;font-size:34px;letter-spacing:-1.5px}
.mark{background:#d5ef75;width:52px;height:52px;border-radius:15px;display:grid;place-items:center;font-size:40px;padding-bottom:6px;letter-spacing:-2px}
.brand i{color:#7b8b52;font-style:normal}
.kicker{display:flex;align-items:center;gap:12px;margin-top:40px;font-size:16px;font-weight:600;letter-spacing:2.6px}
.dot{width:9px;height:9px;border-radius:50%;background:#7c9444;box-shadow:0 0 0 6px #85994520}
h1{font-family:'Manrope';font-weight:550;font-size:64px;line-height:1.08;letter-spacing:-3.4px;margin-top:18px}
em{font-family:Georgia,serif;font-weight:400;letter-spacing:-2px;position:relative;z-index:0}
em:after{content:'';position:absolute;left:-4px;right:-4px;bottom:5px;height:18px;border-radius:50%;background:#d5ef75;z-index:-1;transform:rotate(-3deg)}
.role{font-size:20px;color:#4f5a4e;margin-top:20px;line-height:1.45;max-width:540px;text-wrap:balance}
.foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between}
.tags{display:flex;gap:12px}
.tags span{font-size:17px;font-weight:600;padding:11px 18px;border:1.5px solid #cdd7b8;background:#e9efd8;border-radius:999px;color:#3f5330}
.url{font-size:20px;font-weight:600;background:#29382d;color:#f8faef;padding:14px 22px;border-radius:10px}
</style></head><body>
<img class="art" src="${art}" alt="">
<div class="wrap">
  <div class="brand"><span class="mark">t.</span><span>tolaaa<i>.</i></span></div>
  <div class="kicker"><span class="dot"></span>6 YEARS IN IT · MICROSOFT JAPAN</div>
  <h1>built for impact.<br>from code to <em>cloud</em>.</h1>
  <p class="role">Tola · System Developer turned to datacenter cloud operation deployment maintenance and decom lead</p>
  <div class="foot">
    <div class="tags"><span>AI GPU deployments</span><span>New datacenter builds</span><span>Secure decommissioning</span></div>
    <span class="url">tolaaa-zone.web.app</span>
  </div>
</div>
</body></html>`;

const page = await browser.newPage({ viewport: { width: 1200, height: 627 }, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
console.log('Generated public/og-image.png (2400x1254).');
