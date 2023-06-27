const express = require('express');
const OrderController = require('../controllers/order.controller');
const router = express.Router();

//TODO: DEFINIR ENDPOINTS
// 1 POST / Crear una nueva order (enviar quantity y mealId por req.body)
// 2 GET /me Obtener todas las órdenes del usuario
// 3 PATCH /:id Marcar una orden por id con status completed
//  4 DELETE /:id Marcar una orden por id con status cancelled

// Todas las rutas deben estar protegidas por un método de autentificación.
// Para el endpoint POST / se debe realizar lo siguiente:
//  Se debe buscar si existe la comida (meal), si no, enviar error.
// Calcular el precio para el usuario, multiplicar el precio de la comida (meal) encontrada previamente, por la cantidad solicitada por el usuario.
// Crear una nueva orden, pasando el precio calculado, el mealId de la comida ya encontrada y la cantidad solicitada por el usuario.

module.exports = router;
