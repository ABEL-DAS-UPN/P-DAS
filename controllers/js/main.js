let productos = []; // Variable para almacenar los productos
// Obtener datos del archivo JSON y cargar los productos
//consumimos una api
fetch("/Model/productos.json")
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
        productos = data; // Asignar los productos obtenidos a la variable
        cargarProductos(productos); // Llamar a la función cargarProductos con los productos
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
// Seleccionar el contenedor de productos en el DOM
const botonesCategorias = document.querySelectorAll(".boton-categoria");
// Seleccionar todos los botones de categoría en el DOM
const tituloPrincipal = document.querySelector("#titulo-principal");
// Seleccionar el título principal en el DOM
let botonesAgregar = document.querySelectorAll(".producto-agregar");
// Seleccionar todos los botones de agregar en el DOM
const numerito = document.querySelector("#numerito");
// Seleccionar el elemento numerito en el DOM

// Asignar event listener a los botones de categoría para ocultar el aside
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

// Cargar los productos en el contenedor del DOM
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Vaciar el contenedor de productos

    productosElegidos.forEach(producto => {
        const div = document.createElement("div"); // Crear un elemento div para cada producto
        div.classList.add("producto"); // Agregar la clase "producto" al div
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.URL_IMAGEN}" alt="${producto.TITULO}">
            <div class="producto-detalles">
            
                <h3 class="producto-titulo">${producto.TITULO}</h3>
                <p class="producto-precio">$${producto.PRECIO}</p>
                <button class="producto-agregar" id="${producto.ID_PRODUCTO}">Agregar</button>
            </div>
        `; // Crear la estructura HTML del producto dentro del div
        contenedorProductos.append(div); // Agregar el div al contenedor de productos en el DOM
    });
    actualizarBotonesAgregar(); // Actualizar los botones de agregar en el DOM
}


// Asignar event listener a los botones de categoría para filtrar los productos
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active")); // Remover la clase "active" de todos los botones
        e.currentTarget.classList.add("active"); // Agregar la clase "active" al botón actual

        if (e.currentTarget.id != "todos") {
            tituloPrincipal.innerText = e.currentTarget.id;//e.currentTarget.id; // Actualizar el título principal con el nombre de la categoría
            const productosBoton = productos.filter(producto => producto.CATEGORIA === e.currentTarget.id); // Filtrar los productos por categoría
            cargarProductos(productosBoton); // Cargar los productos filtrados en el contenedor
        } else {
            tituloPrincipal.innerText = "Todos los productos"; // Restaurar el título principal a "Todos los productos"
            cargarProductos(productos); // Cargar todos los productos en el contenedor
        }
    });
});


// Actualizar los event listeners de los botones de agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar"); // Seleccionar todos los botones de agregar en el DOM

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); // Asignar el event listener agregarAlCarrito a cada botón
    });
}

let productosEnCarrito; // Variable para almacenar los productos en el carrito
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); // Obtener los productos del carrito del Local Storage

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // Convertir los productos del carrito a formato JSON
    actualizarNumerito(); // Actualizar el número mostrado en el carrito
} else {
    productosEnCarrito = []; // Si no hay productos en el carrito, inicializar la variable como un array vacío
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    // Mostrar un mensaje de confirmación utilizando la biblioteca Toastify
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // Posición del mensaje en la pantalla
        position: "right", // Alineación horizontal del mensaje
        stopOnFocus: true, // Evitar que se cierre el mensaje al pasar el cursor por encima
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)", // Estilo de fondo del mensaje
            borderRadius: "2rem", // Estilo de borde del mensaje
            textTransform: "uppercase", // Transformación de texto en mayúsculas
            fontSize: ".75rem" // Tamaño de fuente del mensaje
        },
        offset: {
            x: '1.5rem', // Posición horizontal del mensaje
            y: '1.5rem' // Posición vertical del mensaje
        },
        onClick: function () { } // Callback después de hacer clic en el mensaje
    }).showToast();

    /*FALTA ARREGLAR EL AGREGAR PRODUCTO AL CARRITO*/ 

    const idBoton = e.currentTarget.id; // Obtener el ID del botón de agregar clicado
    const productoAgregado = productos.find((producto) => producto.ID_PRODUCTO == idBoton); // Encontrar el producto correspondiente al ID
    console.log(idBoton);
    console.log(productos);

    if (productosEnCarrito.some((producto) => producto.ID_PRODUCTO === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.ID_PRODUCTO === idBoton); // Encontrar el índice del producto en el carrito
        productosEnCarrito[index].cantidad++; // Incrementar la cantidad del producto en el carrito
    } else {
        productoAgregado.cantidad = 1; // Establecer la cantidad del producto en 1
        productosEnCarrito.push(productoAgregado); // Agregar el producto al carrito
    }

    actualizarNumerito(); // Actualizar el número mostrado en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardar los productos en el carrito en el Local Storage
}

// Actualizar el número mostrado en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Calcular la cantidad total de productos en el carrito
    numerito.innerText = nuevoNumerito; // Mostrar la cantidad en el DOM
}

function openLoginWindow() {
    window.open("login.html", "loginWindow", "width=500,height=500,top=50%,left=50%,scrollbars=yes");
  }

  //**
  $('.carousel').carousel({
    interval: 2000
  })