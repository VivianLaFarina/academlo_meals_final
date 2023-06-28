const Meal = require('../models/meal.model');

// 1 POST /:id Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)

exports.createMeal = async (req, res) => {
  try {
    const { name, price, restaurantId } = req.body;

    const meal = await Meal.create({ name, price, restaurantId });

    return res.status(200).json({
      status: 'sucess',
      meal,
      restaurantId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};

// 2 GET / Obtener todas las comidas con status active
exports.findAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      where: {
        status: 'active',
      },
    });

    return res.status(200).json({
      status: 'sucess',
      meals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 3 GET /:id Obtener por id una comida con status active

exports.findMeal = async (req, res) => {
  try {
    //logic
    const { id } = req.params;
    const meal = await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: `Meal with id ${id} Not found`,
      });
    }

    return res.status(200).json({
      status: 'sucess',
      meal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 4  PATCH /:id Actualizar comida (name, price)
exports.updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const meal = await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: `Meal with id ${id} Not found`,
      });
    }
    await restaurant.update({ name, price });

    return res.status(200).json({
      status: 'sucess',
      message: 'Meal updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
// 5 DELETE /:id Deshabilitar comida

exports.deleteMeal = async (req, res) => {
  try {
    //logic
    const { id } = req.params;
    const meal = await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: `Meal with id ${id} Not found`,
      });
    }
    await meal.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'sucess',
      message: `Meal ${meal.name} disabled successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};
