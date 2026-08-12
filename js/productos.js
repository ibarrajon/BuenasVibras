//==================================
// CATÁLOGO
//==================================

let todosLosProductos=[];

const categorias=[
    "Todos",
    "Lubricantes y aceites",
    "Juegos eróticos",
    "Accesorios de bienestar íntimo",
    "Accesorios de placer personal",
    "Fetiche",
    "Lencería sensual"
];

//==================================
// CARGAR PRODUCTOS
//==================================

async function cargarCatalogo(){

    const contenedor=
        document.getElementById("productos-grid");

    try{

        const respuesta=
            await fetch("data/productos.json");

        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar productos.json"
            );
        }

        todosLosProductos=
            await respuesta.json();

        crearFiltros();

        const parametros=
            new URLSearchParams(
                window.location.search
            );

        const categoriaURL=
            parametros.get("categoria");

        if(categoriaURL){

            activarCategoria(categoriaURL);
            mostrarProductos(categoriaURL);

        }else{

            activarCategoria("Todos");
            mostrarProductos("Todos");

        }

    }catch(error){

        console.error(
            "Error cargando catálogo:",
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
// FILTROS
//==================================

function crearFiltros(){

    const contenedor=
        document.getElementById("categorias-filtro");

    contenedor.innerHTML="";

    categorias.forEach(categoria=>{

        const boton=
            document.createElement("button");

        boton.className=
            "categoria-filtro";

        boton.textContent=
            categoria;

        boton.addEventListener(
            "click",
            ()=>{

                activarCategoria(categoria);
                mostrarProductos(categoria);

                const nuevaURL=
                    categoria==="Todos"
                    ? "productos.html"
                    : `productos.html?categoria=${encodeURIComponent(categoria)}`;

                window.history.pushState(
                    {},
                    "",
                    nuevaURL
                );

            }
        );

        contenedor.appendChild(boton);

    });

}

//==================================
// ACTIVAR FILTRO
//==================================

function activarCategoria(categoria){

    document
        .querySelectorAll(".categoria-filtro")
        .forEach(boton=>{

            boton.classList.toggle(
                "activo",
                boton.textContent===categoria
            );

        });

}

//==================================
// MOSTRAR PRODUCTOS
//==================================

function mostrarProductos(categoria){

    const contenedor=
        document.getElementById("productos-grid");

    contenedor.innerHTML="";

    let productos=
        todosLosProductos;

    if(categoria!=="Todos"){

        productos=todosLosProductos.filter(
            producto =>
                producto.categoria.trim().toLowerCase() ===
                categoria.trim().toLowerCase()
        );
    }

    if(productos.length===0){

        contenedor.innerHTML=`

            <p class="productos-vacio">
                No hay productos disponibles
                en esta categoría.
            </p>

        `;

        return;
    }

    productos.forEach(producto=>{

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

                    ${producto.destacado ? `
                        <span class="producto-badge">
                            Destacado
                        </span>
                    ` : ""}

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

}

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
// INICIAR
//==================================

cargarCatalogo();