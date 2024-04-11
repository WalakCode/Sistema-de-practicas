const xlsxPopulate = require("xlsx-populate");
const fichaRepository = require("../../persistence/repository/ficha.repository");

const getFichasEjecucion = async()=>{
  const result = await fichaRepository.getFichasEjecion()
  if(!result){
    return { message: "Error en el servidor", status: 500 };
  }
  return { message: "exito", status: 200 ,info:result[0]};
}

const getFichaExcel = async (excel, data) => {
  try {
    const workbook = await xlsxPopulate.fromFileAsync(excel);
    const sheets = workbook.sheets();
    if (sheets.length > 0) {
      const sheetName = sheets[0].name();
      const sheet = workbook.sheet(sheetName);
      const usedRange = sheet.usedRange();

      const lastRow = usedRange.endCell().rowNumber();

      const range = sheet.range(`A5:G${lastRow}`).value();

      const keys = range[0];

      const aprendices = [];

      for (let i = 1; i < range.length; i++) {
        const objeto = {};
        for (let j = 0; j < keys.length; j++) {
          objeto[keys[j]] = range[i][j];
        }
        aprendices.push(objeto);

       
      }

  
      const verify = await fichaRepository.verifyAprendices([data]);
      if (verify) {

        if (verify[0].length > 0) {
          return { message: "Ya existen aprendices en esa ficha", status: 400 };
        } else {
          const aprendicesEnFormacion = aprendices.filter(aprendiz => aprendiz.Estado === 'EN FORMACION');

          const result = await fichaRepository.insertAprendices(aprendicesEnFormacion, data);
          if (result) {
  
            return {
              message: "Aprendices ingresados correctamente",
              status: 200,
            };
          } else {
            return { message: "Error en el servidor", status: 500 };
          }
        }
      } else {
        return { message: "Error en el servidor", status: 500 };
      }
    }
  } catch (err) {}
};

// const getFichaExcel = async (data, excel) => {

//   try {
//     const workbook = await xlsxPopulate.fromFileAsync(excel);
//     const sheets = workbook.sheets();
//     if (sheets.length > 0) {
//       const sheetName = sheets[0].name();
//       const sheet = workbook.sheet(sheetName);
//       const usedRange = sheet.usedRange();

//       const lastRow = usedRange.endCell().rowNumber();

//       const range = sheet.range(`A5:G${lastRow}`).value();

//       const keys = range[0];

//       const aprendices = [];

//       for (let i = 1; i < range.length; i++) {
//         const objeto = {};
//         for (let j = 0; j < keys.length; j++) {
//           objeto[keys[j]] = range[i][j];
//         }
//         aprendices.push(objeto);
//       }

//       const parseLevel = parseInt(data.level);
//       const datos = [data.name, data.id, parseLevel, data.end];

//       const verify = await fichaRepository.verifyFicha(data.id);
//       if(verify){
//         if (verify[0].length > 0) {
//           return { message: "ya existe la ficha con ese id", status: 400 };
//         } else {
//           const result = await fichaRepository.insertFicha(datos);
//           if (result) {
//             const idFicha = result[0].insertId;
//             const verifyAprendiz = await fichaRepository.verifyAprendices(
//               idFicha
//             );
//             if(verify){
//               if (verifyAprendiz[0].length > 0) {
//                 return { message: "algun aprendiz de la lista ya esta en otra ficha", status: 400 };
//               } else {
//                 const resultAprendiz = await fichaRepository.insertAprendices(
//                   aprendices,
//                   idFicha
//                 );
//                 if (resultAprendiz) {
//                   return { message: "exito", status: 200 };
//                 } else {
//                   return { message: "Error en el servidor", status: 500 };
//                 }
//               }
//             }else{
//               return { message: "Error en el servidor", status: 500 };
//             }
//           } else {
//             return { message: "Error en el servidor", status: 500 };
//           }
//         }
//       }else{
//         return { message: "Error en el servidor", status: 500 };
//       }
//     } else {
//       return { message: "el archivo esta vacio", status: 400 };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       message: "Error al leer archivo, asegurate de que es el excel correcto",
//       status: 400,
//     };
//   }
// };

const addFicha = async (data) => {
  const parseLevel = parseInt(data.level);
  const datos = [data.name, data.id, parseLevel, data.end];
  const verify = await fichaRepository.verifyFicha(data.id);
  if (verify) {
    if (verify[0].length > 0) {
      return { message: "ya existe la ficha con ese id", status: 400 };
    } else {
      const result = await fichaRepository.insertFicha(datos);
      if (result) {
        return { message: "exito", status: 200 };
      } else {
        return { message: "Error en el servidor", status: 500 };
      }
    }
  } else {
    return { message: "Error en el servidor", status: 500 };
  }
};

const getFicha = async (id) => {
  const result = await fichaRepository.getFicha(id);
  if (result) {
    return { message: "exito", info: result[0], status: 200 };
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};

const getFichas = async (data) => {

  const fichaID = await fichaRepository.getEstado()
  if(!fichaID){
    return { message: "error en el servidor", status: 500 };
  }

  if(fichaID[0].length > 0){
    for (const e of fichaID[0]) {
      const id = e.id_ficha;
      const estado = 'FINALIZADO'
      await fichaRepository.updateEstado([estado,id]);
    }
  }else{

    const fichaIDdos = await fichaRepository.getEstadoDos()

    if(!fichaIDdos){
      return { message: "error en el servidor", status: 500 };
    }
    for (const e of fichaIDdos[0]) {
      const id = e.id_ficha;
      const estado = 'EN EJECUCION'
      await fichaRepository.updateEstado([estado,id]);
    }
  }
  
  const result = await fichaRepository.getFichas();
  if (result) {
    return { message: "exito", info: result[0], status: 200 };
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};

const updateFicha = async (data) => {

  const fichaSelected = await fichaRepository.selectFicha(data.id)
  if(!fichaSelected){
    return { message: "error en el servidor", status: 500 };
  }


  if(fichaSelected[0].length > 0 && fichaSelected[0][0]['id_ficha'] != data.hidden){
    return { message: "Ya existe ficha con ese ID", status: 400 };
  }

  const result = await fichaRepository.updateFicha([
    data.name,
    data.level,
    data.id,
    data.end,
    data.hidden,
  ]);

  if (result) {
    if (result[0].affectedRows > 0) {
      return { message: "exito", status: 200 };
    } else {
      return { message: "No se actualizo", status: 500 };
    }
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};

const deleteFicha = async (data) => {
  const result = await fichaRepository.deleteFicha(data);
  if (result) {
    if (result[0].affectedRows > 0) {
      return { message: "exito", status: 200 };
    } else {
      return { message: "No se Elimino", status: 500 };
    }
  } else {
    return { message: "error en el servidor", status: 500 };
  }
};




module.exports = {
  addFicha,
  getFichas,
  updateFicha,
  deleteFicha,
  getFicha,
  getFichaExcel,
  getFichasEjecucion
};
