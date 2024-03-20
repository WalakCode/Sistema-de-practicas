const xlsxPopulate = require("xlsx-populate");
const fichaRepository = require("../../persistence/repository/ficha.repository");

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

const addFicha = async(data)=>{
  const parseLevel = parseInt(data.level);
  const datos = [data.name, data.id, parseLevel, data.end];
  const verify = await fichaRepository.verifyFicha(data.id);

  if(verify){
    if (verify[0].length > 0) {
      return { message: "ya existe la ficha con ese id", status: 400 };
    } else {
      const result = await fichaRepository.insertFicha(datos);
      if(result){
        return  {message:'exito',status:200}
      }else{
        return { message: "Error en el servidor", status: 500 };
      }
    }
  }
}

const getFichas = async(data)=>{
  const result = await fichaRepository.getFichas()
  
  if(result){
    return {message:'exito',info:result[0],status:200}
  }else{
    return {message:'error en el servidor',status:500}
  }
}

module.exports = {
addFicha,
getFichas
};
