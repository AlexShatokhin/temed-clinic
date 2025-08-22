

export default function initBurgerMenu(){
    const menu = document.querySelector(".burger-menu");
    const menuWrapper = document.querySelector(".burger-menu__wrapper");
    const burger = document.querySelector(".burger");
    const closeBtn = menu.querySelector(".close-btn");
    const links = menu.querySelectorAll(".burger-menu__list a");

    burger.addEventListener("click", () => {
        menu.classList.add("active");
        menuWrapper.classList.add("active");
    });
    closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
        menuWrapper.classList.remove("active");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuWrapper.classList.remove("active");
        });
    });
}