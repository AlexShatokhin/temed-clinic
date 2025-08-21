import "./scss/main.scss";
import { initAccordion } from "./js/components/accordion.js";
import initAnimatedNav from "./js/components/nav.js";
import { initDoctors } from "./js/components/doctors.js";

document.addEventListener('DOMContentLoaded', () => {
    initAccordion(false);
    initAnimatedNav();
    initDoctors();
});