const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function compressImage(filename, newFilename) {
  try {
    const imgPath = path.join(__dirname, 'images', 'pdf', filename);
    const outPath = path.join(__dirname, 'images', 'pdf', newFilename);
    if (!fs.existsSync(imgPath)) return;
    const image = await Jimp.read(imgPath);
    
    // Scale down to max 800px width/height
    if (image.bitmap.width > 800 || image.bitmap.height > 800) {
      image.scaleToFit({ w: 800, h: 800 });
    }
    // Set JPEG quality
    
    await image.write(outPath); // wait, is writeAsync or write? Let's check
    console.log('Compressed:', filename, '->', newFilename);
  } catch (e) {
    console.error('Error on', filename, e.message);
  }
}

async function run() {
  await compressImage('CULTURE.JPG', 'culture-min.jpg');
  await compressImage('corporate.png', 'corporate-min.jpg');
  await compressImage('event.png', 'event-min.jpg');
}

run();
