function toggleAccordion(element, closeOthers = false) {
	const content = element.querySelector(".answer");
	const arrow = element.querySelector(".arrow");
	const isOpen = content.classList.contains('open');

	// Закрываем другие аккордеоны если нужно
	if (closeOthers && !isOpen) {
		const allItems = document.querySelectorAll('.accordion-list__item');
		allItems.forEach(item => {
			if (item !== element) {
				const otherContent = item.querySelector(".answer");
				const otherArrow = item.querySelector(".arrow");
				if (otherContent.classList.contains('open')) {
					otherContent.style.height = otherContent.scrollHeight + 10 + 'px';
					requestAnimationFrame(() => {
						otherContent.style.height = '0';
					});
					otherContent.classList.remove('open');
					otherArrow.classList.remove('arrow-open');
				}
			}
		});
	}

	if (isOpen) {
		content.style.height = content.scrollHeight + 10 + 'px';
		requestAnimationFrame(() => {
			content.style.height = '0';
		});
		content.classList.remove('open');
		arrow.classList.remove('arrow-open');
	} else {
		content.style.height = '0';
		content.classList.add('open');
		arrow.classList.add('arrow-open');
		requestAnimationFrame(() => {
			content.style.height = content.scrollHeight + 10 + 'px';
		});
	}
}

export function initAccordion(multi = true) {
  	const accordionItems = document.querySelectorAll('.accordion-list__item');

  	accordionItems.forEach(item => {
		const question = item.querySelector('.question');
		const arrow = item.querySelector('.arrow');
		const shouldCloseOthers = !multi;
		
		question.addEventListener('click', () => toggleAccordion(item, shouldCloseOthers));
		arrow.addEventListener('click', () => toggleAccordion(item, shouldCloseOthers));
  	});
}