
const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Get HTML
const headerHtmlMatch = indexHtml.match(/<!-- Header & Navigation -->\s*<header id="header">[\s\S]*?<\/header>/);
const baseHeaderHtml = headerHtmlMatch[0];

// Adjusted HTML for subpages
const subHeaderHtml = baseHeaderHtml
    .replace('href="#home"', 'href="index.html"')
    .replace('href="#clients"', 'href="index.html#clients"')
    .replace('href="#services"', 'href="index.html#services"');

// Get CSS
const headerCssMatch = indexHtml.match(/\/\*\s*=====\s*HEADER & NAVIGATION\s*=====\s*\*\/[\s\S]*?(?=\/\*\s*=====\s*[A-Z\s]+\s*=====\s*\*\/)/);
const headerCss = headerCssMatch[0];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace HTML
    content = content.replace(/<!-- Header & Navigation -->\s*<header id="header">[\s\S]*?<\/header>/, subHeaderHtml);
    
    // Replace CSS
    // First, find where CSS should go or replace existing
    const cssMatch = content.match(/\/\*\s*=====\s*HEADER & NAVIGATION\s*=====\s*\*\/[\s\S]*?(?=\/\*\s*=====\s*[A-Z\s]+\s*=====\s*\*\/)/);
    if (cssMatch) {
        content = content.replace(cssMatch[0], headerCss);
    }
    
    fs.writeFileSync(f, content);
}
console.log('Done!');

