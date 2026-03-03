document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       🔹 FORZAR SCROLL ARRIBA
    ============================== */

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    /* ==============================
       🔹 DETECTAR REFRESH Y REDIRIGIR
       (SOLO si NO estamos en index)
    ============================== */

    const navEntries = performance.getEntriesByType("navigation");

    if (navEntries.length > 0 && navEntries[0].type === "reload") {

        // Evitar bucle infinito
        if (!window.location.pathname.includes("index.html")) {

            document.body.style.transition = "opacity 0.5s ease";
            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.replace("index.html");
            }, 500);
        }
    }

    /* ==============================
       🔹 FORMULARIO WHATSAPP
    ============================== */

    const form = document.getElementById("form-contacto");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const producto = document.getElementById("producto").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (!nombre || !correo || !producto || !mensaje) {
                alert("Por favor completa todos los campos.");
                return;
            }

            const numero = "573001234567"; // 👈 Cambia por tu número real

            const texto =
                `Hola, soy ${nombre}.
Mi correo es: ${correo}

Estoy interesado en el producto: ${producto}

Mensaje:
${mensaje}`;

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");

            form.reset();
        });
    }

});