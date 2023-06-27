const Restaurant = require('../models/restaurant.model');

//1 POST / Crear un nuevo restaurant (enviar name, address, rating (INT)) rating debe ser un valor del 1 al 5

exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurant.create({ name, address, rating });

    return res.status(200).json({
      status: 'sucess',
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};

// 2 GET / Obtener todos los restaurants con status active
exports.findAllRestaurant = async (req, res) => {
  try {
    //logic
    const restaurants = await Restaurant.findAll({
      where: {
        status: 'active',
      },
    });

    return res.status(200).json({
      status: 'sucess',
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 3 GET /:id Obtener restaurant por id

exports.findRestaurant = async (req, res) => {
  try {
    //logic
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: `Restaurant with id ${id} Not found`,
      });
    }
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
// 4 PATCH /:id Actualizar restaurant (name, address)
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const restaurant = await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: `Restaurant with id ${id} Not found`,
      });
    }
    await restaurant.update({ name, address });

    return res.status(200).json({
      status: 'sucess',
      message: 'Restaurant updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
//5 DELETE /:id Deshabilitar restaurant.
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: `Restaurant with id ${id} Not found`,
      });
    }

    await restaurant.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'sucess',
      message: `Restaurant ${restaurant.name} disabled successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 6 POST /reviews/:id Crear una nueva reseña en el restaurant, siendo :id el id del restaurant (enviar comment, rating (INT) en req.body)
// 7 PATCH /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant, siendo :id el id del review y restaurantId el id del restaurant (comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA

//8 DELETE /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id del review y restaurantId  el id del restaurant. SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
