export function initModalSlider() {
    const modalButton = document.querySelector('.steps__item__button');
    const modal = document.getElementById('videoModal');
    const closeButton = document.getElementById('modalClose');
    
    if (!modalButton || !modal || !closeButton) {
        console.warn('Modal slider elements not found');
        return;
    }

    let swiper = null;

    // Функция для инициализации Swiper
    function initSwiper() {
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper library not loaded');
            return;
        }

        swiper = new Swiper('.video-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                slideChange: function () {
                    // Остановка всех видео при смене слайда
                    const videos = document.querySelectorAll('.video-swiper video');
                    videos.forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            }
        });
    }

    // Открытие модального окна
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Инициализируем Swiper при первом открытии
        if (!swiper) {
            // Небольшая задержка для корректной инициализации
            setTimeout(() => {
                initSwiper();
            }, 100);
        }
    }

    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Остановка всех видео при закрытии
        const videos = document.querySelectorAll('.video-swiper video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    // Обработчики событий
    modalButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeButton.addEventListener('click', closeModal);

    // Закрытие по клику на overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Предотвращение закрытия при клике на контент модалки
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Автоинициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    initModalSlider();
});
