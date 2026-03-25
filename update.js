const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the JS Loop logic
let newJs = \// Clients Carousel Fixed Loop
        const carousel = document.getElementById('clientsCarousel');
        const container = document.querySelector('.clients-carousel-container');
        const originalItems = document.querySelectorAll('.client-carousel-item');
        const singleItemWidth = 180;
        const gap = 60;
        const itemWidth = singleItemWidth + gap;
        const originalCount = originalItems.length;
        const blockWidth = itemWidth * originalCount;

        const totalBlocks = 12;
        for (let i = 0; i < totalBlocks - 1; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                carousel.appendChild(clone);
            });
        }

        let currentScroll = blockWidth * 4;
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
            carousel.style.transform = \\\	ranslateX(-\\\px)\\\;
        }

        function checkBoundaries() {
            if (currentScroll <= blockWidth) {
                currentScroll += blockWidth * 4;
            } else if (currentScroll >= blockWidth * 8) {
                currentScroll -= blockWidth * 4;
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
        container.addEventListener('mouseleave', () => { isHovering = false; });\;

const startIdx = html.indexOf('// Clients Carousel');
const endIdx = html.indexOf('// Services Carousel for Mobile');

if (startIdx > -1 && endIdx > -1) {
    html = html.substring(0, startIdx) + newJs + '\n\n        ' + html.substring(endIdx);
}

// 2. Change CSS for logos
const cssOld = \.client-logo-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: var(--transition);
            filter: drop-shadow(0 10px 30px rgba(250, 65, 68, 0.2));
        }\;
const cssNew = \.client-logo-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: var(--transition);
        }\;

html = html.replace(cssOld, cssNew);

const cssItemOld = \.client-carousel-item:hover .client-logo-img {
            transform: scale(1.15);
            filter: brightness(1.2);
        }\;

// We use mask-image to make the logo look like the gradient title
// Since there's no logo in background, we need to map the img src as a mask on a newly synthesized wrapper or pseudo element?
// Actually simpler: we can just hide the img visually but use it.
const gradientCSS = \
        .client-carousel-item {
            position: relative;
        }
        .client-logo-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }

        /* Here we use mask-image to paint the logo with the animated gradient */
        .client-logo-mask {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, #FFFCBF, #F8951F, #FA4144, #F8951F, #FFFCBF);
            background-size: 200% auto;
            animation: gradientFlow 4s ease-in-out infinite;
            -webkit-mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            opacity: 0.6;
            transition: all 0.3s ease;
        }

        .client-carousel-item:hover .client-logo-mask {
            opacity: 1;
            transform: scale(1.15);
        }
\;\n
fs.writeFileSync('index.html', html, 'utf8');
