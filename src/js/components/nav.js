

export default function initAnimatedNav() {
    const nav = document.querySelector(".menu");
    
    // Обработчик для фонового цвета навигации при скролле
    document.addEventListener("scroll", (e) => {
        if(document.documentElement.scrollTop > 2)
            nav.classList.add("menu_background")
        else
            nav.classList.remove("menu_background");
    });
    
    // Инициализация активной навигации
    initActiveNavigation();
}

function initActiveNavigation() {
    const menuItems = document.querySelectorAll('.menu__list-item a');
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    const sectionMap = new Map();
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                sectionMap.set(section, item.parentElement);
            }
        }
    });
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        let currentSection = null;
        let lastPassedSection = null;
        
        sections.forEach(section => {
            if (sectionMap.has(section)) {
                const sectionTop = section.offsetTop;
                
                if (scrollPosition >= sectionTop) {
                    lastPassedSection = section;
                }
            }
        });
        
        if (window.scrollY > 100 && lastPassedSection) {
            currentSection = lastPassedSection;
        }
        
        sectionMap.forEach((menuItem, section) => {
            if (section === currentSection) {
                menuItem.classList.add('menu__list-item_active');
            } else {
                menuItem.classList.remove('menu__list-item_active');
            }
        });
    }
    
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateActiveNavigation();
}