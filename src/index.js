import express  from "express"; // hacer npm i express

import cors     from "cors";    // hacer npm i cors


const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


// Agrego los Middlewares

app.use(cors());         // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON


app.get('/', (req, res) => {                // EndPoint "/"

    res.send('¡Ya estoy respondiendo!');

})

app.get('/saludar/:nombre', (req, res) => {                // EndPoint "/"

    res.send('Tu nombre es ' + req.params.nombre);

})


app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {             // EndPoint "/saludar"

    
    res.send('Hello World! ' + req.query.nombre);

})

 

//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port http://localhost:${port}/`)

})