const fichaService = require('../business/services/ficha.services')
let fichas
const validateAddFichaInputs = async (req, res, next) => {
  const result = await fichaService.getFichas()
  if(result.status == 200){
    fichas = result.info
  }else{
    res.render('admin/error.ejs')
  }
    const data = req.body;
    const { name, level, id, end } = data;
    let error;
    switch (true) {
      case !name:
        error = 'Por favor, indique un nombre';
        res.render("admin/admin_addFicha", { error,fichas});
        break;
      case !level:
        error = 'Por favor, indique el nivel de la formación.';
        res.render("admin/admin_addFicha", { error,fichas});
        break;
      case !id:
        error = 'Por favor, indique el id de la formación.';
        res.render("admin/admin_addFicha", { error,fichas});
        break;
      case !end:
        error = 'Por favor, indique el fin de la etapa lectiva.';
        res.render("admin/admin_addFicha", { error,fichas});
        break;
      default:

        const parseId = parseInt(id);
        if (isNaN(parseId)) {
          error = 'Ingrese una ficha válida.';
          res.render("admin/admin_addFicha", { error,fichas});
        } else {
          switch (level) {
            case "1":
            case "2":
            case "3":
            case "4":
                const dateObject = new Date(end)

                if (isNaN(dateObject.getTime())) {
                    error = 'La fecha proporcionada no es válida.'
                    res.render("admin/admin_addFicha", { error,fichas});
                  } else {
                    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/;
                    const nombreVal = regex.test(name)
                    if(nombreVal){
                        next();
                    }else{
                        error = 'El nombre proporcionado no es válido.'
                        res.render("admin/admin_addFicha", { error,fichas});
                    }
                  }
              break;
            default:
              error = 'Ingrese un nivel de formación válido.';
              res.render("admin/admin_addFicha", { error,fichas});
          }
        }
    }
  };
  module.exports = {
      validateAddFichaInputs
  };
  