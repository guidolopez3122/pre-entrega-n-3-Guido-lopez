const productos = [
    {
        id:1,
        nombre:"Camiseta",
        precio:40,
        imagen:"./fotos/camisetaraptors.jpeg",
        descripcion:"Camiseta raptors talle L"
    },
    {
        id:2,
        nombre:"Campera",
        precio:100,
        imagen:"./fotos/camperathunder.jpeg",
        descripcion:"Campera Thunder talle M"
    },
    {
        id:3,
        nombre:"Chaqueta",
        precio:60,
        imagen:"./fotos/chaquetaMLB.JPG",
        descripcion:"Chaqueta pirates talle M"
    },
    {
        id:4,
        nombre:"Gorra",
        precio:20,
        imagen:"./fotos/gorrabulls.JPG",
        descripcion:"Gorra Bulls ajustable"
    },
    {
        id:5,
        nombre:"Short",
        precio:30,
        imagen:"./fotos/shortkobe.jpeg",
        descripcion:"short Kobe talle M"
    },
    {
        id:6,
        nombre:"Conjunto",
        precio:120,
        imagen:"./fotos/conjunto.JPG",
        descripcion:"conjunto vancouver overzise"
    }
];

let carrito;

if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
    carrito = [];
};

const container = document.getElementById("container");

function agregarAlCarrito(producto){
    const indexProducto = carrito.findIndex(el => el.id === producto.id);
    indexProducto !== -1 
        ? carrito[indexProducto].cantidad += 1 
        : carrito.push({ ...producto, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));
};

function crearCard(producto){
    const card = document.createElement("div");
    card.className = "card";

    const titulo = document.createElement("h3");
    titulo.innerText = producto.nombre;
    titulo.className = "nombreProducto";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "imagenProducto";

    const precio = document.createElement("h4");
    precio.innerText = `$${producto.precio}`;
    precio.className = "precioProducto";

    const descripcion = document.createElement("p");
    descripcion.innerText = producto.descripcion;
    descripcion.className = "infoProducto";

    const boton =document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.onclick = () => agregarAlCarrito(producto);


    card.append(titulo);
    card.append(imagen);
    card.append(precio);
    card.append(descripcion);
    card.append(boton);

    container.append(card);
};

productos.forEach(el => crearCard(el));

const verCarrito = document.createElement("button");
verCarrito.innerText = "Ver carrito";
verCarrito.className = "verCarrito";

verCarrito.addEventListener("click", () => {
    console.log("Este es tu carrito" , carrito);
});

const vaciarCarrito = document.createElement("button");
vaciarCarrito.innerText = "Vaciar carrito";
vaciarCarrito.className = "vaciarCarrito";

vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Vaciaste el carrito.");
});


container.append(verCarrito);
container.append(vaciarCarrito);

