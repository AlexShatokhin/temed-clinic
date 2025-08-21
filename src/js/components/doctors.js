export function initDoctors() {
    const buttonsContainer = document.querySelector('.doctors-buttons');
    const doctorsList = document.querySelector('.doctors-list');
    
    if (!buttonsContainer || !doctorsList) {
        console.warn('Doctors section elements not found');
        return;
    }
    
    const buttons = buttonsContainer.querySelectorAll('.doctors-buttons__item');
    const doctorItems = doctorsList.querySelectorAll('.doctors-list__item');
    
    function setActiveButton(activeButton) {
        buttons.forEach(button => {
            button.classList.remove('doctors-buttons__item_active');
        });
        activeButton.classList.add('doctors-buttons__item_active');
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
    
    function switchToCity(cityCode, activeButton) {
        showDoctorsByCity(cityCode);
        setActiveButton(activeButton);
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
    
    const activeButton = buttonsContainer.querySelector('.doctors-buttons__item_active');
    if (activeButton) {
        const initialCity = activeButton.getAttribute('data-city');
        showDoctorsByCity(initialCity);
    } else {
        if (buttons.length > 0) {
            const firstButton = buttons[0];
            const firstCity = firstButton.getAttribute('data-city');
            setActiveButton(firstButton);
            showDoctorsByCity(firstCity);
        }
    }
}
