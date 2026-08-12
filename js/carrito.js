//==================================
// CONFIGURACIÓN
//==================================

const RUTA_PRODUCTOS="data/productos.json";
const CLAVE_CARRITO="buenasVibrasCarrito";


//==================================
// ELEMENTO PRINCIPAL
//==================================

const contenedorCarrito=
    document.getElementById("carrito-contenido");


//==================================
// INICIAR
//==================================

cargarCarrito();


//==================================
// CARGAR PRODUCTOS
//==================================

async function cargarCarrito(){

    try{

        const respuesta=
            await fetch(RUTA_PRODUCTOS);

        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar productos.json"
            );
        }

        const productos=
            await respuesta.json();

        mostrarCarrito(productos);

    }catch(error){

        console.error(error);

        contenedorCarrito.innerHTML=`

            <div class="carrito-vacio">

                <h2>
                    No se pudo cargar el carrito
                </h2>

                <p>
                    Intentá nuevamente.
                </p>

            </div>

        `;

    }

}


//==================================
// MOSTRAR CARRITO
//==================================

function mostrarCarrito(productos){

    const carrito=
        obtenerCarrito();

    if(carrito.length===0){

        mostrarCarritoVacio();
        actualizarContador();

        return;

    }

    const productosCarrito=
        carrito
        .map(item=>{

            const producto=
                productos.find(
                    p=>Number(p.id)===Number(item.id)
                );

            if(!producto){
                return null;
            }

            return {
                producto:producto,
                cantidad:Number(item.cantidad)
            };

        })
        .filter(item=>item!==null);


    if(productosCarrito.length===0){

        mostrarCarritoVacio();
        actualizarContador();

        return;

    }


    let subtotal=0;

    let htmlProductos="";


    productosCarrito.forEach(item=>{

        const producto=
            item.producto;

        const cantidad=
            item.cantidad;

        const precio=
            Number(producto.precio);

        const subtotalProducto=
            precio*cantidad;

        subtotal+=subtotalProducto;


        htmlProductos+=`

            <article class="carrito-item">

                <div class="carrito-item-imagen">

                    <img
                        src="img/productos/${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                </div>


                <div class="carrito-item-info">

                    <h2>
                        ${producto.nombre}
                    </h2>

                    <div class="carrito-item-precio">

                        ${formatearPrecio(precio)} c/u

                    </div>


                    <div class="carrito-item-controles">

                        <div class="carrito-cantidad">

                            <button
                                type="button"
                                onclick="cambiarCantidad(${producto.id},-1)"
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>

                            <span>
                                ${cantidad}
                            </span>

                            <button
                                type="button"
                                onclick="cambiarCantidad(${producto.id},1)"
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            class="carrito-eliminar"
                            onclick="eliminarProducto(${producto.id})"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>


                <div class="carrito-item-subtotal">

                    ${formatearPrecio(subtotalProducto)}

                </div>

            </article>

        `;

    });


    contenedorCarrito.innerHTML=`

        <div class="carrito-layout">

            <div class="carrito-productos">

                ${htmlProductos}

            </div>


            <aside class="carrito-resumen">

                <h2>
                    Resumen
                </h2>


                <div class="carrito-resumen-linea">

                    <span>
                        Productos
                    </span>

                    <span>
                        ${contarUnidades(carrito)}
                    </span>

                </div>


                <div class="carrito-resumen-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        $${formatearPrecio(subtotal)}
                    </strong>

                </div>


                <button
                    type="button"
                    id="btn-whatsapp"
                    class="carrito-whatsapp"
                >

                    <img
                        src="img/whatsapp.png"
                        alt=""
                    >

                    Enviar pedido por WhatsApp

                </button>


                <p class="carrito-aviso">

                    Se abrirá WhatsApp con el detalle
                    de tu pedido para confirmar la compra.

                </p>


                <button
                    type="button"
                    class="carrito-vaciar"
                    onclick="vaciarCarrito()"
                >
                    Vaciar carrito
                </button>

            </aside>

        </div>

    `;


    //==================================
    // BOTÓN WHATSAPP
    //==================================

    const btnWhatsApp=
        document.getElementById("btn-whatsapp");

    if(btnWhatsApp){

        btnWhatsApp.addEventListener(
            "click",
            enviarPedidoWhatsApp
        );

    }


    actualizarContador();

}


