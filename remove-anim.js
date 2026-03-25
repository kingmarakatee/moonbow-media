const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Inside the cloning loop, let's remove the attribute and visible class
const targetStr = `const clone = item.cloneNode(true);`;
const replacement = `const clone = item.cloneNode(true);
                clone.removeAttribute('data-scroll-anim');
                clone.classList.remove('visible');
                clone.style.opacity = '1';
                clone.style.transform = 'none';`;

html = html.replace(targetStr, replacement);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed cloning attributes');
