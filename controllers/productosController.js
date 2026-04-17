const db = require('../config/db');

// Función para obtener todos los productos (Página 36)
exports.listarProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Función para agregar un producto nuevo (Página 37)
exports.crearProducto = (req, res) => {
    const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen
    };
    
    db.query('INSERT INTO productos SET ?', nuevoProducto, (err, result) => {
        if (err) throw err;
        res.send('Producto agregado con éxito');
    });
};