document.addEventListener("DOMContentLoaded", function () {

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

        if (!contenedor) return;

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
                    <button class="btn-wsp" data-producto="${prod.nombre}">
                        Más Información
                    </button>
                </div>
            </div>
            `;

        });

    }

    renderProductos(productos);


    /* BOTONES WHATSAPP PARA PRODUCTOS (FUNCIONA PARA HTML Y JS) */
    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("btn-wsp")) {

            const producto = e.target.dataset.producto;

            const telefono = "13233205256";

            const mensaje = encodeURIComponent(
                `Hola, estoy interesado en el producto: ${producto}. ¿Podrías darme más información por favor?`
            );

            const url = `https://wa.me/${telefono}?text=${mensaje}`;

            window.open(url, "_blank");

        }

    });


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

            const active = document.querySelector(".categoria.active");

            if (active) active.classList.remove("active");

            btn.classList.add("active");

            const cat = btn.dataset.cat;

            document.querySelectorAll(".card").forEach(card => {

                const coincide = cat === "todos" || card.dataset.cat === cat;

                card.classList.toggle("hide", !coincide);

            });

        });

    });

});

/* ── POPUP COMBO ─────────────────────────────── */
(function () {
    const overlay = document.getElementById("comboPopup");
    const box = document.getElementById("comboBox");
    const btnClose = document.getElementById("popupClose");
    const btnWsp = document.getElementById("popupWsp");
    const slides = document.querySelectorAll(".popup-slide");
    const dots = document.querySelectorAll(".popup-dot");

    if (!overlay) return;

    // Mostrar popup con delay elegante
    setTimeout(() => { overlay.style.display = "flex"; }, 1800);

    // Cerrar con animación
    function closePopup() {
        overlay.classList.add("closing");
        box.classList.add("closing");
        setTimeout(() => { overlay.style.display = "none"; }, 380);
    }
    btnClose.addEventListener("click", closePopup);
    overlay.addEventListener("click", e => { if (e.target === overlay) closePopup(); });

    // Carrusel automático
    let current = 0;
    function goTo(index) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = index;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }
    dots.forEach(dot => dot.addEventListener("click", () => goTo(+dot.dataset.index)));
    setInterval(() => goTo((current + 1) % slides.length), 3500);

    // WhatsApp
    btnWsp.addEventListener("click", () => {
        const tel = "13233205256";
        const msg = encodeURIComponent("Hola, me interesa el Combo Hollywood Completo (Tocador + Silla). ¿Podrían darme más información?");
        window.open(`https://wa.me/${tel}?text=${msg}`, "_blank");
    });
})();