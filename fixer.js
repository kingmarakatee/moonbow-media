const fs = require('fs');
let code = fs.readFileSync('build-company-presentation.js', 'utf8');

// 1. Add small fonts loading next to logoImageBlack
code = code.replace(/let logoImageBlack = null;[\s\S]*?(?=let corporateImg = null;)/, (match) => {
  return match + `
    let smallLogoWhite = null;
    let smallLogoBlack = null;
    const SMALL_WHITE_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-white.png');
    const SMALL_BLACK_PATH = path.join(__dirname, 'images', 'pdf', 'smalllogo-black.png');
    
    if(fs.existsSync(SMALL_WHITE_PATH)) smallLogoWhite = await pdf.embedPng(fs.readFileSync(SMALL_WHITE_PATH));
    if(fs.existsSync(SMALL_BLACK_PATH)) smallLogoBlack = await pdf.embedPng(fs.readFileSync(SMALL_BLACK_PATH));

`;
});

// 2. Change drawFooter definition
code = code.replace(/function drawFooter\(page, text, isDark = false\) \{[\s\S]*?page\.drawText\('2026', [\s\S]*?\n\s*\}/, (match) => {
  // replace the last '}' with the logo drawing code
  return match.replace(/\s*\}$/, `
    const logoToUse = isDark ? smallLogoWhite : smallLogoBlack;
    if (logoToUse) {
      const targetWidth = 100;
      const scaleToUse = targetWidth / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      // "num canto": Bottom Right right next to or instead of "2026". "2026" is at x: W-160.
      page.drawImage(logoToUse, { 
        x: W - 120 - scaled.width, 
        y: 40,
        width: scaled.width, 
        height: scaled.height 
      });
    }
  }`);
});

// 3. Change drawFooter signature
code = code.replace(/function drawFooter\(page, text, isDark = false\)/, 'function drawFooter(page, text, isDark = false, smallLogoWhite = null, smallLogoBlack = null)');

// 4. Change drawFooter calls inside buildPDF to pass smallLogoWhite/Black
// Right now they might be passing: drawFooter(page, ..., true, logoImageColor, logoImageBlack);
// Let's reset all of them.
code = code.replace(/drawFooter\(page, (.+?), (true|false)(?:, .*?)?\);/g, 'drawFooter(page, $1, $2, smallLogoWhite, smallLogoBlack);');

// 5. Replace CTA bottom logic which is NOT using drawFooter
code = code.replace(/page\.drawText\(t\.dateText, \{ x: 120, y: 50, size: 18, color: C\.black \}\);\r?\n\s*\}/, `page.drawText(t.dateText, { x: 120, y: 50, size: 18, color: C.black });

      if (smallLogoWhite) {
        // Here we use smallLogoWhite because the background is accent (orange-ish) and white looks great/inverts.
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
    }`);

fs.writeFileSync('build-company-presentation.js', code);
console.log('Fixed build script.');
