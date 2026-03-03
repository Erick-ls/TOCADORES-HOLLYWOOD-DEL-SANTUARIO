const productos = [];
const categorias = ["salas", "comedores", "oficina", "recamaras"];

for (let i = 1; i <= 20; i++) {
    productos.push({
        nombre: "Producto " + i,
        descripcion: "Descripción elegante del producto " + i,
        precio: i % 2 === 0 ? 8000 + i * 200 : 20000 + i * 300,
        categoria: categorias[i % 4],
        imagen: "https://picsum.photos/400/300?random=" + i
    });
}

const contenedor = document.getElementById("contenedor-productos");

function renderProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(prod => {
        contenedor.innerHTML += `
        <div class="card" data-cat="${prod.categoria}" data-precio="${prod.precio}">
            <img src="${prod.imagen}">
            <div class="info">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <span class="precio">$${prod.precio.toLocaleString()} MXN</span>

                <button class="btn btn-envio">Envío gratis</button>
                <button class="btn btn-secundario">Ver Detalles</button>
                <button class="btn btn-primary">Más Información</button>
            </div>
        </div>
        `;
    });
}

renderProductos(productos);

/* FILTRO POR PRECIO */
document.querySelectorAll(".precio-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const tipo = link.dataset.precio;

        document.querySelectorAll(".card").forEach(card => {
            const precio = parseInt(card.dataset.precio);

            const mostrar =
                (tipo === "bajo" && precio <= 15000) ||
                (tipo === "alto" && precio > 15000);

            card.classList.toggle("hide", !mostrar);
        });
    });
});

/* FILTRO POR CATEGORIA */
document.querySelectorAll(".categoria").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".categoria.active").classList.remove("active");
        btn.classList.add("active");

        const cat = btn.dataset.cat;

        document.querySelectorAll(".card").forEach(card => {
            const coincide = cat === "todos" || card.dataset.cat === cat;
            card.classList.toggle("hide", !coincide);
        });
    });
});