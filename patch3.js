const fs = require('fs');
let code = fs.readFileSync('build-company-presentation.js', 'utf8');

code = code.replace(/function drawFooter\(page, text, isDark = false, sWhite = null, sBlack = null\) \{[\s\S]*?function drawEditorialCard/m, `function drawFooter(page, text, isDark = false, sWhite = null, sBlack = null) {
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: isDark ? C.darkGray : C.lightGray
    });
    page.drawText(text.toUpperCase(), { x: 120, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });

    const logoToUse = isDark ? sWhite : sBlack;
    if (logoToUse) {
      const targetWidth = 100;
      const scaleToUse = targetWidth / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      // Top Right corner placement
      page.drawImage(logoToUse, { 
        x: W - 120 - scaled.width, 
        y: H - 120 - scaled.height, 
        width: scaled.width, 
        height: scaled.height 
      });
    }
}

  function drawEditorialCard`);

code = code.replace(/if \(smallLogoWhite\) \{[\s\S]*?\}\s*\}\s*\n\s*$/m, `if (smallLogoWhite) {
        const targetWidth = 100;
        const scaleToUse = targetWidth / smallLogoWhite.width;
        const scaled = smallLogoWhite.scale(scaleToUse);
        page.drawImage(smallLogoWhite, { 
          x: W - 120 - scaled.width, 
          y: H - 120 - scaled.height,
          width: scaled.width, 
          height: scaled.height 
        });
      }
    }

  `);

fs.writeFileSync('build-company-presentation.js', code);
console.log('Fixed positions!');
