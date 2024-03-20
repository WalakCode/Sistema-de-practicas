const validateAddFichaInputs = (req, res, next) => {
    const data = req.body;
    const { name, level, id, end } = data;
    let error;
    switch (true) {
      case !name:
        error = 'Por favor, indique un nombre';
        res.render("admin/admin_addFicha", { error });
        break;
      case !level:
        error = 'Por favor, indique el nivel de la formación.';
        res.render("admin/admin_addFicha", { error });
        break;
      case !id:
        error = 'Por favor, indique el id de la formación.';
        res.render("admin/admin_addFicha", { error });
        break;
      case !end:
        error = 'Por favor, indique el fin de la etapa lectiva.';
        res.render("admin/admin_addFicha", { error });
        break;
      default:
        const parseId = parseInt(id);
        if (isNaN(parseId)) {
          error = 'Ingrese una ficha válida.';
          res.render("admin/admin_addFicha", { error });
        } else {
          switch (level) {
            case "auxiliar":
            case "aperario":
            case "tecnico":
            case "tecnologo":
                const dateObject = new Date(end)

                if (isNaN(dateObject.getTime())) {
                    error = 'La fecha proporcionada no es válida.'
                    res.render("admin/admin_addFicha", { error });
                  } else {
                    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/;
                    const nombreVal = regex.test(name)
                    if(nombreVal){
                        next();
                    }else{
                        error = 'El nombre proporcionado no es válido.'
                        res.render("admin/admin_addFicha", { error });
                    }
                  }
              break;
            default:
              error = 'Ingrese un nivel de formación válido.';
              res.render("admin/admin_addFicha", { error });
          }
        }
    }
  };
  
  module.exports = {
      validateAddFichaInputs
  };
  