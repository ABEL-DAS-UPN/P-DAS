const mysql = require('mysql');

const connection = mysql.createConnection({
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
  .getElementById("btnIniciarSesion")
  .addEventListener("click", function () {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Llamar a la función de comparación de datos
    compararDatos(username, password);
  });

function compararDatos(username, password) {
  //Select existeDato('Alice','mypass1223') AS resultado;
  const sqlQuery = "SELECT existeDato ('" + username + "','" + password + "') AS result";
  // Ejecutar la consulta
  connection.query(sqlQuery, (error, results) => {
    if (error) throw error;

    if(results == '1'){
        alert("¡Felicidades! Has iniciado sesión correctamente.");
        return;
    }

    if(results == '0'){
        alert("OOPSSS!");
        return;
    }
    
    // Cerrar la conexión a la base de datos
    connection.end();
  });
}
