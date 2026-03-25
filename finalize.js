const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. the JS code block
    const jsStart = '// Clients Carousel';
    const jsEnd = '// Services Carousel for Mobile';
    const sIdx = html.indexOf(jsStart);
    const eIdx = html.indexOf(jsEnd);

    if (sIdx !== -1 && eIdx !== -1) {
        let newJs = `// Clients Carousel Fixed Loop
        const carousel = document.getElementById('clientsCarousel');
        const container = document.querySelector('.clients-carousel-container');
        const originalItems = document.querySelectorAll('.client-carousel-item');
        const singleItemWidth = 180;
        const gap = 60;
        const itemWidth = singleItemWidth + gap;
        const originalCount = originalItems.length;
        const blockWidth = itemWidth * originalCount;

        const totalBlocks = 15; // many blocks to ensure no edges are seen
        for (let i = 0; i < totalBlocks - 1; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                carousel.appendChild(clone);
            });
        }

        let currentScroll = blockWidth * 5;
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollSpeed = 0.6;
        let isHovering = false;
        let isDragging = false;
        let velocity = 0;
        let friction = 0.95;
        let hasMoved = false;
        const minDragDistance = 5;

        function updateCarouselPosition() {
            carousel.style.transform = \`translateX(-\${currentScroll}px)\`;
        }

        function checkBoundaries() {
            if (currentScroll <= blockWidth) {
                currentScroll += blockWidth * 5;
            } else if (currentScroll >= blockWidth * 10) {
                currentScroll -= blockWidth * 5;
            }
        }

        function autoScroll() {
            if (!isDown && !isHovering && !isDragging) {
                currentScroll += autoScrollSpeed;
                checkBoundaries();
            }
            updateCarouselPosition();
            requestAnimationFrame(autoScroll);
        }

        autoScroll();

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = currentScroll;
            velocity = 0;
            hasMoved = false;
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX);
            if (Math.abs(walk) > minDragDistance) {
                isDragging = true;
                hasMoved = true;
            }
            if (isDragging) {
                const newScroll = scrollLeft - walk;
                velocity = newScroll - currentScroll;
                currentScroll = newScroll;
                checkBoundaries();
                updateCarouselPosition();
            }
        });

        document.addEventListener('mouseup', () => {
            isDown = false;
            if (isDragging && hasMoved) {
                const applyInertia = () => {
                    if (Math.abs(velocity) > 0.1) {
                        currentScroll += velocity;
                        velocity *= friction;
                        checkBoundaries();
                        updateCarouselPosition();
                        requestAnimationFrame(applyInertia);
                    } else {
                        isDragging = false;
                    }
                };
                applyInertia();
            } else {
                isDragging = false;
            }
        });

        container.addEventListener('mouseenter', () => { isHovering = true; });
        container.addEventListener('mouseleave', () => { isHovering = false; });
        
        `;
        
        html = html.substring(0, sIdx) + newJs + html.substring(eIdx);
        console.log('Replaced JS block.');
    } else {
        console.log('JS markers not found!', sIdx, eIdx);
    }

    // 2. CSS updates
    const oldCSSPattern = /\.client-carousel-item\s*\{[\s\S]*?\.client-logo-img\s*\{[\s\S]*?drop-shadow[\s\S]*?\}/;
    
    // We will extract what to replace using regex.
    const newCSS = `.client-carousel-item {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              width: 180px;
              height: 120px;
              position: relative;
          }

          .client-logo-mask {
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
          }

          .client-carousel-item:hover .client-logo-mask {
              opacity: 1;
              transform: scale(1.15);
              filter: drop-shadow(0 10px 20px rgba(250, 65, 68, 0.4));
          }`;

    if (oldCSSPattern.test(html)) {
        html = html.replace(oldCSSPattern, newCSS);
        console.log('Replaced CSS block.');
    } else {
        console.log('CSS block not found!');
    }

    // 3. HTML Updates
    html = html.replace(
        /<div class="client-carousel-item">\s*<img src="(.*?)" alt="(.*?)" class="client-logo-img">\s*<\/div>/g,
        `<div class="client-carousel-item">
                          <div class="client-logo-mask" style="-webkit-mask-image: url('$1'); mask-image: url('$1');" aria-label="$2"></div>
                      </div>`
    );

    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Done!');
} catch (e) {
    console.error(e);
}
