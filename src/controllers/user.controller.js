const User = require('../models/user.model');

//1 Crear usuario (enviar name, email, y password por req.body) (opcional el role)

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    return res.status(200).json({
      status: 'sucess',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};

//2Iniciar sesión (enviar email y password por req.body)
exports.loginUser = (req, res) => {
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
//3Actualizar perfil de usuario (solo name y email)

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} Not found`,
      });
    }

    await user.update({ name, email });

    return res.status(200).json({
      status: 'sucess',
      message: 'User updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went very wrong! 🔴',
    });
  }
};

//4Deshabilitar cuenta de usuario ***
exports.disableUser = (req, res) => {
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

//5  /orders  Obtener todas las ordenes hechas por el usuario ***
exports.findAllUsers = (req, res) => {
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

//6  /orders/:id Obtener detalles de una sola orden dado un ID ***
exports.findUser = (req, res) => {
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
