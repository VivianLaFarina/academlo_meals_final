const express = require('express');
const restaurantController = require('../controllers/restaurant.contoller');
const router = express.Router();

//TODO: DEFINIR ENDPOINTS
//1 POST / Crear un nuevo restaurant (enviar name, address, rating (INT)) rating debe ser un valor del 1 al 5
router
  .route('/')
  .post(restaurantController.createRestaurant)
  // 2 GET / Obtener todos los restaurants con status active
  .get(restaurantController.findAllRestaurant);

router
  .route('/:id')

  // 3 GET /:id Obtener restaurant por id
  .get(restaurantController.findRestaurant)
  // 4 PATCH /:id Actualizar restaurant (name, address)
  .patch(restaurantController.updateRestaurant)
  //5 DELETE /:id Deshabilitar restaurant.
  .delete(restaurantController.disableRestaurant);

// 6 POST /reviews/:id Crear una nueva reseña en el restaurant, siendo :id el id del restaurant (enviar comment, rating (INT) en req.body)
// 7 PATCH /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant, siendo :id el id del review y restaurantId el id del restaurant (comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA

//8 DELETE /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id del review y restaurantId  el id del restaurant. SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA

// Todas las rutas, excepto GET / y /:id, deben estar protegidas por un método de autentificación. Se debe incluir las reseñas de los restaurants.
// El endpoint para crear restaurants, debe estar protegido con express-validator.
//  Los endpoints POST / PATCH /:id y DELETE /:id deben estar protegidos para que únicamente el usuario admin pueda realizar estas acciones.

module.exports = router;
