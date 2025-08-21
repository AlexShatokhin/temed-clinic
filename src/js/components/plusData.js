export function initPlusData() {
    const plusDataElements = document.querySelectorAll('.plus-data');
    
    if (!plusDataElements.length) {
        console.warn('Plus data elements not found');
        return;
    }
    
    // Функция для скрытия всех информационных блоков
    function hideAllInformation() {
        plusDataElements.forEach(element => {
            const information = element.querySelector('.plus-data__information');
            const plus = element.querySelector('.plus-data__plus');
            
            if (information) {
                information.style.display = 'none';
                information.classList.remove('plus-data__information_active');
            }
            
            if (plus) {
                plus.classList.remove('plus-data__plus_active');
            }
        });
    }
    
    // Функция для показа конкретного информационного блока
    function showInformation(targetElement) {
        const information = targetElement.querySelector('.plus-data__information');
        const plus = targetElement.querySelector('.plus-data__plus');
        
        if (information) {
            information.style.display = 'block';
            information.classList.add('plus-data__information_active');
        }
        
        if (plus) {
            plus.classList.add('plus-data__plus_active');
        }
    }
    
    // Функция для переключения отображения
    function toggleInformation(targetElement) {
        const information = targetElement.querySelector('.plus-data__information');
        const isCurrentlyVisible = information && information.style.display === 'block';
        
        if (isCurrentlyVisible) {
            // Если текущий блок открыт, закрываем его
            hideAllInformation();
        } else {
            // Иначе закрываем все и открываем текущий
            hideAllInformation();
            showInformation(targetElement);
        }
    }
    
    // Добавляем обработчики событий на каждый плюс
    plusDataElements.forEach(element => {
        const plus = element.querySelector('.plus-data__plus');
        
        if (plus) {
            plus.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleInformation(element);
            });
            
            // Добавляем стили курсора для интерактивности
            plus.style.cursor = 'pointer';
        }
    });
    
    // Инициализация: скрываем все информационные блоки
    hideAllInformation();
    
    // Опционально: закрытие при клике вне области
    document.addEventListener('click', (e) => {
        const clickedInsidePlusData = e.target.closest('.plus-data');
        
        if (!clickedInsidePlusData) {
            hideAllInformation();
        }
    });
}
