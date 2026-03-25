const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('.cta-content, .client-carousel-item, .stat', '.cta-content, .stat');
html = html.replace("el.classList.contains('client-carousel-item') || el.classList.contains('stat')", "el.classList.contains('stat')");

// Also let's clean up the original items in HTML if they got stuck with opacity. Actually they don't have it in HTML, it's added by JS.
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed observer target');
