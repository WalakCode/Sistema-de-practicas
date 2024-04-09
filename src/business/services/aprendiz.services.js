const aprendizRepository = require("../../persistence/repository/aprendiz.repository");

const getAprendices = async (idFicha) => {
  const result = await aprendizRepository.getAprendices(idFicha);
  if (result) {
    return { message: "exito", status: 200, info: result[0] };
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};

const deleteAprendices = async (id) => {
  const parseId = parseInt(id)
  const result = await aprendizRepository.deleteAprendices([parseId]);
  if (result) {
    return { message: "exito", status: 200 };
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};

module.exports = {
  getAprendices,
  deleteAprendices,
};
