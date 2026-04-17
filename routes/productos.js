const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para ver productos
router.get('/', productosController.listarProductos);

// Ruta para guardar productos
router.post('/agregar', productosController.crearProducto);

// RUta para actualizar productos
router.put('/:id', productosController.actualizarProducto);

// Ruta para eliminar el producto
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;