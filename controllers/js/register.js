import { createConnection } from 'mysql';

const connection = createConnection({
  host: "localhost",
  user: "usertest",
  password: "admin123#",
  database: "test",
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

document
  .getElementById("btnregister")
  .addEventListener("click", function () {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var direccion = document.getElementById("direccion").value;
    var telef = document.getElementById("telefono").value;
    var password = document.getElementById("contrasena").value;
    var fechnac = document.getElementById("fecha_nacimiento").value;

    // Llamar a la función de comparación de datos
    registrarDatos(nombre, apellido,correo,direccion,telef,password,fechnac);
  });

function registrarDatos(nombre, apellidos, direccion, telef, password, fechnac) {
  const sqlQuery = "INSERT INTO USUARIO (NOMBRE, APELLIDOS, DIRECCION, FECHA_NACIMIENTO, TELEFONO, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?)";// Ejecutar la consulta
  connection.query(sqlQuery, [nombre, apellidos, direccion, fechnac, telef ,password], (error, results) => {
    if (error) {
      console.error("Error al registrar los datos:", error);
      return;
    }
    
    console.log("Datos registrados correctamente");
    alert("¡Registro exitoso!");
    
    // Cerrar la conexión a la base de datos
    connection.end();
  });
}
