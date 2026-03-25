const fs = require('fs'); const indexHtml = fs.readFileSync('index.html', 'utf8'); console.log(indexHtml.includes('.lang-switch {'));
