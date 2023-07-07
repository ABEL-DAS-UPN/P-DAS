const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usertest',
    password: 'admin123#',
    database: 'test'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

const carpetaDatos = 'data';
const jsonProductos = path.join(carpetaDatos, 'productos.json');

// Consulta SQL para obtener los datos de la tabla
const sqlQuery = 'SELECT * FROM vista_productos;';

// Ejecutar la consulta
connection.query(sqlQuery, (error, results, fields) => {
  if (error) throw error;

  // Convertir los resultados en formato JSON
  const jsonData = JSON.stringify(results);

  // Escribir los datos en un archivo JSON
  fs.writeFile(jsonProductos, jsonData, (error) => {
    if (error) throw error;
    console.log('Se genero el json de todos los productos');
  });

  // Cerrar la conexión a la base de datos
  connection.end();
});