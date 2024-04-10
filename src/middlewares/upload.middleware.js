const fs = require('fs');
const path = require('path')

const uploadDirectory = 'uploads'; 


const eliminarArchivosUpload = (req, res, next) => {
    fs.readdir(uploadDirectory, (err, archivos) => {
        if (err) {
            console.error('Error al leer el directorio de carga:', err);
            return res.status(500).send('Error al eliminar archivos.');
        }

        archivos.forEach(archivo => {
            const rutaArchivo = path.join(uploadDirectory, archivo);
            fs.unlink(rutaArchivo, err => {
                if (err) {
                    console.error(`Error al eliminar el archivo ${archivo}:`, err);
                } else {
                    console.log(`El archivo ${archivo} ha sido eliminado.`);
                }
            });
        });

        next();
    });
};

module.exports = {
    eliminarArchivosUpload
}