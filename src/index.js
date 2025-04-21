import express from "express"; // hacer npm i express

import cors from "cors"; // hacer npm i cors

import Alumno from "./models/Alumno.js";

import DateTimeHelper from './DateTimeHelper';

import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";

import {
  OMDBSearchByPage,
  OMDBSearchComplete,
  OMDBGetByImdbID,
} from "./modules/omdb-wrapper.js";

const app = express();

const port = 3000; // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares

app.use(cors()); // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON

app.get("/", (req, res) => {
  res.status(200).send("¡Ya estoy respondiendo!");
});

app.get("/saludar/:nombre", (req, res) => {
  res.status(200).send("Tu nombre es " + req.params.nombre);
});

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
  let fechaValidar = Date.parse(
    req.params.mes + req.params.dia + ", " + req.params.ano
  );
  if (fechaValidar != isNaN) {
    res.status(200).send("Hello World! " + req.query.nombre);
  } else res.status(400);
});

app.get("/matematica/sumar", (req, res) => {
  let resultado = sumar(parseFloat(req.query.n1), parseFloat(req.query.n2));

  res.status(200).send("El resultado de la operacion es " + resultado);
});

app.get("/matematica/restar", (req, res) => {
  let resultado = restar(parseFloat(req.query.n1), parseFloat(req.query.n2));

  res.status(200).send("El resultado de la operacion es " + resultado);
});

app.get("/matematica/multiplicar", (req, res) => {
  let resultado = multiplicar(
    parseFloat(req.query.n1),
    parseFloat(req.query.n2)
  );

  res.status(200).send("El resultado de la operacion es " + resultado);
});

app.get("/matematica/dividir", (req, res) => {
  if (parseFloat(req.query.n2) == 0) {
    res.status(400).send("El divisor no puede ser cero");
  }
  let resultado = dividir(parseFloat(req.query.n1), parseFloat(req.query.n2));

  res.status(200).send("El resultado de la operacion es " + resultado);
});

app.get("/omdb/searchbypage", async (req, res) => {
  const resultado = await OMDBSearchByPage(req.query.search, req.query.p);

  res.status(200).send(resultado);
});

app.get("/omdb/searchbypage", async (req, res) => {
  const resultado = await OMDBSearchComplete(req.query.search);

  res.status(200).send(resultado);
});

app.get("/omdb/searchbypage", async (req, res) => {
  const resultado = await OMDBGetByImdbID(req.query.imdbID);

  res.status(200).send(resultado);
});

app.get("/alumnos", (req, res) => {
  const alumnosArray = [];

  alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));

  alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));

  alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

  res.status(200).send(alumnosArray);
});

app.get("/alumnos/:dni", (req, res) => {
  let alumnoBuscado;
  const alumnosArray = [];

  alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));

  alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));

  alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

  alumnoBuscado = alumnosArray.find((element) => element.DNI == req.params.dni);
  console.log(alumnoBuscado);
  if(alumnoBuscado)
  res.status(200).send(alumnoBuscado)
    else
  res.status(400);
});

app.post("/alumnos", (req, res) => {
  const alumnosArray = [];
  alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
  alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
  alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

  const {username, dni, edad} = req.body

  const nuevoAlumno = {username, dni, edad}

  alumnosArray.push(nuevoAlumno)

  res.status(201).json({
    mensaje : 'Alumno creado con exito',
    alumno : nuevoAlumno 
  })
});

app.delete("/alumnos", (req, res) => {
  const alumnosArray = [];
  alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
  alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
  alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));
  
  const { dni } = req.body; 
  const dniBuscado = alumnosArray.findIndex(dni => dni == {dni})
  if(dniBuscado == -1)
  {
    res.status(404)
  }
  else{
    const arrayModificado = alumnosArray.splice(dniBuscado, 1)
    res.status(200)
  }
  alumnosArray = alumnosArray.filter(alumno => alumno.DNI !== dni);
  

});

// Ruta e1: Verificar si la fecha es válida
app.get('/fechas/isDate', (req, res) => {
  const { fecha } = req.query;
  if (DateTimeHelper.isDate(fecha)) {
    return res.status(200).json({ mensaje: "Fecha válida" });
  }
  return res.status(400).json({ error: "Fecha inválida" });
});

// Ruta e2: Obtener la edad actual
app.get('/fechas/getEdadActual', (req, res) => {
  const { fechaNacimiento } = req.query;
  const edad = DateTimeHelper.getEdadActual(fechaNacimiento);
  if (edad !== null) {
    return res.status(200).json({ edad });
  }
  return res.status(400).json({ error: "Fecha de nacimiento inválida" });
});

// Ruta e3: Obtener los días hasta el próximo cumpleaños
app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
  const { fechaNacimiento } = req.query;
  const diasRestantes = DateTimeHelper.getDiasHastaMiCumple(fechaNacimiento);
  if (diasRestantes !== null) {
    return res.status(200).json({ diasRestantes });
  }
  return res.status(400).json({ error: "Fecha de nacimiento inválida" });
});

// Ruta e4: Obtener el nombre del día
app.get('/fechas/getDiaTexto', (req, res) => {
  const { fecha, abr } = req.query;
  const diaTexto = DateTimeHelper.getDiaTexto(fecha, abr === 'true');
  if (diaTexto !== null) {
    return res.status(200).json({ dia: diaTexto });
  }
  return res.status(400).json({ error: "Fecha inválida" });
});

// Ruta e5: Obtener el nombre del mes
app.get('/fechas/getMesTexto', (req, res) => {
  const { fecha, abr } = req.query;
  const mesTexto = DateTimeHelper.getMesTexto(fecha, abr === 'true');
  if (mesTexto !== null) {
    return res.status(200).json({ mes: mesTexto });
  }
  return res.status(400).json({ error: "Fecha inválida" });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
