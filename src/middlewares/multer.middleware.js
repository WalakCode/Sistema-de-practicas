const multer = require('multer');

const unexpectedFile =(err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
      console.error('Error de Multer:', err.message);
      const error = 'Se han enviado campos de archivo inesperados.'
      res.render("admin/admin_addFicha", { error });
    } else {
      next(err); 
    }
};

module.exports = {
    unexpectedFile
}