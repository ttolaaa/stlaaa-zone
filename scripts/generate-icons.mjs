import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function icon(size) {
  const pixels = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      const ny = y / size;
      // Keep the monogram inside the maskable icon's central safe zone.
      const stem = nx >= 0.43 && nx <= 0.54 && ny >= 0.25 && ny <= 0.69;
      const crossbar = nx >= 0.29 && nx <= 0.68 && ny >= 0.39 && ny <= 0.49;
      const foot = nx >= 0.48 && nx <= 0.67 && ny >= 0.65 && ny <= 0.75;
      const dot = (nx - 0.71) ** 2 + (ny - 0.71) ** 2 < 0.003;
      const offset = y * (size * 4 + 1) + 1 + x * 4;
      pixels.set(stem || crossbar || foot || dot ? [38, 53, 43, 255] : [213, 239, 117, 255], offset);
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(pixels)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('public/icons', { recursive: true });
for (const [name, size] of [['icon-192', 192], ['icon-512', 512], ['maskable-512', 512], ['apple-touch-icon', 180]]) {
  writeFileSync(`public/icons/${name}.png`, icon(size));
}
console.log('Generated 192px, 512px, maskable, and Apple touch icons.');
