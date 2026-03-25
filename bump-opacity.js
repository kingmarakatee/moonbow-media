const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/opacity:\s*0\.5;/g, 'opacity: 0.8;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Bumped opacity');
