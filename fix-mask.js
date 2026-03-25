const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newMaskCSS = `.client-logo-mask {
              display: block;
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, #FFFCBF, #F8951F, #FA4144, #F8951F, #FFFCBF);
              background-size: 200% auto;
              animation: gradientFlow 4s ease-in-out infinite;
              -webkit-mask-size: contain;
              -webkit-mask-repeat: no-repeat;
              -webkit-mask-position: center;
              mask-size: contain;
              mask-repeat: no-repeat;
              mask-position: center;
              opacity: 0.5;
              transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          }`;

html = html.replace(/\.client-logo-mask\s*\{[\s\S]*?\}/, newMaskCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed CSS');
