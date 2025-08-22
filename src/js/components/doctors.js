export function initDoctors() {
    const buttonsContainer = document.querySelector('.doctors-buttons');
    const doctorsList = document.querySelector('.doctors-list');
    
    if (!buttonsContainer || !doctorsList) {
        console.warn('Doctors section elements not found');
        return;
    }
    
    const buttons = buttonsContainer.querySelectorAll('.doctors-buttons__item');
    const select = buttonsContainer.querySelector('.doctors-buttons__select');
    const doctorItems = doctorsList.querySelectorAll('.doctors-list__item');
    
    function setActiveButton(activeButton) {
        buttons.forEach(button => {
            button.classList.remove('doctors-buttons__item_active');
        });
        activeButton.classList.add('doctors-buttons__item_active');
    }
    
    function setActiveSelect(cityCode) {
        if (select) {
            select.value = cityCode;
        }
    }
    
    function showDoctorsByCity(cityCode) {
        doctorItems.forEach(item => {
            const itemCity = item.getAttribute('data-city');
            
            if (itemCity === cityCode) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    function switchToCity(cityCode, activeButton = null) {
        showDoctorsByCity(cityCode);
        
        // Если переключение через кнопку - активируем кнопку и синхронизируем select
        if (activeButton) {
            setActiveButton(activeButton);
            setActiveSelect(cityCode);
        } 
        // Если переключение через select - ищем соответствующую кнопку и активируем её
        else {
            const correspondingButton = Array.from(buttons).find(btn => 
                btn.getAttribute('data-city') === cityCode
            );
            if (correspondingButton) {
                setActiveButton(correspondingButton);
            }
        }
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const cityCode = button.getAttribute('data-city');
            
            if (button.classList.contains('doctors-buttons__item_active')) {
                return;
            }
            
            switchToCity(cityCode, button);
        });
    });
    
    // Добавляем обработчик для select
    if (select) {
        select.addEventListener('change', (e) => {
            const cityCode = e.target.value;
            switchToCity(cityCode);
        });
    }
    
    // Инициализация активного состояния
    const activeButton = buttonsContainer.querySelector('.doctors-buttons__item_active');
    if (activeButton) {
        const initialCity = activeButton.getAttribute('data-city');
        showDoctorsByCity(initialCity);
        setActiveSelect(initialCity);
    } else {
        if (buttons.length > 0) {
            const firstButton = buttons[0];
            const firstCity = firstButton.getAttribute('data-city');
            setActiveButton(firstButton);
            setActiveSelect(firstCity);
            showDoctorsByCity(firstCity);
        }
    }
}
