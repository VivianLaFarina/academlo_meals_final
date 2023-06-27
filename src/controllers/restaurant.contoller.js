//1 POST / Crear un nuevo restaurant (enviar name, address, rating (INT)) rating debe ser un valor del 1 al 5
exports.createRestaurant = (req, res) => {
  try {
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

// 2 GET / Obtener todos los restaurants con status active
exports.findAllRestaurant = (req, res) => {
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
// 3 GET /:id Obtener restaurant por id

exports.findRestaurant = (req, res) => {
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
// 4 PATCH /:id Actualizar restaurant (name, address)
exports.updateRestaurant = (req, res) => {
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
//5 DELETE /:id Deshabilitar restaurant.
exports.disableRestaurant = (req, res) => {
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
// 6 POST /reviews/:id Crear una nueva reseña en el restaurant, siendo :id el id del restaurant (enviar comment, rating (INT) en req.body)
// 7 PATCH /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant, siendo :id el id del review y restaurantId el id del restaurant (comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA

//8 DELETE /reviews/:restaurantId/:id Actualizar una reseña hecha en un restaurant a status deleted, siendo :id el id del review y restaurantId  el id del restaurant. SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
