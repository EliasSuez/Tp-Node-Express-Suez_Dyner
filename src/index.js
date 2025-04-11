import express  from "express"; // hacer npm i express

import cors     from "cors";    // hacer npm i cors

import { sumar,restar,multiplicar,dividir } from "./modules/matematica.js";

const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


// Agrego los Middlewares

app.use(cors());         // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON


app.get('/', (req, res) => {                

    res.status(200).send('¡Ya estoy respondiendo!');

})

app.get('/saludar/:nombre', (req, res) => {               

    res.status(200).send('Tu nombre es ' + req.params.nombre);

})


app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {            

    let fechaValidar = Date.parse(req.params.mes + req.params.dia + ", " + req.params.ano);
    if(fechaValidar != isNaN){
        res.status(200).send('Hello World! ' + req.query.nombre);
    }
    else
    res.status(400)

})

app.get('/matematica/sumar', (req, res) => {            

    let resultado = sumar(parseFloat(req.query.n1), parseFloat(req.query.n2))
    
    res.status(200).send("El resultado de la operacion es " + resultado)

})

app.get('/matematica/restar', (req, res) => {            

    let resultado = restar(parseFloat(req.query.n1), parseFloat(req.query.n2))
    
    res.status(200).send("El resultado de la operacion es " + resultado)

})

app.get('/matematica/multiplicar', (req, res) => {            

    let resultado = multiplicar(parseFloat(req.query.n1), parseFloat(req.query.n2))
    
    res.status(200).send("El resultado de la operacion es " + resultado)

})

app.get('/matematica/dividir', (req, res) => {            

    if(parseFloat(req.query.n2) == 0){
        res.status(400).send("El divisor no puede ser cero")
    }
    let resultado = dividir(parseFloat(req.query.n1), parseFloat(req.query.n2))
    
    res.status(200).send("El resultado de la operacion es " + resultado)

})

//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port http://localhost:${port}/`)

})