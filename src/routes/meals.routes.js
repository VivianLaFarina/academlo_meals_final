const express = require('express');
const mealController = require('../controllers/meal.controller');

const router = express.Router();

//TODO: DEFINIR ENDPOINTS

// 1 POST /:id Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)

//router.route('/:id').post(mealController.createMeal);

// 2 GET / Obtener todas las comidas con status active
router.route('/').get(mealController.findAllMeals);
// 3 GET /:id Obtener por id una comida con status active
router.route('/:id').get(mealController.findMeal);

// 4  PATCH /:id Actualizar comida (name, price)
router.route('/:id').patch(mealController.updateMeal);

// 5 DELETE /:id Deshabilitar comida
router.route('/:id').delete(mealController.deleteMeal);

// Todas las rutas, excepto GET / y /:id, deben estar protegidas por un método de autentificación.  El endpoint para crear comidas, debe estar protegido con express-validator.  Los métodos POST, PATCH y DELETE deben estar protegidos para que únicamente el usuario admin pueda realizar estas acciones.  Para los endpoints GET, se debe incluir la información de su restaurant.  /api/v1/orders HTTP Verb Route Description

module.exports = router;
