import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req,res) => { // req -> lo que enviamos : res -> lo que express nos responde

  // Consultar 3 viajes del modelo Viaje

  const promiseDB = []; // se hace un promise si se tiene más de una consulta a la base de datos para que arranquen al mismo tiempo

  promiseDB.push(Viaje.findAll({limit:3}));
  promiseDB.push(Testimonial.findAll({limit:3}))

  try {
    const resultado = await Promise.all(promiseDB)
    res.render('inicio', {
      pagina: 'Incio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
    });
  } catch (error) {
    console.log(error)
  }
  
}

const paginaNosotros = (req,res) => { 
  const viajes = 'Viaje a Alemania'
  res.render('nosotros', {
    pagina: 'Nosotros'
  }); //.render espera una vista
}

const paginaViajes = async(req,res) => { 
  //consultar BD 
  const viajes = await Viaje.findAll();
  console.log(viajes);

  res.render('viajes', {
    pagina: 'Próximos Viajes',
    viajes,
  });
}

const paginaTestimoniales = async(req,res) => {

  try {
    const testimoniales = await Testimonial.findAll();

    res.render('testimoniales', {
    pagina: 'Testimoniales',
    testimoniales
  });
  } catch (error) {
    console.log(error)
  }

  
}

// Muestra un viaje por su slug

const paginaDetalleViaje = async(req, res) => {
  const {slug} = req.params;

  try {
    const viaje = await Viaje.findOne({where:{slug}})

    res.render('viaje', {
      pagina:'Información Viaje',
      viaje
    })

  } catch (error) {
    console.log(error);
  }
}


export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaDetalleViaje,
  paginaTestimoniales
}