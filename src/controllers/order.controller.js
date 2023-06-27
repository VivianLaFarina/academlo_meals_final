const Order = require('../models/order.model');

// 1 POST / Crear una nueva order (enviar quantity y mealId por req.body)
exports.createOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;

    const order = await Order.create({ quantity, mealId });

    return res.status(200).json({
      status: 'sucess',
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 2 GET /me Obtener todas las órdenes del usuario
exports.findAllOrders = (req, res) => {
  try {
    //logic

    return res.status(200).json({
      status: 'sucess',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 3 PATCH /:id Marcar una orden por id con status completed
//  4 DELETE /:id Marcar una orden por id con status cancelled

// Todas las rutas deben estar protegidas por un método de autentificación.
// Para el endpoint POST / se debe realizar lo siguiente:
//  Se debe buscar si existe la comida (meal), si no, enviar error.
// Calcular el precio para el usuario, multiplicar el precio de la comida (meal) encontrada previamente, por la cantidad solicitada por el usuario.
// Crear una nueva orden, pasando el precio calculado, el mealId de la comida ya encontrada y la cantidad solicitada por el usuario.
