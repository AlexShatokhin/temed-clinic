export function initVideoCarousel() {
    const carousel = document.querySelector('.video__wrapper');
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Добавляем стили для курсора
    carousel.style.cursor = 'grab';

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        
        // Отключаем выделение текста
        e.preventDefault();
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Множитель для скорости прокрутки
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch события для мобильных устройств
    let startTouchX;
    let scrollTouchLeft;

    carousel.addEventListener('touchstart', (e) => {
        startTouchX = e.touches[0].pageX - carousel.offsetLeft;
        scrollTouchLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault();
        
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startTouchX) * 2;
        carousel.scrollLeft = scrollTouchLeft - walk;
    });

    // Предотвращаем клик по видео при драге
    let isDragging = false;
    let dragThreshold = 5;
    let startMouseX, startMouseY;

    carousel.addEventListener('mousedown', (e) => {
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        isDragging = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (startMouseX && startMouseY) {
            const deltaX = Math.abs(e.clientX - startMouseX);
            const deltaY = Math.abs(e.clientY - startMouseY);
            
            if (deltaX > dragThreshold || deltaY > dragThreshold) {
                isDragging = true;
            }
        }
    });

    carousel.addEventListener('mouseup', () => {
        startMouseX = null;
        startMouseY = null;
        
        // Сбрасываем флаг через небольшую задержку
        setTimeout(() => {
            isDragging = false;
        }, 10);
    });

    // Перехватываем клики по видео элементам
    const videoElements = carousel.querySelectorAll('[data-video-custom]');
    videoElements.forEach(video => {
        video.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
}
