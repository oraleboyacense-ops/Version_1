// =====================================
//       CARRITO ÓRALE BOYACÁ
// =====================================


// Obtener carrito guardado

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];


// =====================================
//        FORMATEAR PRECIOS
// =====================================

function formatoPrecio(precio) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }
    ).format(precio);

}


// =====================================
//        GUARDAR CARRITO
// =====================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// =====================================
//      ACTUALIZAR CONTADORES
// =====================================

function actualizarContador() {

    const contadores = document.querySelectorAll(
        "#contador-carrito"
    );


    let cantidadTotal = 0;


    carrito.forEach(function(producto) {

        cantidadTotal += producto.cantidad;

    });


    contadores.forEach(function(contador) {

        contador.textContent = cantidadTotal;

    });

}


// =====================================
//        NOTIFICACIÓN
// =====================================

function mostrarNotificacion(mensaje) {

    const notificacion = document.getElementById(
        "notificacion"
    );


    // Si no existe, crearla automáticamente

    if (!notificacion) {

        const nuevaNotificacion =
            document.createElement("div");


        nuevaNotificacion.id = "notificacion";

        nuevaNotificacion.className =
            "notificacion";


        nuevaNotificacion.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            <span></span>

        `;


        document.body.appendChild(
            nuevaNotificacion
        );

    }


    const notificacionFinal =
        document.getElementById(
            "notificacion"
        );


    const texto =
        notificacionFinal.querySelector("span");


    texto.textContent = mensaje;


    notificacionFinal.classList.add(
        "mostrar"
    );


    setTimeout(function() {

        notificacionFinal.classList.remove(
            "mostrar"
        );

    }, 3000);

}


// =====================================
//       AGREGAR AL CARRITO
// =====================================


// Detecta cualquier botón de la página

document.addEventListener(
    "click",
    function(evento) {


        const boton = evento.target.closest(
            ".agregar-carrito"
        );


        // Si no hizo clic en un botón agregar

        if (!boton) {

            return;

        }


        // Evita comportamientos extraños

        evento.preventDefault();


        // Obtener información del producto

        const nombre =
            boton.dataset.producto;


        const precio =
            Number(boton.dataset.precio);


        const imagen =
            boton.dataset.imagen;


        // Comprobar que el botón tenga datos

        if (!nombre || !precio) {

            console.error(
                "Este botón no tiene los datos del producto."
            );


            return;

        }


        // Buscar si el producto ya existe

        const productoExistente =
            carrito.find(function(producto) {

                return producto.nombre === nombre;

            });


        // Si existe, aumentar cantidad

        if (productoExistente) {

            productoExistente.cantidad++;

        }


        // Si no existe, agregarlo

        else {

            carrito.push({

                nombre: nombre,

                precio: precio,

                imagen: imagen,

                cantidad: 1

            });

        }


        // Guardar

        guardarCarrito();


        // Actualizar número

        actualizarContador();


        // Mostrar mensaje

        mostrarNotificacion(
            nombre + " se agregó al carrito"
        );


    }
);


// =====================================
//         MOSTRAR CARRITO
// =====================================

function mostrarCarrito() {

    const contenedor =
        document.getElementById(
            "productos-carrito"
        );


    const totalElemento =
        document.getElementById(
            "total-carrito"
        );


    const carritoVacio =
        document.getElementById(
            "carrito-vacio"
        );


    // Si no estamos en carrito.html

    if (!contenedor) {

        return;

    }


    // Limpiar

    contenedor.innerHTML = "";


    let total = 0;


    // Si está vacío

    if (carrito.length === 0) {


        if (carritoVacio) {

            carritoVacio.style.display =
                "flex";

        }


        if (totalElemento) {

            totalElemento.textContent =
                "$0";

        }


        return;

    }


    // Ocultar carrito vacío

    if (carritoVacio) {

        carritoVacio.style.display =
            "none";

    }


    // Crear productos

    carrito.forEach(function(
        producto,
        index
    ) {


        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        contenedor.innerHTML += `

            <div class="producto-carrito">


                <div class="producto-info">


                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">


                    <div>


                        <h3>

                            ${producto.nombre}

                        </h3>


                        <p>

                            ${formatoPrecio(
                                producto.precio
                            )}

                        </p>


                    </div>


                </div>



                <div class="cantidad-producto">


                    <button
                        class="boton-cantidad"
                        onclick="disminuirCantidad(${index})">

                        <i class="fa-solid fa-minus"></i>

                    </button>


                    <span>

                        ${producto.cantidad}

                    </span>


                    <button
                        class="boton-cantidad"
                        onclick="aumentarCantidad(${index})">

                        <i class="fa-solid fa-plus"></i>

                    </button>


                </div>



                <div class="subtotal-producto">

                    ${formatoPrecio(subtotal)}

                </div>



                <button
                    class="eliminar-producto"
                    onclick="eliminarProducto(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


            </div>

        `;


    });


    if (totalElemento) {

        totalElemento.textContent =
            formatoPrecio(total);

    }

}


// =====================================
//       AUMENTAR CANTIDAD
// =====================================

function aumentarCantidad(index) {

    carrito[index].cantidad++;


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


// =====================================
//       DISMINUIR CANTIDAD
// =====================================

function disminuirCantidad(index) {

    if (carrito[index].cantidad > 1) {

        carrito[index].cantidad--;

    }

    else {

        carrito.splice(index, 1);

    }


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


// =====================================
//        ELIMINAR PRODUCTO
// =====================================

function eliminarProducto(index) {

    carrito.splice(index, 1);


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


// =====================================
//       ENVIAR A WHATSAPP
// =====================================

const botonWhatsApp = document.getElementById(
    "enviar-whatsapp"
);


if (botonWhatsApp) {

    botonWhatsApp.addEventListener(
        "click",
        function() {


            const nombre =
                document.getElementById(
                    "nombre"
                ).value.trim();


            const ubicacion =
                document.getElementById(
                    "ubicacion"
                ).value.trim();


            const telefono =
                document.getElementById(
                    "telefono"
                ).value.trim();


            // Validar carrito

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                return;

            }


            // Validar datos

            if (
                nombre === "" ||
                ubicacion === "" ||
                telefono === ""
            ) {

                alert(
                    "Por favor completa todos los datos."
                );

                return;

            }


            // Crear mensaje

            let mensaje =

                "¡Hola! Quiero realizar un pedido en Órale Boyacá.\n\n";


            mensaje +=
                "*DATOS DEL CLIENTE*\n";


            mensaje +=
                "Nombre: " +
                nombre +
                "\n";


            mensaje +=
                "Ubicación: " +
                ubicacion +
                "\n";


            mensaje +=
                "Teléfono: " +
                telefono +
                "\n\n";


            mensaje +=
                "*MI PEDIDO*\n";


            let total = 0;


            carrito.forEach(function(producto) {


                const subtotal =
                    producto.precio *
                    producto.cantidad;


                total += subtotal;


                mensaje +=

                    "\n• " +
                    producto.nombre +

                    "\nCantidad: " +
                    producto.cantidad +

                    "\nSubtotal: " +
                    formatoPrecio(subtotal) +

                    "\n";


            });


            mensaje +=

                "\n*TOTAL DEL PEDIDO: " +
                formatoPrecio(total) +
                "*";


            // Número de Órale Boyacá

            const numeroWhatsApp =
                "573143683987";


            const url =

                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(mensaje);


            window.open(
                url,
                "_blank"
            );


        }
    );

}



// =====================================
//          INICIAR TODO
// =====================================

actualizarContador();

mostrarCarrito();