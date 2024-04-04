const createConnection = require("../../config/db");

const getAprendices = async (idFicha) => {
    const db = await createConnection();
    try {
      const status = await db.query(
          `
          SELECT a.tipo_documento,a.numero_documento,a.nombres,a.apellidos,a.celular,a.correo_personal,a.estado 
          FROM aprendices a 
          WHERE a.ficha = ?
          `,
        idFicha
      );
      return status;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await db.end();
    }
  };

module.exports = {
    getAprendices
  };