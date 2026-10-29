import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

// 1200x627 is LinkedIn's recommended share-image size (also works for Open Graph/X).
const font = (file) => `data:font/ttf;base64,${readFileSync(`public/fonts/${file}`).toString('base64')}`;

const html = `<!doctype html><html><head><style>
@font-face{font-family:'DM Sans';font-weight:100 1000;src:url(${font('dm-sans.ttf')})}
@font-face{font-family:'Manrope';font-weight:200 800;src:url(${font('manrope.ttf')})}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:627px;background:#f5f5ef;color:#26352b;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:radial-gradient(#9da68b66 1.2px,transparent 1.2px);background-size:24px 24px;mask-image:radial-gradient(ellipse at 85% 45%,#000 10%,transparent 55%)}
.orbit{position:absolute;border:1.5px solid #c8cfbb;border-radius:50%;width:520px;height:520px;right:-120px;top:40px}
.orbit.two{width:600px;height:400px;right:-170px;top:110px;transform:rotate(-28deg);border-style:dashed;opacity:.6}
.star{position:absolute;right:150px;top:170px;font-size:230px;line-height:1;color:#768b48}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:'Manrope';font-weight:800;font-size:34px;letter-spacing:-1.5px}
.mark{background:#d5ef75;width:52px;height:52px;border-radius:15px;display:grid;place-items:center;font-size:40px;padding-bottom:6px;letter-spacing:-2px}
.brand i{color:#7b8b52;font-style:normal}
.kicker{display:flex;align-items:center;gap:12px;margin-top:56px;font-size:16px;font-weight:600;letter-spacing:2.6px}
.dot{width:9px;height:9px;border-radius:50%;background:#7c9444;box-shadow:0 0 0 6px #85994520}
h1{font-family:'Manrope';font-weight:550;font-size:86px;line-height:1.08;letter-spacing:-4.6px;margin-top:22px}
em{font-family:Georgia,serif;font-weight:400;letter-spacing:-2px;position:relative;z-index:0}
em:after{content:'';position:absolute;left:-4px;right:-4px;bottom:6px;height:22px;border-radius:50%;background:#d5ef75;z-index:-1;transform:rotate(-3deg)}
.role{font-size:24px;color:#4f5a4e;margin-top:26px;line-height:1.45}
.foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between}
.tags{display:flex;gap:12px}
.tags span{font-size:17px;font-weight:600;padding:11px 18px;border:1.5px solid #cdd7b8;background:#e9efd8;border-radius:999px;color:#3f5330}
.url{font-size:20px;font-weight:600;background:#29382d;color:#f8faef;padding:14px 22px;border-radius:10px}
</style></head><body>
<div class="grid"></div><div class="orbit"></div><div class="orbit two"></div><div class="star">✳</div>
<div class="wrap">
  <div class="brand"><span class="mark">t.</span><span>tolaaa<i>.</i></span></div>
  <div class="kicker"><span class="dot"></span>6 YEARS IN IT · MICROSOFT JAPAN</div>
  <h1>built for impact.<br>from code to <em>cloud</em>.</h1>
  <p class="role">Tola Som · Software engineer turned datacenter deployment lead</p>
  <div class="foot">
    <div class="tags"><span>AI GPU deployments</span><span>New datacenter builds</span><span>Secure decommissioning</span></div>
    <span class="url">tolaaa-zone.web.app</span>
  </div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 627 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
console.log('Generated public/og-image.png (1200x627).');
