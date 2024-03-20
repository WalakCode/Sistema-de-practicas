const xlsxPopulate = require("xlsx-populate");


const getFichaExcel = async (data,excel) => {
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
      
            const arrayDeObjetos = [];
      
            for (let i = 1; i < range.length; i++) {
              const objeto = {};
              for (let j = 0; j < keys.length; j++) {
                objeto[keys[j]] = range[i][j];
              }
              arrayDeObjetos.push(objeto);
            }
      
            console.table(arrayDeObjetos);
            return { message: "o", status: 200 };
      
          } else {
            return { message: "el archivo esta vacio", status: 400 };
          }
        } catch (error) {
          console.error(error);
          return {
            message: "Error al leer archivo, asegurate de que es el excel correcto",
            status: 400,
          };
        }
};


module.exports = {
  getFichaExcel,
};
