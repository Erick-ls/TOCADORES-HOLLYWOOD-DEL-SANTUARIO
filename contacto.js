document.getElementById("form-contacto").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const producto = document.getElementById("producto").value;
    const mensaje = document.getElementById("mensaje").value;

    const numero = "573001234567"; // 👈 CAMBIA por tu número real

    const texto = `
Hola, soy ${nombre}.
Mi correo es: ${correo}

Estoy interesado en el producto: ${producto}

Mensaje:
${mensaje}
    `;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
});