//==============================
// Menú móvil
//==============================

const menu=document.querySelector(".nav");
const menuBtn=document.getElementById("menu-btn");

menuBtn.addEventListener("click",()=>{
    menu.classList.toggle("active");

    const icon=document.getElementById("menu-icon");

    if(menu.classList.contains("active")){
        icon.setAttribute("data-lucide","x");
    }else{
        icon.setAttribute("data-lucide","menu");
    }

    lucide.createIcons();
});

//==============================
// Header al hacer scroll
//==============================

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{
    header.classList.toggle("scrolled",window.scrollY>20);
});