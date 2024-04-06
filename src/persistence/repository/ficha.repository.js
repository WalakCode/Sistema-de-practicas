const createConnection = require("../../config/db");

const getFichas = async () => {
  const db = await createConnection();
  try {
    const status = await db.execute(
      `SELECT fichas.id_ficha AS idDB,
       fichas.nombre_ficha AS Nombre, 
       fichas.ficha_id AS id, 
       niveles.nombre_nivel AS 'niveldeformacion', 
       DATE_FORMAT(fichas.final_lectiva, '%Y-%m-%d') AS 'finallectiva',
       fichas.estado AS estado
       FROM fichas
       JOIN niveles ON fichas.nivel = niveles.id_niveles;
       `
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
};

const getFicha = async (id) => {
  const db = await createConnection();
  try {
    const status = await db.query(
        `
       SELECT nombre_ficha AS Formacion, 
       ficha_id AS ID, 
       nombre_nivel AS 'nivel de formacion', 
       DATE_FORMAT(fichas.final_lectiva, '%Y-%m-%d') AS 'final de etapa lectiva',
       fichas.estado AS estado
       FROM fichas 
       JOIN niveles on nivel = id_niveles
       WHERE id_ficha = ?
        `,
      id
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
};

const deleteFicha = async (id) => {
  const db = await createConnection();
  try {
    const status = await db.query(
        `
        DELETE FROM fichas WHERE id_ficha = ?
        `,
      id
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
};
 
const verifyFicha = async (id) => {
  const db = await createConnection();
  try {
    const status = await db.query(
        `
        SELECT * FROM fichas WHERE ficha_id = ?
        `,
      id
    );
    return status;
  } catch (error) {
    console.log(error);
    console.log('s')
    return null;
  } finally {
    await db.end();
  }
};

const updateFicha = async (data)=>{
  const db = await createConnection();
  try {
    const status = await db.query(
        `
        UPDATE fichas 
        SET nombre_ficha = ?,
        nivel = ?,
        ficha_id = ?,
        final_lectiva = ?
        WHERE id_ficha = ?
        `,
      data
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
}

const insertFicha = async (datos) => {
  const db = await createConnection();
  try {
    const status = await db.execute(
      `
        INSERT INTO fichas (nombre_ficha,ficha_id,nivel,final_lectiva,estado) VALUES (?,?,?,?,"WIP")
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

const insertAprendices = async (datos, id) => {
  console.log(id);
  const db = await createConnection();
  try {
    for (const aprendiz of datos) {
      const {
        "Tipo de Documento": tipo_documento,
        "Número de Documento": numero_documento,
        Nombre: nombres,
        Apellidos: apellidos,
        Celular: celular,
        "Correo Electrónico": correo_personal,
        Estado: estado,
      } = aprendiz;
      const query =
        "INSERT INTO aprendices (ficha,tipo_documento, numero_documento, nombres, apellidos, celular, correo_personal, estado) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
      const values = [
        id,
        tipo_documento,
        numero_documento,
        nombres,
        apellidos,
        celular || 0,
        correo_personal || "",
        estado,
      ];
      await db.execute(query, values);
    }
    const result = true;
    return result;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
};

const verifyAprendices = async (id) => {
  const db = await createConnection();
  try {
    const status = await db.execute(
      `
          SELECT * FROM aprendices WHERE ficha = ?
        `,
      id
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
  insertFicha,
  insertAprendices,
  verifyFicha,
  verifyAprendices,
  getFichas,
  updateFicha,
  deleteFicha,
  getFicha
};
