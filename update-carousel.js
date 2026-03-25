const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

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

        // Duplicar N blocos falsos para criar scroll pseudo-infinito sem travar no fim
        const totalBlocks = 15; 
        for (let i = 0; i < totalBlocks - 1; i++) {
            originalItems.forEach((item, index) => {
                const clone = item.cloneNode(true);
                // Remover classes/atributos de scroll para n ficarem invisiveis
                clone.removeAttribute('data-scroll-anim');
                clone.classList.remove('visible');
                clone.style.transitionDelay = '0s'; // limpar stagger
                clone.style.opacity = '1';
                clone.style.transform = 'none';
                carousel.appendChild(clone);
            });
        }

        let currentScroll = blockWidth * 5; // Começa no meio do "corredor" infinito
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
            // Reposiciona silenciosamente se o utilizador arrastar muito longe
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

        // Iniciar auto scroll
        autoScroll();

        // Mouse down
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = currentScroll;
            velocity = 0;
            hasMoved = false;
        });

        // Mouse move
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

        // Mouse up com inércia
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

        // Hover para pausar
        container.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        container.addEventListener('mouseleave', () => {
            isHovering = false;
        });
        
        `;
    html = html.substring(0, sIdx) + newJs + html.substring(eIdx);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('JS Updated!');
} else {
    console.log('JS bounds not found!');
}
