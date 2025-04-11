import express  from "express"; // hacer npm i express

import cors     from "cors";    // hacer npm i cors


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

 

//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port http://localhost:${port}/`)

})