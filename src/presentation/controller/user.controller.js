const userService = require("../../business/services/user.services");
const fichaService = require("../../business/services/ficha.services");
const aprendizService = require('../../business/services/aprendiz.services')
const jwt = require("jsonwebtoken");

const getMain = async (req, res) => {
  res.clearCookie("jwt");
  const error = null
  res.render("main.ejs",{error});
};

const getLoginAdmin = async (req, res) => {
  res.render("admin/admin_alerts");
};

const getAddFicha = async (req, res) => {
  const result = await fichaService.getFichas();
  if (result.status == 200) {
    const error = null;
    const fichas = result.info;
    res.render("admin/admin_addFicha", { error, fichas });
  } else {
    const error = result.message
    res.render("admin/error.ejs",{error});
  }
};

const postAddFicha = async (req, res) => {
  const data = req.body;
  const result = await fichaService.addFicha(data);
  if (result.status == 200) {
    res.redirect('addFicha')
  } else {
    const resulttres = await fichaService.getFichas();
    if (resulttres.status == 200) {
      const error = result.message
      const fichas = resulttres.info;
      res.render("admin/admin_addFicha", { error, fichas });
    } else {
      const error = resulttres.message
      res.render("admin/error.ejs",{error});
    }
  }
};

const getLoginInstructor = async (req, res) => {
  res.render("instructor/instructor_reports");
};

const postLogin = async (req, res) => {
  const data = req.body;
  const result = await userService.verifyUser(data.email, data.pass);
  if (result.status == 200) {
    const info = result.info[0];

    const options = { expiresIn: "350m" };
    const token = jwt.sign(info, process.env.SK || "CLAVESECRETA", options);
    res.cookie("jwt", token, { httpOnly: true, expiresIn: 350 * 60 });

    if (info.nombre_rol == "Administrador") {
      res.render("admin/admin_alerts");
    } else if (info.nombre_rol == "Instructor") {
      res.render("instructor/instructor_reports");
    }
  } else {
    const error = result.message
    res.render("main.ejs",{error});
  }
};

const postUpdateModal = async(req,res)=>{
  const result = await fichaService.updateFicha(req.body)
  if(result.status == 200){
    res.redirect('addFicha')
  }else{
    const resulttres = await fichaService.getFichas();
    if (resulttres.status == 200) {
      const error = result.message
      const fichas = resulttres.info;
      res.render("admin/admin_addFicha", { error, fichas });
    } else {
      const error = resulttres.message
      res.render("admin/error.ejs",{error});
    }
  }
}

const postDeleteModal = async(req,res)=>{
  let error;
  const id = req.body.hidden
  const result = await fichaService.deleteFicha(id)
  if(result.status == 200){
    res.redirect('addFicha')
  }else{
    const resulttres = await fichaService.getFichas();
    if (resulttres.status == 200) {
      const error = result.message
      const fichas = resulttres.info;
      res.render("admin/admin_addFicha", { error, fichas });
    } else {
      const error = resulttres.message
      res.render("admin/error.ejs",{error});
    }
  }
}

const getAprendices = async(req,res)=>{

  const id = req.body.idFicha
  const result = await aprendizService.getAprendices(id)
  if(result.status == 200){
    const aprendices = result.info
    const resultdos = await fichaService.getFicha(id)
    if(resultdos.status == 200){
      res.json(aprendices)
    }else{
      error = resultdos.message
      res.render("admin/error.ejs",{error});
    }
  }else{
    error = result.message
    res.render("admin/error.ejs",{error});
  }
  

}


module.exports = {
  getMain,
  postLogin,
  getLoginAdmin,
  getLoginInstructor,
  getAddFicha,
  postAddFicha,
  postDeleteModal,
  postUpdateModal,
  getAprendices
};
