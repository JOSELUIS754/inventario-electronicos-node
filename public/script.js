document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value,
        imagen: document.getElementById('imagen').value
    };

    const respuesta = await fetch('/api/productos/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    const texto = await respuesta.text();
    document.getElementById('mensaje').innerText = texto;
    
    // Limpiar formulario y recargar lista
    e.target.reset();
    cargarProductos();
});

async function cargarProductos() {
    const res = await fetch('/api/productos');
    const productos = await res.json();
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';
    
    productos.forEach(p => {
        lista.innerHTML += `<li>${p.nombre} - S/ ${p.precio} (Stock: ${p.stock})</li>`;
    });
}

// Cargar al iniciar
cargarProductos();