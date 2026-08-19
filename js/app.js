//==================================
// HEADER + MENÚ + FOOTER
//==================================

function cargarComponentes(){
    const headerContenedor=document.getElementById("site-header");
    const footerContenedor=document.getElementById("site-footer");

    const esInicio=
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/");

    // HEADER
    const headerHTML=`
        <header class="header">
            <div class="container header-container">

                <!-- Logo -->
                <a href="index.html" class="logo">
                    <img
                        src="img/logo.png"
                        alt="Buenas Vibras"
                    >
                </a>

                <!-- Navegación escritorio -->
                <nav class="nav-desktop">
                    <ul>

                        <li>
                            <a href="index.html">
                                Inicio
                            </a>
                        </li>

                        <li class="nav-productos">
                            <a href="productos.html">
                                Productos
                                <i data-lucide="chevron-down"></i>
                            </a>

                            <div class="dropdown-categorias">
                                <a href="productos.html?categoria=Lubricantes%20y%20aceites">
                                    Lubricantes y aceites
                                </a>

                                <a href="productos.html?categoria=Juegos%20eróticos">
                                    Juegos eróticos
                                </a>

                                <a href="productos.html?categoria=Accesorios%20de%20bienestar%20íntimo">
                                    Accesorios de bienestar íntimo
                                </a>

                                <a href="productos.html?categoria=Accesorios%20de%20placer%20personal">
                                    Accesorios de placer personal
                                </a>

                                <a href="productos.html?categoria=Fetiche">
                                    Fetiche
                                </a>

                                <a href="productos.html?categoria=Lencería%20sensual">
                                    Lencería sensual
                                </a>
                            </div>
                        </li>

                        <li>
                            <a href="nosotros.html">
                                Nosotros
                            </a>
                        </li>
                    </ul>
                </nav>

                <!-- Acciones -->
                <div class="header-acciones">

                    <a
                        href="carrito.html"
                        class="carrito-icono"
                        aria-label="Mi pedido"
                        title="Ver carrito"
                    >
                        <i data-lucide="shopping-cart"></i>
                        <span class="carrito-contador">0</span>
                    </a>

                    <button
                        id="menu-btn"
                        class="menu-btn"
                        type="button"
                        aria-label="Abrir menú"
                    >
                        <i data-lucide="menu"></i>
                    </button>

                </div>
            </div>
        </header>

        <!-- Overlay -->
        <div
            id="overlay"
            class="overlay"
        ></div>

        <!-- Menú móvil -->
        <nav
            class="nav-mobile"
            id="nav-mobile"
        >

            <div class="nav-mobile-header">

                <img
                    src="img/logo.png"
                    alt="Buenas Vibras"
                >

                <button
                    id="close-menu"
                    class="close-menu"
                    aria-label="Cerrar menú"
                >
                    <i data-lucide="x"></i>
                </button>

            </div>

            <ul class="nav-mobile-links">

                <li>
                    <a href="index.html">
                        Inicio
                    </a>
                </li>

                <li>

                    <div class="menu-productos">

                        <a href="productos.html">
                            Productos
                        </a>

                        <button
                            class="submenu-toggle"
                            aria-label="Mostrar categorías"
                        >
                            <i data-lucide="chevron-right"></i>
                        </button>

                    </div>

                    <div class="submenu-categorias">

                        <a href="productos.html?categoria=Lubricantes%20y%20aceites">
                            Lubricantes y aceites
                        </a>

                        <a href="productos.html?categoria=Juegos%20eróticos">
                            Juegos eróticos
                        </a>

                        <a href="productos.html?categoria=Accesorios%20de%20bienestar%20íntimo">
                            Accesorios de bienestar íntimo
                        </a>

                        <a href="productos.html?categoria=Accesorios%20de%20placer%20personal">
                            Accesorios de placer personal
                        </a>

                        <a href="productos.html?categoria=Fetiche">
                            Fetiche
                        </a>

                        <a href="productos.html?categoria=Lencería%20sensual">
                            Lencería sensual
                        </a>

                    </div>

                </li>

                <li>
                    <a href="nosotros.html">
                        Nosotros
                    </a>
                </li>

            </ul>

            <!-- Redes -->
            <div class="menu-social">

                <a
                    href="https://www.instagram.com/buenasvibras1186/"
                    target="_blank"
                    aria-label="Instagram"
                >
                    <img
                        src="img/instagram.png"
                        alt="Instagram"
                    >
                </a>

                <a
                    href="https://wa.me/+5492324653232"
                    target="_blank"
                    aria-label="WhatsApp"
                >
                    <img
                        src="img/whatsapp.png"
                        alt="WhatsApp"
                    >
                </a>

            </div>

        </nav>
    `;

    if(headerContenedor){
        headerContenedor.innerHTML=headerHTML;
    }

    //==================================
    // CONTADOR DEL CARRITO
    //==================================

    window.actualizarContadorCarrito = function(){

        const carrito = JSON.parse(
            localStorage.getItem("buenasVibrasCarrito") || "[]"
        );

        const cantidad = carrito.reduce(
            (total,item) => total + Number(item.cantidad),
            0
        );

        const contador = document.querySelector(".carrito-contador");

        if(!contador){
            return;
        }

        if(cantidad > 0){

            contador.textContent = cantidad;
            contador.style.display = "flex";

        }else{

            contador.style.display = "none";

        }

    };

    actualizarContadorCarrito();
    //==================================
    // FOOTER
    //==================================

    const footerHTML=`

        <footer class="footer">

            <div class="container">

                <div class="footer-content">

                    <!-- Marca -->
                    <div class="footer-brand">

                        <h2>
                            Buenas Vibras
                        </h2>

                        <p>
                            Pequeños detalles que pueden
                            transformar un momento.
                        </p>

                        <div class="footer-social">

                            <a
                                href="https://www.instagram.com/buenasvibras1186/"
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <img
                                    src="img/instagram.png"
                                    alt="Instagram"
                                >
                            </a>

                            <a
                                href="https://wa.me/+5492324653232"
                                target="_blank"
                                aria-label="WhatsApp"
                            >
                                <img
                                    src="img/whatsapp.png"
                                    alt="WhatsApp"
                                >
                            </a>

                        </div>

                    </div>

                    <!-- Explorar -->
                    <div class="footer-column">

                        <h3>
                            Explorar
                        </h3>

                        <a href="index.html">
                            Inicio
                        </a>

                        <a href="productos.html">
                            Productos
                        </a>

                        <a href="index.html#categorias">
                            Categorías
                        </a>

                        <a href="nosotros.html">
                            Nosotros
                        </a>

                    </div>

                    <!-- Ayuda -->
                    <div class="footer-column">

                        <h3>
                            ¿Necesitás ayuda?
                        </h3>

                        <a href="https://wa.me/+5492324653232">
                            Escribinos por WhatsApp
                        </a>

                        <a href="https://www.instagram.com/buenasvibras1186/">
                            Seguinos en Instagram
                        </a>

                    </div>

                </div>

                <div class="footer-bottom">
                    © 2026 Buenas Vibras · Todos los derechos reservados
                </div>

            </div>

        </footer>

        <!-- WhatsApp flotante -->
        <a
            class="whatsapp-flotante"
            href="https://wa.me/+5492324653232?text=Hola%20Buenas%20Vibras%2C%20estoy%20interesado%2Fa%20en%20sus%20productos"
            target="_blank"
            aria-label="Contactar por WhatsApp"
        >
            <img
                src="img/whatsapp.png"
                alt="WhatsApp"
            >
        </a>
    `;

    if(footerContenedor){
        footerContenedor.innerHTML=footerHTML;
    }

    lucide.createIcons();

    iniciarMenu();
}

