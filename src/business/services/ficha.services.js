const xlsxPopulate = require("xlsx-populate");

const getFichaExcel = async(data,excel)=>{
    try {
        const workbook = await xlsxPopulate.fromFileAsync(excel);
        const sheet = workbook.sheet("Hoja");
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
        
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
}

module.exports = {
    getFichaExcel
}