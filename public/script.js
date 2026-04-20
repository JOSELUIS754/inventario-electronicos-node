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
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = '';

    if (productos.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay productos en el inventario</td></tr>';
        return;
    }

    productos.forEach(p => {
        const fila = document.createElement('tr');
        
        // Columna Imagen
        const tdImagen = document.createElement('td');
        if (p.imagen) {
            const img = document.createElement('img');
            img.src = p.imagen;
            img.alt = p.nombre;
            img.className = 'img-miniatura';
            tdImagen.appendChild(img);
        } else {
            tdImagen.innerHTML = '<span class="sin-foto">📷</span>';
        }
        
        // Columna Nombre
        const tdNombre = document.createElement('td');
        tdNombre.textContent = p.nombre;
        
        // Columna Precio
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `S/ ${p.precio.toFixed(2)}`;
        
        // Columna Stock
        const tdStock = document.createElement('td');
        const spanStock = document.createElement('span');
        spanStock.textContent = p.stock;
        spanStock.className = p.stock > 0 ? 'stock-ok' : 'stock-agotado';
        tdStock.appendChild(spanStock);
        
        // Columna Acciones
        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'td-acciones';

        const botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.textContent = 'Editar';
        botonEditar.className = 'btn-editar';
        botonEditar.addEventListener('click', () => prepararEdicion(p));

        const botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn-eliminar';
        botonEliminar.addEventListener('click', () => eliminarProducto(p.id));

        tdAcciones.appendChild(botonEditar);
        tdAcciones.appendChild(botonEliminar);

        fila.appendChild(tdImagen);
        fila.appendChild(tdNombre);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdStock);
        fila.appendChild(tdAcciones);
        
        cuerpoTabla.appendChild(fila);
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