//==================================
// MENÚ MÓVIL
//==================================

function iniciarMenu(){
    const menuBtn=document.getElementById("menu-btn");
    const closeMenu=document.getElementById("close-menu");
    const navMobile=document.getElementById("nav-mobile");
    const overlay=document.getElementById("overlay");

    if(!menuBtn || !closeMenu || !navMobile || !overlay){
       return;
    }

    function abrirMenu(){
        navMobile.classList.add("active");
        overlay.classList.add("active");

        document.body.style.overflow="hidden";
    }

    function cerrarMenu(){
        navMobile.classList.remove("active");
        overlay.classList.remove("active");

        document.body.style.overflow="";
    }

    menuBtn.addEventListener(
       "click",
       abrirMenu
    );

    closeMenu.addEventListener(
        "click",
        cerrarMenu
    );

    overlay.addEventListener(
        "click",
        cerrarMenu
    );

    //==================================
    // SUBMENÚ CATEGORÍAS
    //==================================

    const toggle=
        document.querySelector(".submenu-toggle");

    const submenu=
        document.querySelector(".submenu-categorias");

    if(toggle && submenu){
        toggle.addEventListener("click",()=>{

            submenu.classList.toggle("abierto");
            toggle.classList.toggle("abierto");

        });
    }
}

//==================================
// HEADER AL HACER SCROLL
//==================================

