const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

//TODO: Corregir ENDPOINTS 6, 5 y completar funcionalidades descritas
//1 Crear usuario (enviar name, email, y password por req.body) (opcional el role)
router
  .route('/')
  .post(userController.createUser)

  //2 Iniciar sesión (enviar email y password por req.body)
  .post()

  //5  /orders Obtener todas las ordenes hechas por el usuario ***
  .get(userController.findAllUsers);

router
  .route('/:id')
  //6  /orders/:id Obtener detalles de una sola orden dado un IDs ***
  .get(userController.findUser)
  //4 Deshabilitar cuenta de usuario
  .delete(userController.deleteUser)
  //3 Actualizar perfil de usuario (solo name y email)
  .patch(userController.updateUser);

module.exports = router;

//Todas las rutas, excepto para crear usuario e iniciar sesión, se deben proteger por un medio de autentificación, es decir, por JWT.

// Se debe usar express-validator para el endpoint de crear usuarios.  Se debe encriptar la contraseña usando bcryptjs 

//El endpoint /orders y /orders/:id, debe buscar las órdenes del usuario en sesión (del token que se envió), extraer el id del token y usarlo para buscar dichas órdenes.

// Los métodos PATCH y DELETE deben estar protegidos para que únicamente el dueño de la cuenta a modificar pueda realizar dichas acciones.

// Para los endpoints /orders, se debe incluir la siguiente información:

//  La comida que se ordenó  El restaurant de donde se pidió la comida //
