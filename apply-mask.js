const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. replace in HTML
html = html.replace(
    /<div class="client-carousel-item">\s*<img src="(.*?)" alt="(.*?)" class="client-logo-img">\s*<\/div>/g,
    \<div class="client-carousel-item">
                          <div class="client-logo-mask" style="-webkit-mask-image: url('\'); mask-image: url('\');" aria-label="\"></div>
                      </div>\
);

// 2. update CSS
const cssBlockOld = \.client-carousel-item {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              width: 180px;
              height: 120px;
              transition: filter 0.3s ease;
          }

          .client-carousel-item:hover .client-logo-img {
              transform: scale(1.15);
              filter: brightness(1.2);
          }

          .client-logo-img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              transition: var(--transition);
              filter: drop-shadow(0 10px 30px rgba(250, 65, 68, 0.2));
          }\;

// I previously replaced the old CSS with new logic but wait, I overwrote the CSS block for .client-logo-img already!