window.addEventListener("scroll",()=>{

    const header=
        document.querySelector(".header");

    if(!header){
        return;
    }

    header.classList.toggle(
        "scrolled",
        window.scrollY>30
    );

});

//==================================
// CARGAR CATEGORÍAS
//==================================

async function cargarCategorias(){

    const contenedor=
        document.getElementById("categorias-grid");

    // Solo existe en index.html
    if(!contenedor){
        return;
    }

    try{

        const respuesta=
            await fetch("data/categorias.json");

        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar categorias.json"
            );
        }

        const categorias=
            await respuesta.json();

        categorias.slice(0,4).forEach(categoria=>{

            const urlCategoria=
                `productos.html?categoria=${encodeURIComponent(categoria.nombre)}`;

            const tarjeta=
                document.createElement("article");

            tarjeta.className=
                "categoria-card";

            tarjeta.innerHTML=`

                <a
                    href="${urlCategoria}"
                    class="categoria-card-link"
                >

                    <img
                        src="img/categorias/${categoria.imagen}"
                        alt="${categoria.nombre}"
                        loading="lazy"
                    >

                    <div class="categoria-content">

                        <h3>
                            ${categoria.nombre}
                        </h3>

                        <span class="categoria-link">
                            Ver productos
                            <i data-lucide="arrow-right"></i>
                        </span>

                    </div>

                </a>

            `;

            contenedor.appendChild(tarjeta);

        });
        
        const botonMasCategorias=document.createElement("div");

        botonMasCategorias.className="mas-categorias";

        botonMasCategorias.innerHTML=`
            <a href="productos.html">
                Más categorías
                <i data-lucide="arrow-right"></i>
            </a>
        `;

        contenedor.appendChild(botonMasCategorias);

        lucide.createIcons();

    }catch(error){

        console.error(
            "Error cargando categorías:",
            error
        );

        contenedor.innerHTML=`

            <p>
                No se pudieron cargar las categorías.
            </p>

        `;

    }

}

//==================================
// CARGAR PRODUCTOS DESTACADOS
//==================================


async function cargarDestacados(){

    const contenedor=
        document.getElementById("destacados-grid");

    // Esta sección solo existe en index.html
    if(!contenedor){
        return;
    }

    try{

        const respuesta=
            await fetch("data/productos.json");

        if(!respuesta.ok){
            throw new Error(
                `Error HTTP ${respuesta.status} al cargar productos.json`
            );
        }

        const productos=
            await respuesta.json();

        const destacados=
            productos.filter(
                producto=>producto.destacado === true
            );

        if(destacados.length===0){

            contenedor.innerHTML=`

                <p class="productos-vacio">
                    Próximamente encontrarás aquí
                    nuestros productos destacados.
                </p>

            `;

            return;
        }

        contenedor.innerHTML="";

        destacados.forEach(producto=>{

            const tarjeta=
                document.createElement("article");

            tarjeta.className=
                "producto-card";

            tarjeta.innerHTML=`

                <a
                    href="producto.html?id=${producto.id}"
                    class="producto-card-link"
                >

                    <div class="producto-image">

                        <img
                            src="img/productos/${producto.imagen}"
                            alt="${producto.nombre}"
                            loading="lazy"
                        >

                        <span class="producto-badge">
                            Destacado
                        </span>

                    </div>

                    <div class="producto-info">

                        <span class="producto-categoria">
                            ${producto.categoria}
                        </span>

                        <h3>
                            ${producto.nombre}
                        </h3>

                        <div class="producto-precio">
                            $${formatearPrecio(producto.precio)}
                        </div>

                        <span class="producto-btn">
                            Ver producto
                        </span>

                    </div>

                </a>

            `;

            contenedor.appendChild(tarjeta);

        });

    }catch(error){

        console.error(
            "ERROR EN PRODUCTOS DESTACADOS:",
            error
        );

        contenedor.innerHTML=`

            <p class="productos-error">
                No se pudieron cargar los productos.
            </p>

        `;

    }

}

//==================================
// FORMATEAR PRECIO
//==================================

function formatearPrecio(precio){

    return new Intl.NumberFormat(
        "es-AR"
    ).format(precio);

}

//==================================
// INICIAR
//==================================

cargarComponentes();
cargarCategorias();
cargarDestacados();