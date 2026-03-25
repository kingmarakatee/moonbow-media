const fs = require('fs');
let content = fs.readFileSync('build-company-presentation.js', 'utf8');

const oldFooter = `  function drawFooter(page, text, isDark = false) {
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: isDark ? C.darkGray : C.lightGray
    });
    page.drawText(text.toUpperCase(), { x: 120, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
  }`;

const newFooter = `  function drawFooter(page, text, isDark = false, logoColor = null, logoBlack = null) {
    page.drawLine({
      start: { x: 120, y: 80 },
      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: isDark ? C.darkGray : C.lightGray
    });
    page.drawText(text.toUpperCase(), { x: 120, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });
    page.drawText('2026', { x: W - 160, y: 50, size: 14, color: isDark ? C.grayText : C.grayText });

    const logoToUse = isDark ? logoColor : logoBlack;
    if (logoToUse) {
      const scaleToUse = 300 / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      page.drawImage(logoToUse, { 
        x: W - 120 - scaled.width, 
        y: H - 80 - scaled.height,
        width: scaled.width, 
        height: scaled.height 
      });
    }
  }`;

const oldCTA = `      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: C.black
    });
    page.drawText(t.dateText, { x: 120, y: 50, size: 18, color: C.black });
  }

  fs.writeFileSync(OUT, await pdf.save());`;

const newCTA = `      end: { x: W - 120, y: 80 },
      thickness: 2,
      color: C.black
    });
    page.drawText(t.dateText, { x: 120, y: 50, size: 18, color: C.black });

    const logoToUse = logoImageColor;
    if (logoToUse) {
      const scaleToUse = 300 / logoToUse.width;
      const scaled = logoToUse.scale(scaleToUse);
      page.drawImage(logoToUse, { 
        x: W - 120 - scaled.width, 
        y: H - 80 - scaled.height,
        width: scaled.width, 
        height: scaled.height 
      });
    }
  }

  fs.writeFileSync(OUT, await pdf.save());`;

content = content.replace(oldFooter, newFooter);
content = content.replace(oldCTA, newCTA);

content = content.replace(/drawFooter\(page, (t\.\w+), (true|false)\);/g, 'drawFooter(page, $1, $2, logoImageColor, logoImageBlack);');

fs.writeFileSync('build-company-presentation.js', content);
console.log('patched successfully');