//==================================
// CARRITO VACÍO
//==================================

function mostrarCarritoVacio(){

    contenedorCarrito.innerHTML=`

        <div class="carrito-vacio">

            <i data-lucide="shopping-bag"></i>

            <h2>
                Tu pedido está vacío
            </h2>

            <p>
                Agregá productos para comenzar.
            </p>

            <a href="productos.html">
                Ver productos
            </a>

        </div>

    `;

    if(typeof lucide!=="undefined"){
        lucide.createIcons();
    }

}


//==================================
// OBTENER CARRITO
//==================================

function obtenerCarrito(){

    try{

        const carrito=
            localStorage.getItem(
                CLAVE_CARRITO
            );

        return carrito
            ? JSON.parse(carrito)
            : [];

    }catch(error){

        console.error(error);

        return [];

    }

}


//==================================
// GUARDAR CARRITO
//==================================

function guardarCarrito(carrito){

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

}


//==================================
// ACTUALIZAR CONTADOR
//==================================

function actualizarContador(){

    if(typeof actualizarContadorCarrito==="function"){

        actualizarContadorCarrito();

    }

}


//==================================
// CAMBIAR CANTIDAD
//==================================

function cambiarCantidad(id,cambio){

    const carrito=
        obtenerCarrito();


    const item=
        carrito.find(
            producto=>
                Number(producto.id)===Number(id)
        );


    if(!item){
        return;
    }


    item.cantidad=
        Number(item.cantidad)+cambio;


    if(item.cantidad<=0){

        const nuevoCarrito=
            carrito.filter(
                producto=>
                    Number(producto.id)!==Number(id)
            );

        guardarCarrito(nuevoCarrito);

    }else{

        guardarCarrito(carrito);

    }


    cargarCarrito();

}


//==================================
// ELIMINAR PRODUCTO
//==================================

function eliminarProducto(id){

    const carrito=
        obtenerCarrito();


    const nuevoCarrito=
        carrito.filter(
            producto=>
                Number(producto.id)!==Number(id)
        );


    guardarCarrito(nuevoCarrito);

    cargarCarrito();

}


//==================================
// CONTAR UNIDADES
//==================================

function contarUnidades(carrito){

    return carrito.reduce(
        (total,item)=>
            total+Number(item.cantidad),
        0
    );

}


//==================================
// FORMATEAR PRECIO
//==================================

function formatearPrecio(valor){

    return Number(valor).toLocaleString(
        "es-AR",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}


//==================================
// VACIAR CARRITO
//==================================

function vaciarCarrito(){

    const confirmar=
        confirm(
            "¿Querés eliminar todos los productos del carrito?"
        );


    if(!confirmar){
        return;
    }


    localStorage.removeItem(
        CLAVE_CARRITO
    );


    cargarCarrito();

}


//==================================
// ENVIAR PEDIDO POR WHATSAPP
//==================================

async function enviarPedidoWhatsApp(){

    const carrito=
        obtenerCarrito();


    if(carrito.length===0){
        return;
    }


    try{

        const respuesta=
            await fetch(RUTA_PRODUCTOS);


        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar productos.json"
            );
        }


        const productos=
            await respuesta.json();


        let mensaje=
            "Hola Buenas Vibras, quiero realizar el siguiente pedido:\n\n";


        let total=0;


        carrito.forEach(item=>{

            const producto=
                productos.find(
                    p=>Number(p.id)===Number(item.id)
                );


            if(!producto){
                return;
            }


            const cantidad=
                Number(item.cantidad);

            const precio=
                Number(producto.precio);

            const subtotal=
                precio*cantidad;


            total+=subtotal;


            mensaje+=
                `• ${producto.nombre}\n`+
                `  Cantidad: ${cantidad}\n`+
                `  Precio: $${formatearPrecio(precio)}\n`+
                `  Subtotal: $${formatearPrecio(subtotal)}\n\n`;

        });


        mensaje+=
            `TOTAL: $${formatearPrecio(total)}\n\n`;


        mensaje+=
            "Quedo a la espera de confirmación. Gracias.";


        const telefono=
            "5492324653232";


        const url=
            `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;


        window.open(
            url,
            "_blank"
        );


    }catch(error){

        console.error(
            "Error generando pedido:",
            error
        );

        alert(
            "No se pudo preparar el pedido. Intentá nuevamente."
        );

    }

}