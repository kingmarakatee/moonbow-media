const fs = require('fs');
let code = fs.readFileSync('build-company-presentation.js', 'utf8');

// 1. Add small fonts loading next to logoImageBlack
if (!code.includes('smallLogoWhite')) {
  code = code.replace(/let logoImageBlack = null;[ \t\n\r]*const BLACK_LOGO_PATH = path.join\(__dirname, 'logoAsset2-black.png'\);[ \t\n\r]*if\(fs.existsSync\(BLACK_LOGO_PATH\)\) \{[ \t\n\r]*logoImageBlack = await pdf.embedPng\(fs.readFileSync\(BLACK_LOGO_PATH\)\);[ \t\n\r]*\}/, (match) => {
    return match + `
    let smallLogoWhite = null;
    let smallLogoBlack = null;
    const SMALL_WHITE_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-white.png');
    const SMALL_BLACK_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-black.png');
    
    if(fs.existsSync(SMALL_WHITE_PATH)) smallLogoWhite = await pdf.embedPng(fs.readFileSync(SMALL_WHITE_PATH));
    if(fs.existsSync(SMALL_BLACK_PATH)) smallLogoBlack = await pdf.embedPng(fs.readFileSync(SMALL_BLACK_PATH));
`;
  });
}

// 2. Change drawFooter logic so it accepts smallLogoWhite and smallLogoBlack
// Let's replace the whole drawFooter function cleanly up until drawEditorialCard.
const drawFooterRegex = /function drawFooter\(page, text, isDark = false\) \{([\s\S]*?)function drawEditorialCard/;

code = code.replace(drawFooterRegex, `function drawFooter(page, text, isDark = false, sWhite = null, sBlack = null) {
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: isDark ? C.darkGray : C.lightGray
    });
    page.drawText(text.toUpperCase(), { x: 120, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });

    const logoToUse = isDark ? sWhite : sBlack;
    if (logoToUse) {
      const targetWidth = 100;
      const scaleToUse = targetWidth / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      // Place it at the far right aligned with the line's right edge
      page.drawImage(logoToUse, { 
        x: W - 120 - scaled.width, 
        y: 40,
        width: scaled.width, 
        height: scaled.height 
      });
      // Place 2026 to the left of the logo
      page.drawText('2026', { x: W - 120 - scaled.width - 50, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    } else {
      page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    }
}

  function drawEditorialCard`);

// 3. Change all calls to drawFooter inside buildPDF to pass smallLogoWhite/Black
// Right now they might be passing: drawFooter(page, t.xyz, true, logoImageColor, logoImageBlack); because of my broken prev commit
code = code.replace(/drawFooter\(page, (t\.[A-Za-z0-9_]+), (true|false)(?:, [^)]+)?\);/g, 'drawFooter(page, $1, $2, smallLogoWhite, smallLogoBlack);');

// 4. Update the CTA page text and logo injection.
const ctaRegex = /page\.drawText\(t\.dateText, \{ x: 120, y: 50, size: 18, color: C\.black \}\);[\s\S]*?(?=fs\.writeFileSync\(OUT, await pdf\.save\(\)\);)/;

code = code.replace(ctaRegex, `page.drawText(t.dateText, { x: 120, y: 50, size: 18, color: C.black });

      if (smallLogoWhite) {
        const targetWidth = 100;
        const scaleToUse = targetWidth / smallLogoWhite.width;
        const scaled = smallLogoWhite.scale(scaleToUse);
        page.drawImage(smallLogoWhite, { 
          x: W - 120 - scaled.width, 
          y: 40,
          width: scaled.width, 
          height: scaled.height 
        });
      }
    }

  `);

fs.writeFileSync('build-company-presentation.js', code);
console.log('Fixed build script.');