import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from "dotenv";

dotenv.config({ path: "./variables.env" });

const app = express();

//Conectar la base de datos
db.authenticate()
  .then(()=> console.log('Base de datos conectada'))
  .catch(error => console.log(error));

//Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug')

// Obtener el año actual
app.use((req,res,next)=>{
  const year = new Date();
  res.locals.actualYear= year.getFullYear();
  res.locals.nombreSitio = 'Agencia de viajes';
  next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir carpeta pública
app.use(express.static('public'))

//Agregar router
app.use('/',router);

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
})