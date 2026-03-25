const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');

const ROOT = __dirname;
const OUTPUT_PDF = path.join(ROOT, 'moonbow-presentation.pdf');

const slides = [
  { title: 'Home', file: 'index.html' },
  { title: 'Services', file: 'services.html' },
  { title: 'Process', file: 'process.html' },
  { title: 'About', file: 'about.html' },
  { title: 'Contact', file: 'contact.html' },
];

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.json') return 'application/json; charset=utf-8';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.ico') return 'image/x-icon';
  if (ext === '.woff') return 'font/woff';
  if (ext === '.woff2') return 'font/woff2';
  return 'application/octet-stream';
}

function createStaticServer(rootDir) {
  const server = http.createServer((req, res) => {
    try {
      const requestUrl = req.url === '/' ? '/index.html' : req.url;
      const safePath = path.normalize(decodeURIComponent(requestUrl)).replace(/^\\+/, '');
      const resolvedPath = path.resolve(rootDir, `.${safePath}`);

      if (!resolvedPath.startsWith(rootDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      fs.readFile(resolvedPath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', getContentType(resolvedPath));
        res.end(data);
      });
    } catch (err) {
      res.statusCode = 500;
      res.end('Server error');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Could not start static server'));
        return;
      }
      resolve({ server, port: address.port });
    });
    server.on('error', reject);
  });
}

async function buildPresentation() {
  const { server, port } = await createStaticServer(ROOT);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  const pdfDoc = await PDFDocument.create();

  try {
    for (const slide of slides) {
      const url = `http://127.0.0.1:${port}/${slide.file}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);

      const pngBuffer = await page.screenshot({ fullPage: false, type: 'png' });
      const image = await pdfDoc.embedPng(pngBuffer);

      const pageWidth = 1280;
      const pageHeight = 720;
      const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);

      const imgAspect = image.width / image.height;
      const pageAspect = pageWidth / pageHeight;

      let drawWidth;
      let drawHeight;
      let drawX;
      let drawY;

      if (imgAspect > pageAspect) {
        drawWidth = pageWidth;
        drawHeight = pageWidth / imgAspect;
        drawX = 0;
        drawY = (pageHeight - drawHeight) / 2;
      } else {
        drawHeight = pageHeight;
        drawWidth = pageHeight * imgAspect;
        drawX = (pageWidth - drawWidth) / 2;
        drawY = 0;
      }

      pdfPage.drawImage(image, {
        x: drawX,
        y: drawY,
        width: drawWidth,
        height: drawHeight,
      });

      console.log(`Captured slide: ${slide.title}`);
    }

    const finalPdf = await pdfDoc.save();
    fs.writeFileSync(OUTPUT_PDF, finalPdf);
    console.log(`\nPresentation created: ${OUTPUT_PDF}`);
  } finally {
    await context.close();
    await browser.close();
    server.close();
  }
}

buildPresentation().catch((err) => {
  console.error(err);
  process.exit(1);
});
