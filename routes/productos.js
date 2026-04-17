const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para ver productos
router.get('/', productosController.listarProductos);

// Ruta para guardar productos
router.post('/agregar', productosController.crearProducto);

module.exports = router;