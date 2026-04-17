const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Usuario por defecto de XAMPP
    password: '',      // Contraseña por defecto de XAMPP
    database: 'inventario_tienda'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la BD: ' + err.stack);
        return;
    }
    console.log('Conectado a MySQL con el ID: ' + connection.threadId);
});

module.exports = connection;