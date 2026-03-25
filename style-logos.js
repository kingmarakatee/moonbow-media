const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetCSS = `.client-logo-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: var(--transition);
            filter: drop-shadow(0 10px 30px rgba(250, 65, 68, 0.2));
        }`;

const newCSS = `.client-logo-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            filter: grayscale(100%) brightness(500%) contrast(0);
            opacity: 0.4;
        }`;

html = html.replace(targetCSS, newCSS);

// Fallback search if exact string fails
const genericPattern = /\.client-logo-img\s*\{\s*max-width:\s*100%;\s*max-height:\s*100%;\s*object-fit:\s*contain;\s*transition:\s*var\(--transition\);\s*filter:\s*drop-shadow\(0\s+10px\s+30px\s+rgba\(250,\s*65,\s*68,\s*0\.2\)\);\s*\}/;

html = html.replace(genericPattern, newCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed second pass regex update');
