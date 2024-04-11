const createConnection = require("../../config/db");


const addInstructor = async (datos) => {
    const db = await createConnection();
    try {
      const status = await db.execute(
        `
          INSERT INTO instructores (cedula,nombres,apellidos,numero,correo_sena) VALUES (?,?,?,?,?)
        `,
        datos
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
    addInstructor
}