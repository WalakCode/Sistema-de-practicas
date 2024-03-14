const createConnection = require('../../config/db');


const getUser = async(info)=>{
const db = await createConnection()
try {
    const status = await db.query(
      `
      SELECT cedula,contraseña,correo,nombre, roles.nombre_rol, telefono FROM usuarios JOIN roles on id_rol = usuarios.rol where correo = ? AND contraseña = ?
      `,
      info
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
}

module.exports = {
    getUser
}