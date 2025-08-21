export function initAnimations() {
    // Функция для проверки, виден ли элемент в viewport
    function isElementInViewport(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    }
    
    // Функция для запуска анимации
    function animateElement(element) {
        if (element.dataset.animated === 'true') {
            return; // Уже анимирован
        }
        
        element.dataset.animated = 'true';
        
        // Проверяем, есть ли уже класс анимации
        const hasAnimationClass = element.classList.contains('animate-up') || 
                                 element.classList.contains('animate-fade-up') || 
                                 element.classList.contains('animate-slow-up') ||
                                 element.classList.contains('animate-down') ||
                                 element.classList.contains('animate-left') ||
                                 element.classList.contains('animate-right') ||
                                 element.classList.contains('animate-fade-down') ||
                                 element.classList.contains('animate-fade-left') ||
                                 element.classList.contains('animate-fade-right') ||
                                 element.className.includes('animate-') && element.className.includes('-delay-');
        
        // Добавляем класс анимации по умолчанию, если его нет
        if (!hasAnimationClass) {
            element.classList.add('animate-up');
        }
        
        // Убираем начальные стили скрытия
        element.style.opacity = '';
        element.style.transform = '';
    }
    
    // Функция для проверки всех элементов
    function checkAnimations() {
        const animatedElements = document.querySelectorAll(`
            .animate-up, .animate-fade-up, .animate-slow-up, 
            .animate-down, .animate-left, .animate-right,
            .animate-fade-down, .animate-fade-left, .animate-fade-right,
            .animate-up-delay-1, .animate-up-delay-2, .animate-up-delay-3,
            .animate-down-delay-1, .animate-down-delay-2,
            .animate-left-delay-1, .animate-left-delay-2,
            .animate-right-delay-1, .animate-right-delay-2
        `.replace(/\s+/g, ' ').trim());
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element, 0.15)) {
                animateElement(element);
            }
        });
    }
    
    // Обработчик скролла с throttling
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Инициализация
    function init() {
        // Проверяем элементы при загрузке страницы
        setTimeout(checkAnimations, 100);
        
        // Добавляем обработчик скролла
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Проверяем при изменении размера окна
        window.addEventListener('resize', () => {
            setTimeout(checkAnimations, 100);
        });
    }
    
    // Публичные методы
    return {
        init,
        checkAnimations,
        
        // Метод для добавления анимации к элементу
        addAnimation: function(element, animationType = 'animate-up') {
            if (element) {
                element.classList.add(animationType);
                if (isElementInViewport(element)) {
                    animateElement(element);
                }
            }
        },
        
        // Метод для добавления анимации с задержкой
        addDelayedAnimation: function(elements, baseDelay = 200) {
            elements.forEach((element, index) => {
                if (element) {
                    element.classList.add('animate-up');
                    element.style.animationDelay = `${baseDelay * index}ms`;
                    
                    if (isElementInViewport(element)) {
                        setTimeout(() => animateElement(element), baseDelay * index);
                    }
                }
            });
        }
    };
}

// Функция для простого использования
export function animateOnScroll(selector, animationType = 'animate-up') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.add(animationType);
    });
}
