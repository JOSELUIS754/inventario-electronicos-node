# Inventario de Productos Electrónicos - Node.js & MySQL

Este proyecto es parte de la **Tarea 02** del curso Fullstack Developer. 
Es un sistema CRUD básico para gestionar un inventario.

## Requisitos
* Node.js
* MySQL (XAMPP)

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para descargar las dependencias.
3. Crear la base de datos `inventario_tienda` con el siguiente SQL:

```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255)
);