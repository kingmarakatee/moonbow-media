const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regexIdle = /\.client-logo-img\s*\{[\s\S]*?opacity:\s*0\.4;\s*\}/;

const newCSS = `.client-logo-img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
              filter: grayscale(75%) brightness(1.2) contrast(1.1);
              opacity: 0.7;
          }`;

html = html.replace(regexIdle, newCSS);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Done replacing!');
