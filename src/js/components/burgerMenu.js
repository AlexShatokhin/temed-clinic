

export default function initBurgerMenu(){
    const menu = document.querySelector(".burger-menu");
    const burger = document.querySelector(".burger");
    const closeBtn = menu.querySelector(".close-btn");
    const links = menu.querySelectorAll(".burger-menu__list a");

    burger.addEventListener("click", () => {
        menu.classList.add("active");
    });
    closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
}