const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'public', 'images');
const SRC = path.join(IMG_DIR, 'Base_image_desktop.png');

async function ensureDir() {
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
}

// 1. Character avatar for About card - circular crop, centered on face
async function makeAvatar() {
  const meta = await sharp(SRC).metadata();
  const w = meta.width, h = meta.height;
  // Face is roughly centered horizontally, upper portion vertically
  const cropSize = Math.round(w * 0.42);
  const left = Math.round(w * 0.35);
  const top = Math.round(h * 0.02);
  await sharp(SRC)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(320, 320, { fit: 'cover' })
    .sharpen()
    .jpeg({ quality: 92 })
    .toFile(path.join(IMG_DIR, 'avatar.jpg'));
  console.log('avatar.jpg created');
}

// 2. Project images - themed compositions using the base image as background
async function makeProjectImage(name, opts) {
  const { cropLeft, cropTop, cropW, cropH, outW = 800, outH = 450 } = opts;
  const bg = await sharp(SRC)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .resize(outW, outH, { fit: 'cover' })
    .blur(1.2)
    .modulate({ brightness: 1.15, saturation: 1.25 })
    .jpeg({ quality: 88 })
    .toBuffer();

  // Overlay a subtle gradient + text label
  const svg = `
    <svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(15,23,32,0.15)"/>
          <stop offset="100%" stop-color="rgba(15,23,32,0.55)"/>
        </linearGradient>
      </defs>
      <rect width="${outW}" height="${outH}" fill="url(#g)"/>
      <text x="${outW/2}" y="${outH/2}" text-anchor="middle" dominant-baseline="middle"
        font-family="sans-serif" font-size="38" font-weight="300" fill="#edf5ff" letter-spacing="2">
        ${name}
      </text>
    </svg>
  `;

  await sharp(bg)
    .composite([{ input: Buffer.from(svg), blend: 'over' }])
    .jpeg({ quality: 90 })
    .toFile(path.join(IMG_DIR, name + '.jpg'));
  console.log(name + '.jpg created');
}

(async () => {
  await ensureDir();
  await makeAvatar();

  // Medium Blog Clone - techy grid look (left portion of image)
  await makeProjectImage('project-medium-blog', {
    cropLeft: 0, cropTop: 0, cropW: 1280, cropH: 720, outW: 800, outH: 450
  });

  // Paytm Web-App - fintech blue look (right portion)
  await makeProjectImage('project-paytm', {
    cropLeft: 400, cropTop: 100, cropW: 880, cropH: 620, outW: 800, outH: 450
  });

  // Quantum ML Research - academic look (center-top)
  await makeProjectImage('project-quantum-ml', {
    cropLeft: 200, cropTop: 0, cropW: 1080, cropH: 720, outW: 800, outH: 450
  });

  console.log('All images generated successfully.');
})();