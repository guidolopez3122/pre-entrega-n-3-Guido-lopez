const pantallaCarga = document.getElementById("loader")
pantallaCarga.innerHTML = `<h1 class= "tituloCarga">Cargando productos...</h1>
 <img class="imagenCarga" src="./gifs pagina/nike neon espera.gif" alt="imagen espera"> `

 setTimeout(() => {
    pantallaCarga.style.display = "none";

fetch('./data.json')
.then(response => response.json())
.then(data => {

    const titulo = document.createElement('h1');
    titulo.className = 'titulo';
    titulo.innerText = 'Productos';
    document.body.insertBefore(titulo, document.getElementById('container'));

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
        Swal.fire({
            title: "Item agregado!",
            text: `agregaste ${producto.nombre} al carrito`,
            imageUrl:"./gifs pagina/jordanvolcada.gif",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Jordan Volcada"
          });
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
    
    data.forEach(el => crearCard(el));

    const verCarrito = document.createElement("button");
    verCarrito.innerText = "Ver carrito";
    verCarrito.className = "verCarrito";
    
    verCarrito.addEventListener("click", () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
        if (carrito.length === 0) {
            Swal.fire({
                title: "Tu carrito está vacío",
                text: "No tienes productos en tu carrito.",
                imageUrl: "./gifs pagina/jordanwtf.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Jordan wtf"
            });
        } else {
            const productosEnCarrito = carrito.map(producto => {
                return `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
            }).join('\n');
    
            const precioTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    
            Swal.fire({
                title: "Tu carrito tiene...",
                text: `${productosEnCarrito}\n\nTotal: $${precioTotal}`,
                imageUrl: "./gifs pagina/jordanchamp.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Jordan champ"
            });
        }
    });

    const vaciarCarrito = document.createElement("button");
    vaciarCarrito.innerText = "Vaciar carrito";
    vaciarCarrito.className = "vaciarCarrito";
    
    vaciarCarrito.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "El carrito se borrara definitivamente!",
            imageUrl:"./gifs pagina/stopit.gif",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Jordan enojado",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero borrar el carrito!",
            cancelButtonText:"No, mantener articulos"
          }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
              Swal.fire({
                title: "Carrito vacio",
                text: "Se eliminaron todos los articulos.",
                imageUrl:"./gifs pagina/jordan enojado.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Jordan enojado"
              });
            }
          });
    });
    
    
    container.append(verCarrito);
    container.append(vaciarCarrito);
})

},6000);



