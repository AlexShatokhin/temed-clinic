import 'animate.css';
import "./scss/main.scss";
import { initAccordion } from "./js/components/accordion.js";
import initAnimatedNav from "./js/components/nav.js";
import { initDoctors } from "./js/components/doctors.js";
import { initPlusData } from "./js/components/plusData.js";
import { initVideoPlayer } from "./js/components/videoPlayer.js";
import initBurgerMenu from './js/components/burgerMenu.js';
import { initModalSlider } from './js/components/modalSlider.js';
import { initVideoCarousel } from './js/components/videoCarousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initAccordion(false);
    initAnimatedNav();
    initDoctors();
    initPlusData();
    initBurgerMenu();
    initModalSlider();
    initVideoCarousel();
    
    const videoPlayer = initVideoPlayer();
    videoPlayer.autoInit();
    
});