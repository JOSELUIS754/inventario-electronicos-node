const express = require('express');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos'); // Importar rutas

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Usar las rutas de productos (Página 39)
app.use('/api/productos', productosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});