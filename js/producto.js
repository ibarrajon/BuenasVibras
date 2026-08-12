//==================================
// FORMATEAR PRECIO
//==================================

function formatearPrecio(precio){

    return new Intl.NumberFormat(
        "es-AR",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    ).format(precio);

}


//==================================
// FORMATEAR DESCRIPCIÓN
//==================================

function formatearDescripcion(descripcion){

    if(!descripcion){
        return "";
    }

    return descripcion
        .split(/\r?\n/)
        .map(linea => linea.trim())
        .filter(linea => linea !== "")
        .map(linea => `<p>${linea}</p>`)
        .join("");

}


//==================================
// CARGAR PRODUCTO
//==================================

async function cargarProducto(){

    const contenedor = document.getElementById(
        "producto-detalle"
    );

    if(!contenedor){
        return;
    }

    // Obtener ID desde la URL
    const parametros = new URLSearchParams(
        window.location.search
    );

    const id = parametros.get("id");

    if(!id){

        mostrarErrorProducto(
            "No se especificó ningún producto."
        );

        return;
    }

    try{

        const respuesta = await fetch(
            "data/productos.json"
        );

        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar productos.json"
            );
        }

        const productos = await respuesta.json();

        const producto = productos.find(
            item => Number(item.id) === Number(id)
        );

        if(!producto){

            mostrarErrorProducto(
                "No encontramos el producto solicitado."
            );

            return;
        }

        //==================================
        // GENERAR FICHA
        //==================================

        contenedor.innerHTML = `

            <div class="producto-ficha-imagen">

                <img
                    src="img/productos/${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </div>

            <div class="producto-ficha-info">

                <span class="producto-ficha-categoria">
                    ${producto.categoria || ""}
                </span>

                <h1>
                    ${producto.nombre}
                </h1>

                <div class="producto-ficha-precio">
                    $ ${formatearPrecio(producto.precio)}
                </div>

                <div class="producto-ficha-descripcion">
                    ${formatearDescripcion(producto.descripcion)}
                </div>

                <button
                    type="button"
                    class="producto-agregar"
                    onclick="agregarAlCarrito(${producto.id})"
                >
                    <i data-lucide="shopping-cart"></i>
                    Agregar al carrito
                </button>

            </div>

        `;

        // Activar iconos Lucide
        if(typeof lucide !== "undefined"){
            lucide.createIcons();
        }

    }catch(error){

        console.error(
            "Error cargando producto:",
            error
        );

        mostrarErrorProducto(
            "No se pudo cargar el producto."
        );

    }

}


//==================================
// MOSTRAR ERROR
//==================================

function mostrarErrorProducto(mensaje){

    const contenedor = document.getElementById(
        "producto-detalle"
    );

    if(!contenedor){
        return;
    }

    contenedor.innerHTML = `

        <div class="producto-error">

            <i data-lucide="circle-alert"></i>

            <h2>
                ${mensaje}
            </h2>

            <a href="productos.html">
                Volver al catálogo
            </a>

        </div>

    `;

    if(typeof lucide !== "undefined"){
        lucide.createIcons();
    }

}


//==================================
// CARRITO
//==================================

function obtenerCarrito(){

    try{

        return JSON.parse(
            localStorage.getItem(
                "buenasVibrasCarrito"
            ) || "[]"
        );

    }catch(error){

        console.error(
            "Error leyendo carrito:",
            error
        );

        return [];

    }

}


function agregarAlCarrito(id){

    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(
        item => Number(item.id) === Number(id)
    );

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            id:Number(id),
            cantidad:1
        });

    }

    localStorage.setItem(
        "buenasVibrasCarrito",
        JSON.stringify(carrito)
    );

    // Actualizar contador del header
    if(typeof actualizarContadorCarrito === "function"){
        actualizarContadorCarrito();
    }

    // Feedback visual
    const boton = document.querySelector(
        ".producto-agregar"
    );

    if(boton){

        const textoOriginal = boton.innerHTML;

        boton.innerHTML = `
            <i data-lucide="check"></i>
            Agregado al carrito
        `;

        if(typeof lucide !== "undefined"){
            lucide.createIcons();
        }

        setTimeout(() => {

            boton.innerHTML = textoOriginal;

            if(typeof lucide !== "undefined"){
                lucide.createIcons();
            }

        },1500);

    }

}


//==================================
// INICIAR
//==================================

cargarProducto();