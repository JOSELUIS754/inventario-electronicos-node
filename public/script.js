const form = document.getElementById('formProducto');
const mensaje = document.getElementById('mensaje');
const botonEnviar = form.querySelector('button[type="submit"]');
let modoEdicion = false;
let productoEditandoId = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value, 10),
        imagen: document.getElementById('imagen').value.trim()
    };

    if (modoEdicion) {
        await actualizarProducto(productoEditandoId, datos);
    } else {
        await crearProducto(datos);
    }

    form.reset();
    resetForm();
    cargarProductos();
});

async function crearProducto(datos) {
    const respuesta = await fetch('/api/productos/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    mensaje.innerText = await respuesta.text();
}

async function actualizarProducto(id, datos) {
    const respuesta = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    mensaje.innerText = await respuesta.text();
}

async function cargarProductos() {
    const res = await fetch('/api/productos');
    const productos = await res.json();
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';

    productos.forEach(p => {
        const item = document.createElement('li');
        item.textContent = `${p.nombre} - S/ ${p.precio} (Stock: ${p.stock}) `;

        const botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => prepararEdicion(p));

        const botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarProducto(p.id));

        item.appendChild(botonEditar);
        item.appendChild(botonEliminar);
        lista.appendChild(item);
    });
}

function prepararEdicion(producto) {
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('imagen').value = producto.imagen || '';

    modoEdicion = true;
    productoEditandoId = producto.id;
    botonEnviar.textContent = 'Actualizar producto';
}

function resetForm() {
    modoEdicion = false;
    productoEditandoId = null;
    botonEnviar.textContent = 'Guardar Producto';
}

async function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
        return;
    }

    const respuesta = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    mensaje.innerText = await respuesta.text();
    cargarProductos();
}

// Cargar al iniciar
cargarProductos();